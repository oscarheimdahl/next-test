import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DraggableElement {
  id: number;
  x: number;
  y: number;
  width: number;
}

interface CanvasStore {
  draggedElement?: DraggableElement;
  shouldSpawn?: DraggableElement;
  setDraggedElement: (element: DraggableElement) => void;
  // setDraggedElementPosition: (x: number, y: number) => void;
  removeDraggedElement: (element: DraggableElement) => void;
  removeShouldSpawn: () => void;
}

export const useCanvasStore = create<CanvasStore>()(
  // persist(
  (set) => ({
    setDraggedElement: ({ id, x, y, width }: DraggableElement) =>
      set((state) => ({
        draggedElement: { id, x, y, width },
      })),

    removeDraggedElement: ({ id, x, y, width }: DraggableElement) =>
      set((state) => ({
        draggedElement: undefined,
        shouldSpawn: { id, x, y, width },
      })),
    removeShouldSpawn: () =>
      set((state) => ({
        shouldSpawn: undefined,
      })),
  }),
);
