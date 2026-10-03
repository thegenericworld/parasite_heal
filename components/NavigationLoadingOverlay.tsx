"use client";

import React, { useEffect, useState } from "react";
import { useNavigation } from "@/contexts/NavigationContext";
import PageLoaderScreen from "@/components/PageLoaderScreen";

interface NavigationLoadingOverlayProps {
  forceVisible?: boolean;
}

export const NavigationLoadingOverlay: React.FC<NavigationLoadingOverlayProps> = ({
  forceVisible = false,
}) => {
  const { isLoading } = useNavigation();
  const [displayLoader, setDisplayLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setDisplayLoader(true);
    } else {
      // Keep loader visible for at least 0ms to prevent flash
      const timer = setTimeout(() => setDisplayLoader(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!forceVisible && !displayLoader) return null;

  return <PageLoaderScreen />;
};

export default NavigationLoadingOverlay;
