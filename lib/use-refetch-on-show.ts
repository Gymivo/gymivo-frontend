import { useEffect } from "react";

/**
 * Re-runs the callback whenever the page becomes visible again (tab focus or
 * back-forward navigation). App Router restores a cached page on history back
 * WITHOUT remounting it, so a screen the user saved data from (edit profile)
 * would otherwise keep showing its stale state.
 */
export function useRefetchOnShow(callback: () => void) {
  useEffect(() => {
    const run = () => callback();
    const onVisibility = () => {
      if (document.visibilityState === "visible") run();
    };
    window.addEventListener("focus", run);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", run);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [callback]);
}
