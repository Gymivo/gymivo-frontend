"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "@/lib/api";
import {
  clearStoredTokens,
  getStoredTokens,
  setStoredTokens,
} from "@/lib/storage";
import type { AuthTokens } from "@/lib/types";

interface AuthContextValue {
  tokens: AuthTokens | null;
  /** False until the client-side storage read finishes (used to avoid redirect flashes). */
  ready: boolean;
  isAuthenticated: boolean;
  signIn: (phone: string, password: string) => Promise<void>;
  signUp: (phone: string, password: string, rePassword: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [ready, setReady] = useState(false);

  // Read storage only after mount so server and first client render both show
  // tokens = null (no hydration mismatch). The guard waits for `ready` before
  // redirecting, so authenticated users never bounce on page load.
  /* eslint-disable react-hooks/set-state-in-effect -- one-time client-only storage hydration */
  useEffect(() => {
    setTokens(getStoredTokens());
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const value = useMemo<AuthContextValue>(
    () => ({
      tokens,
      ready,
      isAuthenticated: tokens !== null,
      async signIn(phone, password) {
        // Persist before returning so the dashboard guard is already
        // authenticated when the page navigates.
        const res = await authApi.signin(phone, password);
        setStoredTokens(res);
        setTokens(res);
      },
      async signUp(phone, password, rePassword) {
        const res = await authApi.signup(phone, password, rePassword);
        setStoredTokens(res);
        setTokens(res);
      },
      signOut() {
        clearStoredTokens();
        setTokens(null);
      },
    }),
    [tokens, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
