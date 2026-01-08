/**
 * Performance monitoring hook
 * Tracks page load times, Core Web Vitals, and other performance metrics
 */

import { useEffect } from 'react';

export function usePerformance() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track page load performance
    if ('performance' in window && 'PerformanceObserver' in window) {
      // Track Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            // Log LCP for monitoring (in production, send to analytics)
            if (process.env.NODE_ENV === 'development') {
              console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            }
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // PerformanceObserver not supported
      }

      // Track First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('FID:', entry.processingStart - entry.startTime);
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // PerformanceObserver not supported
      }

      // Track Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          if (process.env.NODE_ENV === 'development') {
            console.log('CLS:', clsValue);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // PerformanceObserver not supported
      }
    }

    // Track page load time
    if (document.readyState === 'complete') {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      if (process.env.NODE_ENV === 'development') {
        console.log('Page Load Time:', loadTime, 'ms');
      }
    } else {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (process.env.NODE_ENV === 'development') {
          console.log('Page Load Time:', loadTime, 'ms');
        }
      });
    }
  }, []);
}

/**
 * Hook to measure component render time
 * @param {string} componentName - Name of the component being measured
 */
export function useRenderTime(componentName) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof performance !== 'undefined') {
      const startTime = performance.now();
      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        if (renderTime > 16) { // Only log if render takes longer than one frame
          console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
        }
      };
    }
  }, [componentName]);
}

