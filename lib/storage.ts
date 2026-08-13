import type { AuthTokens } from "./types";

const STORAGE_KEY = "gymivo.auth.tokens";

/** Reads stored tokens. SSR-safe; corrupt data is treated as logged out. */
export function getStoredTokens(): AuthTokens | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed !== null &&
      typeof parsed === "object" &&
      typeof (parsed as AuthTokens).accessToken === "string" &&
      typeof (parsed as AuthTokens).refreshToken === "string"
    ) {
      return parsed as AuthTokens;
    }
    return null;
  } catch {
    return null;
  }
}

/** Persists tokens. Storage failures (private mode, quota) degrade silently — the in-memory session still works. */
export function setStoredTokens(tokens: AuthTokens): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch {
    // ignore — session continues in memory
  }
}

export function clearStoredTokens(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
