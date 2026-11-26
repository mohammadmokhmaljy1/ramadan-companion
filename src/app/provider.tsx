import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Component, useEffect, useState, type ErrorInfo, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { queryClient } from '@/shared/api/query-client';
import { ErrorState } from '@/shared/components/ErrorState';
import { Toaster } from '@/shared/ui/sonner';

class AppErrorBoundary extends Component<PropsWithChildren, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="حدث خطأ غير متوقع"
          description="تعذر عرض الصفحة. يرجى المحاولة مرة أخرى."
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

export function AppProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateScreenSize = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);

    return () => {
      mediaQuery.removeEventListener('change', updateScreenSize);
    };
  }, []);

  const direction = i18n.dir();
  const position = isMobile ? 'top-center' : direction === 'rtl' ? 'bottom-left' : 'bottom-right';

  return (
    <QueryClientProvider client={queryClient}>
      <AppErrorBoundary>{children}</AppErrorBoundary>

      <Toaster dir={direction} position={position} />

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
