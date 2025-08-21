"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { VariableSizeList as List } from "react-window";
import { TodoListLoading } from "./TodoListLoading";
import { TodoListEmpty } from "./TodoListEmpty";
import { TodoListVirtualized } from "./TodoListVirtualized";
import { useTodoStore } from "@/store/todoStore";
import { useFastScrolling, useAutoScrollToTop } from "@/hooks";
import { TODO_LIST_CONSTANTS } from "@/constants/todoList";

export const TodoListContainer = React.memo(function TodoListContainer() {
  const { todos, isLoading, loadTodos } = useTodoStore();
  const listRef = useRef<List | null>(null);

  const { isScrollingFast, handleScroll } = useFastScrolling(
    TODO_LIST_CONSTANTS.FAST_SCROLLING_CONFIG
  );
  const stableTodos = useMemo(() => todos, [todos]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useAutoScrollToTop(stableTodos, listRef);

  if (isLoading) {
    return <TodoListLoading />;
  }

  if (stableTodos.length === 0) {
    return <TodoListEmpty />;
  }

  return (
    <TodoListVirtualized
      todos={stableTodos}
      listRef={listRef}
      scrollbarClass={TODO_LIST_CONSTANTS.SCROLLBAR_CLASS}
      showSkeletons={isScrollingFast}
      skeletonDelay={TODO_LIST_CONSTANTS.SKELETON_DELAY}
      onScroll={handleScroll}
    />
  );
});
