import {
  clearStoredTokens,
  getStoredTokens,
  setStoredTokens,
} from "./storage";
import {
  ApiError,
  type ApiEnvelope,
  type AuthTokens,
  type Category,
  type ContactResponse,
  type DashboardResponse,
  type LanguageOption,
  type Move,
  type PagedResponse,
  type ProfileResponse,
  type ReadyPlan,
  type SettingsResponse,
  type TrainingPlan,
  type UpdateProfileRequest,
  type UpdateProfileResponse,
  type UsernameAvailability,
} from "./types";

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
    // Only set the JSON content type for string bodies; FormData needs to set its
    // own multipart boundary (avatar upload).
    if (typeof init.body === "string") headers.set("Content-Type", "application/json");
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

export const profileApi = {
  get() {
    return apiRequest<ProfileResponse>("/api/profile", {}, { auth: true });
  },

  /** Full replacement; the response carries a rotated token pair to store. */
  update(body: UpdateProfileRequest) {
    return apiRequest<UpdateProfileResponse>(
      "/api/profile",
      { method: "PUT", body: JSON.stringify(body) },
      { auth: true },
    );
  },

  /** Live handle check for the edit form; anonymous by design. */
  checkUsername(username: string) {
    return apiRequest<UsernameAvailability>(
      `/api/profile/username-available?username=${encodeURIComponent(username)}`,
    );
  },

  setAvatar(file: File) {
    const form = new FormData();
    form.append("file", file);
    return apiRequest<ProfileResponse>(
      "/api/profile/avatar",
      { method: "POST", body: form },
      { auth: true },
    );
  },

  removeAvatar() {
    return apiRequest<ProfileResponse>(
      "/api/profile/avatar",
      { method: "DELETE" },
      { auth: true },
    );
  },
};

export const settingsApi = {
  get() {
    return apiRequest<SettingsResponse>("/api/settings", {}, { auth: true });
  },

  getLanguages() {
    return apiRequest<LanguageOption[]>("/api/settings/languages", {}, { auth: true });
  },

  update(language: string) {
    return apiRequest<SettingsResponse>(
      "/api/settings",
      { method: "PUT", body: JSON.stringify({ language }) },
      { auth: true },
    );
  },
};

export const dashboardApi = {
  get() {
    return apiRequest<DashboardResponse>("/api/dashboard", {}, { auth: true });
  },
};

export const plansApi = {
  /** `data: null` is a valid response — the user has never had a plan. */
  latest() {
    return apiRequest<TrainingPlan | null>("/api/plans/latest", {}, { auth: true });
  },
};

export const catalogApi = {
  categories() {
    return apiRequest<Category[]>("/api/categories");
  },

  moves(
    params: { page?: number; pageSize?: number; categoryId?: string; popular?: boolean } = {},
  ) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.pageSize) query.set("pageSize", String(params.pageSize));
    if (params.categoryId) query.set("categoryId", params.categoryId);
    if (params.popular) query.set("popular", "true");
    const qs = query.toString();
    return apiRequest<PagedResponse<Move>>(`/api/moves${qs ? `?${qs}` : ""}`);
  },

  move(id: string) {
    return apiRequest<Move>(`/api/moves/${id}`);
  },

  readyPlans(params: { page?: number; pageSize?: number } = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.pageSize) query.set("pageSize", String(params.pageSize));
    const qs = query.toString();
    return apiRequest<PagedResponse<ReadyPlan>>(`/api/ready-plans${qs ? `?${qs}` : ""}`);
  },

  readyPlan(id: string) {
    return apiRequest<ReadyPlan>(`/api/ready-plans/${id}`);
  },
};

export const contactApi = {
  /** Anonymous by default; pass auth: true from the dashboard to link the account. */
  send(
    body: { fullName: string; email: string; message: string },
    options: { auth?: boolean } = {},
  ) {
    return apiRequest<ContactResponse>(
      "/api/contact",
      { method: "POST", body: JSON.stringify(body) },
      { auth: options.auth },
    );
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
