'use client';

import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import { useRefreshTokens } from '@/helpers/auth';
import ErrorFallback from './error-fallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { useErrorBoundary: true },
    mutations: { useErrorBoundary: true },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  useRefreshTokens();

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
