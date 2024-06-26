"use client";
import { useState, useEffect } from "react";
interface Size {
  width: number | undefined;
  height: number | undefined;
}
interface SizeWithIsMobile extends Size {
  isMobile: boolean | undefined | null | 0 | 1;
  largeScreen: boolean | undefined | null | 0 | 1;
}

function useWindowSize(): SizeWithIsMobile {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  const isMobile = windowSize.width && windowSize.width < 768;
  const largeScreen = windowSize.width && windowSize.width > 1568;

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { ...windowSize, isMobile, largeScreen };
}

export default useWindowSize;
