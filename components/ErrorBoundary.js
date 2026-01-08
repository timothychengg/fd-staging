'use client';

import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
    };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error for monitoring (in production, send to error tracking service)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    } else {
      // In production, you could send to error tracking service
      // Example: logErrorToService(error, errorInfo);
    }

    this.setState({
      errorInfo,
    });
  }

  resetError() {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback) {
        return <Fallback error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div className='flex min-h-screen items-center justify-center bg-luxbg p-4'>
          <div className='max-w-md space-y-4 text-center rounded-2xl border border-luxmuted/15 bg-white p-8 shadow-[0_12px_30px_rgba(15,15,15,0.08)]'>
            <p className='tagline text-luxmuted'>Something went wrong</p>
            <h1 className='heading-serif text-2xl text-luxtxt'>
              We encountered an error
            </h1>
            <p className='text-sm text-luxmuted'>
              We are sorry, but something unexpected happened. Please try again or refresh the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='text-left mt-4 p-3 bg-red-50 rounded-lg border border-red-200'>
                <summary className='text-xs font-semibold text-red-800 cursor-pointer mb-2'>
                  Error Details (Development Only)
                </summary>
                <pre className='text-xs text-red-700 overflow-auto max-h-40'>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack && (
                    <div className='mt-2 pt-2 border-t border-red-200'>
                      {this.state.errorInfo.componentStack}
                    </div>
                  )}
                </pre>
              </details>
            )}
            <div className='flex items-center justify-center gap-3 pt-2'>
              <button
                type='button'
                onClick={this.resetError}
                className='btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt focus-visible:ring-2 focus-visible:ring-luxtxt/50'
                aria-label='Try again'
              >
                Try again
              </button>
              <button
                type='button'
                onClick={() => window.location.reload()}
                className='btn-pill border border-luxmuted/30 bg-white text-luxtxt hover:bg-luxbg focus-visible:outline-luxtxt focus-visible:ring-2 focus-visible:ring-luxtxt/50'
                aria-label='Refresh page'
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
