'use client';

import { ErrorBoundary } from './ErrorBoundary';

export function ErrorBoundaryWrapper({ children }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
