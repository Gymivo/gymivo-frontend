"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useAuth } from "./AuthProvider";

/**
 * Blocks unauthenticated visitors: shows a spinner until the token check
 * finishes, then redirects to the login page without rendering children.
 */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.replace("/welcome/login");
    }
  }, [ready, isAuthenticated, router]);

  if (!ready) {
    return (
      <div className="flex h-dvh items-center justify-center bg-neutral-200">
        <CircularProgress size={32} />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
