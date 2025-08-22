import { useEffect, useRef, useCallback } from "react";
import { VariableSizeList as List } from "react-window";
import type { Todo } from "@/types/todo";

export function useAutoScrollToTop(
  todos: Todo[],
  listRef: React.RefObject<List | null>
) {
  const previousTodosLength = useRef(todos?.length);

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToItem(0, "start");
  }, [listRef]);

  useEffect(() => {
    if (todos?.length > previousTodosLength.current) {
      scrollToTop();
    }
    previousTodosLength.current = todos?.length;
  }, [todos?.length, scrollToTop]);
}
