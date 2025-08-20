"use client";

import React, { Component, ReactNode } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Button } from "@/components/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
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
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <div className="mb-4">
            <AiOutlineExclamationCircle
              size={48}
              className="mx-auto text-red-500"
            />
          </div>
          <h2 className="text-xl font-semibold text-brgray-500 mb-2">
            Something went wrong
          </h2>
          <p className="text-brgray-300 mb-6">
            We encountered an unexpected error. Please try again.
          </p>
          <Button onClick={this.handleRetry} variant="primary">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
