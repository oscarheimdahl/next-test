'use client';

import { useBearStore } from '@/store/bears';
import { useEffect } from 'react';

export function useRehydrateStore() {
  useEffect(() => {
    useBearStore.persist.rehydrate();
  }, []);

  return null;
}
