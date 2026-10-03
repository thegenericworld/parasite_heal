"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface NavigationContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoadingState] = useState(false);
  const loadingStartedAtRef = useRef<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minVisibleMs = 500;

  // Exposed loader setter with minimum visible duration to prevent blink.
  const setIsLoading = useCallback((loading: boolean) => {
    if (loading) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      loadingStartedAtRef.current = Date.now();
      setIsLoadingState(true);
      return;
    }

    const elapsed = loadingStartedAtRef.current
      ? Date.now() - loadingStartedAtRef.current
      : minVisibleMs;
    const remaining = Math.max(0, minVisibleMs - elapsed);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (remaining > 0) {
      hideTimerRef.current = setTimeout(() => {
        setIsLoadingState(false);
        loadingStartedAtRef.current = null;
        hideTimerRef.current = null;
      }, remaining);
      return;
    }

    setIsLoadingState(false);
    loadingStartedAtRef.current = null;
  }, [minVisibleMs]);

  const searchKey = useMemo(() => searchParams.toString(), [searchParams]);

  // When route changes complete, close loader.
  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [pathname, searchKey, isLoading, setIsLoading]);

  // Avoid timer leaks on unmount.
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, []);

  // Safety timeout: if loading is stuck for more than 5 seconds, force close
  useEffect(() => {
    if (!isLoading) return;

    const safetyTimer = setTimeout(() => {
      console.warn("Navigation loading stuck, forcing close");
      setIsLoadingState(false);
      loadingStartedAtRef.current = null;
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    }, 5000);

    return () => clearTimeout(safetyTimer);
  }, [isLoading]);

  // Capture internal link navigations (including product cards).
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      try {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const link = target.closest("a[href]") as HTMLAnchorElement | null;

        if (!link?.href) return;

        if (
          (link.target && link.target !== "_self") ||
          link.hasAttribute("download") ||
          link.hasAttribute("data-no-loader")
        ) {
          return;
        }

        try {
          const linkUrl = new URL(link.href);
          if (linkUrl.origin !== window.location.origin) return;

          const currentUrl = new URL(window.location.href);

          const pathsAreDifferent =
            linkUrl.pathname !== currentUrl.pathname ||
            linkUrl.search !== currentUrl.search;

          if (pathsAreDifferent) {
            setIsLoading(true);
          }
        } catch {
          // Ignore malformed URLs.
        }
      } catch {
        // No-op.
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [setIsLoading]);

  return (
    <NavigationContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};
