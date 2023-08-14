import { useCanvasStore } from '@/store/canvas';
import React, { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { useUpdateCanvasSize } from '../hooks/useUpdateCanvasSize';
import { colors } from '../page';
import RectLayerContent from './RectLayerContent';
import Konva from 'konva';

const Canvas = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [zoomOffsetX, setZoomOffsetX] = useState(0);
  const [zoomOffsetY, setZoomOffsetY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const { canvasWidth, canvasHeight } = useUpdateCanvasSize(canvasContainerRef);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    return false;
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!e.evt.metaKey) return;
    setOffsetX((prev) => prev - e.evt.movementX / zoom);
    setOffsetY((prev) => prev - e.evt.movementY / zoom);
  };

  const canvasX = canvasContainerRef.current?.getBoundingClientRect().x;
  const canvasY = canvasContainerRef.current?.getBoundingClientRect().y;

  return (
    <div
      ref={canvasContainerRef}
      className="relative bg-slate-200 w-full h-full"
      onDragOver={handleDragOver}
    >
      <div className="absolute z-10 right-2 top-2 bg-[rgba(0,0,0,0.6)] p-2 rounded-md ">
        <div className="opacity-100">
          <div className="flex justify-between">
            <span>width:&nbsp;</span>
            <span>{canvasWidth}</span>
          </div>
          <div className="flex justify-between">
            <span>height:&nbsp;</span>
            <span>{canvasHeight}</span>
          </div>
        </div>
      </div>
      {canvasX !== undefined && canvasY !== undefined && (
        <Stage
          onMouseMove={handleMouseMove}
          width={canvasWidth}
          height={canvasHeight}
        >
          <Layer
            scale={{ x: zoom, y: zoom }}
            offsetX={offsetX + zoomOffsetX}
            offsetY={offsetY + zoomOffsetY}
          >
            <RectLayerContent
              {...{
                canvasWidth,
                canvasHeight,
                canvasX,
                canvasY,
                offsetX,
                offsetY,
              }}
            />
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default Canvas;
