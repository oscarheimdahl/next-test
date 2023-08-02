'use client';

import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import { useRefreshTokens } from '@/hooks/useRefreshTokens';
import ErrorFallback from './error-fallback';
import { useRehydrateStore } from '@/hooks/useRehydrateStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { useErrorBoundary: true },
    mutations: { useErrorBoundary: true },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  useRefreshTokens();
  useRehydrateStore();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary, error }) => (
              <ErrorFallback
                resetErrorBoundary={resetErrorBoundary}
                error={error}
              ></ErrorFallback>
            )}
          >
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
