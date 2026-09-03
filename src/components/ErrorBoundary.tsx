import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends (Component as any) {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught error in React ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100 text-slate-800">
          <div className="max-w-md w-full bg-white rounded-lg p-6 shadow-lg border border-red-200">
            <h2 className="text-lg font-bold text-red-700 mb-2">
              রেন্ডারিংয়ে একটি সমস্যা হয়েছে (Rendering Error)
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              {this.state.error?.message || 'Unknown error occurred while rendering layout.'}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded shadow-xs cursor-pointer"
            >
              পৃষ্ঠাটি রিলোড করুন (Reload Page)
            </button>
          </div>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

