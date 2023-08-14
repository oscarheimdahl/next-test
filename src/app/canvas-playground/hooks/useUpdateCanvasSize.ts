import { useEffect, useState } from 'react';

export const useUpdateCanvasSize = (
  canvasContainerRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  useEffect(() => {
    const updateCanvasSize = () => {
      const containerWidth = canvasContainerRef.current?.clientWidth;
      const containerHeight = canvasContainerRef.current?.clientHeight;
      if (containerWidth) setCanvasWidth(containerWidth);
      if (containerHeight) setCanvasHeight(containerHeight);
    };

    updateCanvasSize();
    if (canvasContainerRef.current) {
      new ResizeObserver(updateCanvasSize).observe(canvasContainerRef.current);
    }
  }, [canvasContainerRef]);

  return { canvasWidth, canvasHeight };
};
