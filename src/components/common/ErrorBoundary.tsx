"use client";

import React, { Component, ReactNode } from "react";
import { AiOutlineExclamationCircle, AiOutlineReload } from "react-icons/ai";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReportError = () => {
    const { error, errorInfo } = this.state;
    const errorReport = {
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
    };

    console.error("Error report:", errorReport);
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="max-w-sm mx-auto text-center p-4 bg-brpink-50 border border-brpink-200 rounded-lg shadow-sm"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex flex-col items-start space-y-3">
            <div className="flex items-center gap-2">
              <AiOutlineExclamationCircle
                size={24}
                className="text-brpink-300"
                aria-hidden="true"
              />
              <h2 className="text-lg font-semibold text-brgray-500">
                Something went wrong
              </h2>
            </div>

            <p className="text-sm text-brgray-300">
              We encountered an unexpected error. Please try again.
            </p>

            {config.nodeEnv === "development" && this.state.error && (
              <details className="w-full text-left">
                <summary className="cursor-pointer text-xs text-brgray-300 hover:text-brgray-500 mb-1">
                  Error details (development only)
                </summary>
                <pre className="text-xs text-brpink-500 bg-white p-2 rounded border border-brpink-100 overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="w-full flex justify-end">
              <Button
                onClick={this.handleRetry}
                variant="primary"
                size="sm"
                aria-label="Retry loading the application"
              >
                <AiOutlineReload size={14} className="mr-1" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
