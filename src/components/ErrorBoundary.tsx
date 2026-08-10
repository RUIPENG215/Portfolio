import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page rendering failed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-white/50 mb-6">SYSTEM / RECOVERY</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Something went wrong.</h1>
            <p className="text-white/60 mb-10">This page could not be displayed. Reload the site to try again.</p>
            <button type="button" onClick={() => window.location.reload()} className="border border-white/30 px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
              Reload site
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
