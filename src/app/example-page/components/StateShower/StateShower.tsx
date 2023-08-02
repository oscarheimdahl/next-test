'use client';

import { useBearStore } from '@/store/bears';
import React from 'react';

const StateUpdater = () => {
  const bears = useBearStore((state) => state.bears);

  return <h2>State: {bears}</h2>;
};

export default StateUpdater;
