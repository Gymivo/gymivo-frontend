import {
  clearStoredTokens,
  getStoredTokens,
  setStoredTokens,
} from "./storage";
import { ApiError, type ApiEnvelope, type AuthTokens } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

/** Shown when the backend is unreachable — no backend message exists for this case. */
export const NETWORK_ERROR_MESSAGE = "خطای اتصال؛ لطفا دوباره تلاش کن";
const SERVER_ERROR_MESSAGE = "یه مشکلی تو سرور پیش اومده؛ بعداً دوباره تلاش کن";

// Error codes from the backend contract (see Gymivo.Domain.Enums.ErrorCode).
const INVALID_TOKEN = 1004;
const TOKEN_EXPIRED = 1005;
const UNAUTHORIZED = 1006;

interface ApiRequestOptions {
  /** When true, attaches the stored Bearer token and auto-refreshes once on 401. */
  auth?: boolean;
}

/** Builds an ApiError from a parsed (or unparseable) response body. */
function buildError(body: unknown, status: number): ApiError {
  const envelope =
    body !== null && typeof body === "object"
      ? (body as ApiEnvelope<unknown>)
      : null;
  if (envelope?.error) return new ApiError(envelope.error, status);
  const serverSide = status >= 500;
  return new ApiError(
    {
      code: 0,
      name: serverSide ? "server_error" : "network_error",
      message: serverSide ? SERVER_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE,
    },
    status,
  );
}

async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  options: ApiRequestOptions = {},
): Promise<T> {
  const { auth = false } = options;
  let retried = false;

  const doRequest = async (accessToken?: string): Promise<T> => {
    const headers = new Headers(init.headers);
    headers.set("Content-Type", "application/json");
    if (auth) {
      const token = accessToken ?? getStoredTokens()?.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }

    let res: Response;
    try {
      res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
    } catch {
      throw new ApiError({
        code: 0,
        name: "network_error",
        message: NETWORK_ERROR_MESSAGE,
      });
    }

    let body: unknown;
    try {
      body = await res.json();
    } catch {
      throw buildError(null, res.status);
    }

    const envelope =
      body !== null && typeof body === "object"
        ? (body as ApiEnvelope<T>)
        : null;

    if (envelope?.success) {
      return envelope.data as T;
    }

    // Auto-refresh on 401 for authenticated requests — retry exactly once with
    // the rotated pair. refreshSession() never goes through this path, so no loops.
    if (res.status === 401 && auth && !retried) {
      retried = true;
      try {
        const fresh = await refreshSession();
        return await doRequest(fresh.accessToken);
      } catch (err) {
        // Refresh failed on the auth layer itself → the session is dead.
        if (
          err instanceof ApiError &&
          [INVALID_TOKEN, TOKEN_EXPIRED, UNAUTHORIZED].includes(err.code)
        ) {
          clearStoredTokens();
        }
        throw err;
      }
    }

    throw buildError(body, res.status);
  };

  return doRequest();
}

export const authApi = {
  signup(phone: string, password: string, rePassword: string) {
    return apiRequest<AuthTokens>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ phone, password, rePassword }),
    });
  },

  signin(phone: string, password: string) {
    return apiRequest<AuthTokens>("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ phone, password }),
    });
  },

  refresh(refreshToken: string) {
    return apiRequest<AuthTokens>("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },
};

// Single-flight refresh: concurrent 401s share one refresh request and one
// rotated pair. The backend rotates refresh tokens on every use.
let refreshPromise: Promise<AuthTokens> | null = null;

export function refreshSession(): Promise<AuthTokens> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const tokens = getStoredTokens();
      if (!tokens?.refreshToken) {
        throw new ApiError({
          code: UNAUTHORIZED,
          name: "unauthorized",
          message: "دسترسی غیرمجاز است.",
        });
      }
      const fresh = await authApi.refresh(tokens.refreshToken);
      setStoredTokens(fresh);
      return fresh;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}
