'use client';

import { useBearStore } from '@/store/bears';
import React from 'react';

const StateUpdater = () => {
  const increment = useBearStore((state) => state.increasePopulation);

  return (
    <button
      className="flex bg-blue-600 w-fit p-2 rounded-md"
      onClick={() => increment(1)}
    >
      StateUpdater
    </button>
  );
};

export default StateUpdater;
