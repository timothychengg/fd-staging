'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { getFallbackImage } from '../lib/imageErrorHandler';

/**
 * Optimized Image component with error handling
 * Wraps Next.js Image with better error handling and fallbacks
 */
export function OptimizedImage({
  src,
  alt,
  fallback,
  onError,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(
    (e) => {
      if (hasError) return; // Prevent infinite loops
      
      setHasError(true);
      
      // Try fallback if provided
      if (fallback && fallback !== imgSrc) {
        setImgSrc(fallback);
        return;
      }
      
      // Use default fallback
      const defaultFallback = getFallbackImage(src);
      if (defaultFallback !== imgSrc) {
        setImgSrc(defaultFallback);
      }
      
      // Call custom error handler if provided
      if (onError) {
        onError(e);
      }
    },
    [src, fallback, imgSrc, hasError, onError]
  );

  // Reset error state if src changes
  if (src !== imgSrc && !hasError) {
    setImgSrc(src);
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || ''}
      onError={handleError}
      {...props}
    />
  );
}

