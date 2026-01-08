'use client';

import { usePerformance } from '../hooks/usePerformance';

/**
 * Client component to monitor performance metrics
 * Should be included in the root layout
 */
export function PerformanceMonitor() {
  usePerformance();
  return null; // This component doesn't render anything
}

