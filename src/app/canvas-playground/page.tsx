'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCanvasStore } from '@/store/canvas';

export const colors = ['#008CD3', '#E9CE2C', '#00B881', '#CF1259', '#555555'];

const Canvas = dynamic(() => import('./components/Canvas'), {
  ssr: false,
});

interface Position {
  x: number;
  y: number;
}

const CanvasPlayground = () => {
  const removeDraggedElement = useCanvasStore().removeDraggedElement;

  const [mouseDragStartPosition, setMouseDragStartPosition] = useState<
    Position | undefined
  >();

  const handleDragStart = (id: number, e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { x, y } = target.getBoundingClientRect();
    setMouseDragStartPosition({ x: e.pageX - x, y: e.pageY - y });
  };

  const handleDragEnd = (
    id: number,
    size: 'small' | 'large',
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    if (!mouseDragStartPosition) return;

    removeDraggedElement({
      id,
      x: e.pageX - mouseDragStartPosition.x,
      y: e.pageY - mouseDragStartPosition.y,
      width: size === 'small' ? 40 : 80,
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Canvas />
      <div className="m-2 flex gap-2 justify-center items-center">
        {colors.map((color, i) => {
          return (
            <div
              key={i}
              draggable="true"
              onDragStart={(e) => handleDragStart(i, e)}
              onDragEnd={(e) => handleDragEnd(i, 'large', e)}
              style={{ backgroundColor: color }}
              className=" flex  p-2 w-20 h-20 justify-center"
            ></div>
          );
        })}
        {colors.map((color, i) => {
          return (
            <div
              key={i}
              draggable="true"
              onDragStart={(e) => handleDragStart(i, e)}
              onDragEnd={(e) => handleDragEnd(i, 'small', e)}
              style={{ backgroundColor: color }}
              className=" flex  p-2 w-10 h-10 justify-center"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default CanvasPlayground;
