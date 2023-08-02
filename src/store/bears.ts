import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BearState {
  bears: number;
  increasePopulation: (by: number) => void;
  removeAllBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    { name: 'persisted-storage', skipHydration: true },
  ),
);
