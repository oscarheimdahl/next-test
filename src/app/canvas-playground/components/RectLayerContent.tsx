import { useCanvasStore } from '@/store/canvas';
import { useEffect, useState } from 'react';
import { Group, Label, Rect, Tag, Text } from 'react-konva';
import { colors } from '../page';
import Konva from 'konva';

interface Rect {
  color: string;
  x: number;
  y: number;
  id: number;
  width: number;
}
const rectDim = 80;

interface RectLayerContent {
  canvasX: number;
  canvasY: number;
  canvasHeight: number;
  canvasWidth: number;
  offsetX: number;
  offsetY: number;
}

const RectLayerContent = ({
  canvasX,
  canvasY,
  canvasWidth,
  canvasHeight,
  offsetX,
  offsetY,
}: RectLayerContent) => {
  const [rects, setRects] = useState<Rect[]>([]);
  const { shouldSpawn: spawnElement, removeShouldSpawn } = useCanvasStore();

  const spawnElementId = spawnElement?.id;
  const spawnElementWidth = spawnElement?.width;
  const spawnElementX = spawnElement?.x;
  const spawnElementY = spawnElement?.y;

  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') setShowLabels((prev) => !prev);
    });
  }, []);

  useEffect(() => {
    const drawRect = (x: number, y: number, color: number, width: number) => {
      setRects((prev) => {
        return [
          ...prev,
          {
            x: Math.round((x + offsetX) / 40) * 40,
            y: Math.round((y + offsetY) / 40) * 40,
            color: colors[color],
            id: prev.length,
            width: width,
          },
        ];
      });
    };
    if (
      spawnElementId === undefined ||
      spawnElementX === undefined ||
      spawnElementY === undefined ||
      spawnElementWidth === undefined
    )
      return;

    const canvasPosX = spawnElementX - canvasX;
    const canvasPosY = spawnElementY - canvasY;
    const withinX =
      spawnElementX && spawnElementX > canvasX && canvasPosX < canvasWidth;
    const withinY =
      spawnElementY && spawnElementY > canvasY && canvasPosY < canvasHeight;
    if (withinX && withinY) {
      drawRect(canvasPosX, canvasPosY, spawnElementId, spawnElementWidth);
    }
    removeShouldSpawn();
  }, [
    canvasHeight,
    canvasWidth,
    canvasX,
    canvasY,
    offsetX,
    offsetY,
    removeShouldSpawn,
    spawnElementId,
    spawnElementWidth,
    spawnElementX,
    spawnElementY,
  ]);

  const handleDragEnd = (
    renderedRect: Rect,
    e: Konva.KonvaEventObject<DragEvent>,
  ) => {
    // e.evt.preventDefault();
    setRects((prev) => {
      const theRect = prev.find((rect) => rect.id === renderedRect.id);
      if (!theRect) return prev;
      theRect.x = Math.round(e.target.x() / 40) * 40;
      theRect.y = Math.round(e.target.y() / 40) * 40;
      return [...prev.filter((rect) => rect.id !== renderedRect.id), theRect];
    });
  };

  const handleDragMove = (
    renderedRect: Rect,
    e: Konva.KonvaEventObject<DragEvent>,
  ) => {
    setRects((prev) => {
      return prev.map((rect) => {
        if (rect.id !== renderedRect.id) return rect;

        rect.x = e.target.x();
        rect.y = e.target.y();
        return rect;
      });
    });
  };
  return (
    <>
      {new Array(100).fill(0).map((_, i) => {
        return (
          <Rect
            fill="#aaa"
            x={(i - 50) * 40 - 0.5}
            width={1}
            height={canvasHeight * 3}
            y={-canvasHeight}
            key={i}
          ></Rect>
        );
      })}
      {new Array(100).fill(0).map((_, i) => {
        return (
          <Rect
            fill="#aaa"
            y={(i - 50) * 40 - 0.5}
            height={1}
            width={canvasWidth * 3}
            x={-canvasWidth}
            key={i}
          ></Rect>
        );
      })}
      {rects.map((rect, i) => {
        return (
          <Group key={i}>
            <Rect
              draggable
              onDragMove={(id) => handleDragMove(rect, id)}
              onDragEnd={(e) => handleDragEnd(rect, e)}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.width}
              fill={rect.color}
            ></Rect>
            {showLabels && (
              <Label
                listening={false}
                x={rect.x}
                y={rect.y}
                offsetX={20}
                offsetY={20}
              >
                <Tag fill="#00000055" cornerRadius={4}></Tag>
                <Text
                  fill={'white'}
                  padding={4}
                  text={`x: ${rect.x}\ny: ${rect.y}`}
                ></Text>
              </Label>
            )}
          </Group>
        );
      })}
    </>
  );
};

export default RectLayerContent;
