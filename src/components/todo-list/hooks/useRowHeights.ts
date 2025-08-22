import { useCallback, useRef, useMemo } from "react";
import type { VariableSizeList as List } from "react-window";
import type { Todo } from "@/types/todo";
import { TODO_LIST_CONSTANTS } from "@/constants/todoList";

interface UseRowHeightsProps {
  todos: Todo[];
  listRef: React.RefObject<List | null>;
}

export function useRowHeights({ todos, listRef }: UseRowHeightsProps) {
  const rowHeights = useRef<{ [key: number]: number }>({});
  const measuredHeights = useRef<{ [key: number]: number }>({});
  const pendingUpdates = useRef<Set<number>>(new Set());
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const estimatedHeights = useMemo(() => {
    const heights: { [key: number]: number } = {};
    todos?.forEach((todo, index) => {
      if (todo) {
        const baseHeight = TODO_LIST_CONSTANTS.BASE_TODO_ITEM_HEIGHT;
        const textLines = Math.ceil(
          (todo.text?.length || 0) / TODO_LIST_CONSTANTS.TEXT_CHARS_PER_LINE
        );
        const estimatedHeight =
          baseHeight +
          (textLines - 1) * TODO_LIST_CONSTANTS.TEXT_WRAP_LINE_HEIGHT;

        heights[index] = Math.max(estimatedHeight, baseHeight);
      }
    });
    return heights;
  }, [todos]);

  const getItemHeight = useCallback(
    (index: number): number => {
      const todo = todos?.[index];
      if (!todo) return TODO_LIST_CONSTANTS.DEFAULT_ITEM_HEIGHT;

      if (measuredHeights.current[index]) {
        return measuredHeights.current[index];
      }

      if (rowHeights.current[index]) {
        return rowHeights.current[index];
      }

      const estimatedHeight =
        estimatedHeights[index] || TODO_LIST_CONSTANTS.DEFAULT_ITEM_HEIGHT;
      rowHeights.current[index] = estimatedHeight;
      return estimatedHeight;
    },
    [todos, estimatedHeights]
  );

  const setItemHeight = useCallback(
    (index: number, height: number) => {
      const currentMeasuredHeight = measuredHeights.current[index];
      const newHeight = height + TODO_LIST_CONSTANTS.CONTAINER_BOTTOM_PADDING;

      // Only update if there's a significant change
      if (
        !currentMeasuredHeight ||
        Math.abs(currentMeasuredHeight - newHeight) >
          TODO_LIST_CONSTANTS.HEIGHT_CHANGE_THRESHOLD
      ) {
        measuredHeights.current[index] = newHeight;
        pendingUpdates.current.add(index);

        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(() => {
          if (pendingUpdates.current.size > 0) {
            const minIndex = Math.min(...Array.from(pendingUpdates.current));
            listRef.current?.resetAfterIndex(minIndex);
            pendingUpdates.current.clear();
          }
        }, TODO_LIST_CONSTANTS.HEIGHT_UPDATE_DEBOUNCE_MS);
      }
    },
    [listRef]
  );

  const createHeightChangeHandler = useCallback(
    (index: number) => {
      return (height: number) => {
        setItemHeight(index, height);
      };
    },
    [setItemHeight]
  );

  const cleanup = useCallback(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
  }, []);

  return {
    getItemHeight,
    setItemHeight,
    createHeightChangeHandler,
    rowHeights: measuredHeights,
    cleanup,
  };
}
