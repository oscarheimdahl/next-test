'use client';

import { ReactNode, useEffect } from 'react';
import { useQuery } from 'react-query';

const Fetcher = () => {
  const run = async () => {
    const data = await fetch('/api');
    const text = await data.text();
    return text;
  };
  const { data, isLoading, isFetching } = useQuery('key', run, {
    refetchInterval: 10000,
    refetchIntervalInBackground: false,
  });

  let renderedText: ReactNode = data;
  if (isFetching) renderedText = <span className="animate-pulse">{data}</span>;
  if (isLoading)
    renderedText = <span className="animate-pulse">Loading...</span>;
  return (
    <div className="border-2 border-white w-fit p-2  rounded-md">
      Example of some fetching logic: <br /> {renderedText}
    </div>
  );
};

export default Fetcher;
