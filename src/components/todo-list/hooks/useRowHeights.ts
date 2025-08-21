import { useCallback, useRef } from "react";
import type { VariableSizeList as List } from "react-window";
import type { Todo } from "@/types/todo";
import { TODO_LIST_CONSTANTS } from "@/constants/todoList";

interface UseRowHeightsProps {
  todos: Todo[];
  listRef: React.RefObject<List | null>;
}

export function useRowHeights({ todos, listRef }: UseRowHeightsProps) {
  const rowHeights = useRef<{ [key: number]: number }>({});

  const getItemHeight = useCallback(
    (index: number): number => {
      const todo = todos[index];
      if (!todo) return TODO_LIST_CONSTANTS.DEFAULT_ITEM_HEIGHT;

      if (rowHeights.current[index]) {
        return rowHeights.current[index];
      }

      const baseHeight = TODO_LIST_CONSTANTS.BASE_TODO_ITEM_HEIGHT;
      const textLines = Math.ceil(
        todo.text.length / TODO_LIST_CONSTANTS.TEXT_CHARS_PER_LINE
      );
      const estimatedHeight =
        baseHeight +
        (textLines - 1) * TODO_LIST_CONSTANTS.TEXT_WRAP_LINE_HEIGHT;

      rowHeights.current[index] = Math.max(estimatedHeight, baseHeight);
      return rowHeights.current[index];
    },
    [todos]
  );

  const setItemHeight = useCallback(
    (index: number, height: number) => {
      const currentHeight = rowHeights.current[index];
      const newHeight = height + TODO_LIST_CONSTANTS.CONTAINER_BOTTOM_PADDING;

      if (
        !currentHeight ||
        Math.abs(currentHeight - newHeight) >
          TODO_LIST_CONSTANTS.HEIGHT_CHANGE_THRESHOLD
      ) {
        rowHeights.current[index] = newHeight;
        listRef.current?.resetAfterIndex(index);
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

  return {
    getItemHeight,
    setItemHeight,
    createHeightChangeHandler,
    rowHeights,
  };
}
