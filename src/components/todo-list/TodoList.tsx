"use client";

import React, { useEffect, useRef, useMemo, memo } from "react";
import { VariableSizeList as List } from "react-window";
import { TodoListLoading } from "./TodoListLoading";
import { TodoListEmpty } from "./TodoListEmpty";
import { TodoListVirtualized } from "./TodoListVirtualized";
import { useTodoStore } from "@/store/todoStore";
import { useFastScrolling, useAutoScrollToTop } from "@/hooks";
import { TODO_LIST_CONSTANTS } from "@/constants/todoList";

export const TodoList = memo(function TodoList() {
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

  const containerClassName = useMemo(
    () =>
      `h-[60vh] min-h-[400px] ${TODO_LIST_CONSTANTS.SCROLLBAR_CLASS} bg-brgray-50/20 border shadow-inner border-brgray-50 py-4 px-1 rounded-lg`,
    []
  );

  return (
    <div className={containerClassName} data-testid="todo-list">
      {isLoading ? (
        <TodoListLoading />
      ) : stableTodos.length === 0 ? (
        <TodoListEmpty />
      ) : (
        <TodoListVirtualized
          todos={stableTodos}
          listRef={listRef}
          scrollbarClass={TODO_LIST_CONSTANTS.SCROLLBAR_CLASS}
          showSkeletons={isScrollingFast}
          skeletonDelay={TODO_LIST_CONSTANTS.SKELETON_DELAY}
          onScroll={handleScroll}
        />
      )}
    </div>
  );
});
