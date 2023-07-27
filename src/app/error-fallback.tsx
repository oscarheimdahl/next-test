'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { NEED_TO_SIGN_IN_ERROR } from '@/helpers/auth';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const { push } = useRouter();

  useEffect(() => {
    if (error.message === NEED_TO_SIGN_IN_ERROR) {
      resetErrorBoundary();
      push('/auth');
    }
  }, [error.message, push, resetErrorBoundary]);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
