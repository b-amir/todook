import { useState, useRef, useCallback, useEffect } from "react";

interface UseFastScrollingOptions {
  velocityThreshold?: number; // pixels per millisecond
  hideDelay?: number; // milliseconds
}

export function useFastScrolling({
  velocityThreshold = 1.5,
  hideDelay = 500,
}: UseFastScrollingOptions = {}) {
  const [isScrollingFast, setIsScrollingFast] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleScroll = useCallback(
    ({
      scrollOffset,
      scrollUpdateWasRequested,
    }: {
      scrollOffset: number;
      scrollUpdateWasRequested: boolean;
    }) => {
      if (scrollUpdateWasRequested) return;

      const now = Date.now();
      const timeDiff = now - lastScrollTimeRef.current;

      if (timeDiff > 0) {
        const velocity =
          Math.abs(scrollOffset - scrollVelocityRef.current) / timeDiff;

        if (velocity > velocityThreshold) {
          setIsScrollingFast(true);

          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrollingFast(false);
          }, hideDelay);
        }
      }

      lastScrollTimeRef.current = now;
      scrollVelocityRef.current = scrollOffset;
    },
    [velocityThreshold, hideDelay]
  );

  return {
    isScrollingFast,
    handleScroll,
  };
}
