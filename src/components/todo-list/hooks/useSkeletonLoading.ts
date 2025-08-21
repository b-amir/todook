import { useState, useEffect } from "react";

interface UseSkeletonLoadingProps {
  showSkeleton: boolean;
  skeletonDelay?: number;
}

export function useSkeletonLoading({
  showSkeleton,
  skeletonDelay = 100,
}: UseSkeletonLoadingProps) {
  const [isLoading, setIsLoading] = useState(showSkeleton);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (showSkeleton && !hasLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setHasLoaded(true);
      }, skeletonDelay);

      return () => clearTimeout(timer);
    }
  }, [showSkeleton, hasLoaded, skeletonDelay]);

  return { isLoading };
}
