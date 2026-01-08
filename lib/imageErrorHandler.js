/**
 * Image error handling utilities
 * Provides fallback mechanisms for image loading failures
 */

/**
 * Creates a safe image source with fallback
 * @param {string} src - Primary image source
 * @param {string[]} fallbacks - Array of fallback image sources
 * @returns {string} Image source to use
 */
export function getSafeImageSrc(src, fallbacks = []) {
  if (!src) return '/13.webp'; // Default placeholder
  
  // If src is already a fallback, return it
  if (fallbacks.includes(src)) {
    return src;
  }
  
  return src;
}

/**
 * Validates if an image path is valid
 * @param {string} path - Image path to validate
 * @returns {boolean} True if path looks valid
 */
export function isValidImagePath(path) {
  if (!path || typeof path !== 'string') return false;
  
  // Check for valid image extensions
  const validExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif', '.svg'];
  const lowerPath = path.toLowerCase();
  
  return validExtensions.some(ext => lowerPath.endsWith(ext));
}

/**
 * Gets fallback image based on error type
 * @param {string} originalSrc - Original image source that failed
 * @param {string} errorType - Type of error (network, format, etc.)
 * @returns {string} Fallback image path
 */
export function getFallbackImage(originalSrc, errorType = 'unknown') {
  // Try to use a similar image from the same project
  if (originalSrc) {
    // Extract project name from path (e.g., /concord1.webp -> concord)
    const match = originalSrc.match(/\/([^/]+)\d+\./);
    if (match) {
      const projectName = match[1];
      // Try first image of the project as fallback
      return `/${projectName}1.webp`;
    }
  }
  
  // Default fallbacks
  const defaultFallbacks = [
    '/13.webp',
    '/servicesphoto.jpeg',
  ];
  
  return defaultFallbacks[0];
}

/**
 * Handles image error with retry logic
 * @param {Error} error - Image error
 * @param {string} src - Image source that failed
 * @param {Function} onError - Error callback
 * @param {number} retryCount - Current retry count
 * @param {number} maxRetries - Maximum retries
 */
export function handleImageError(error, src, onError, retryCount = 0, maxRetries = 1) {
  console.warn(`Image load error for ${src}:`, error.message || error);
  
  if (retryCount < maxRetries) {
    // Retry with a slight delay
    setTimeout(() => {
      onError(error, src, retryCount + 1);
    }, 100 * (retryCount + 1));
  } else {
    // Max retries reached, use fallback
    const fallback = getFallbackImage(src);
    onError(error, fallback, retryCount);
  }
}

