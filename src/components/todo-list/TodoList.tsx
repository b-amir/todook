"use client";

import React, { useRef, useMemo, memo } from "react";
import { VariableSizeList as List } from "react-window";
import { TodoListLoading } from "./TodoListLoading";
import { TodoListEmpty } from "./TodoListEmpty";
import { TodoListVirtualized } from "./TodoListVirtualized";
import { useTodoStore } from "@/store/todoStore";
import { useFastScrolling, useAutoScrollToTop } from "@/hooks";
import { TODO_LIST_CONSTANTS } from "@/constants/todoList";

export const TodoList = memo(function TodoList() {
  const { todos, isLoading, hasLoaded } = useTodoStore();
  const listRef = useRef<List | null>(null);

  const { isScrollingFast, handleScroll } = useFastScrolling(
    TODO_LIST_CONSTANTS.FAST_SCROLLING_CONFIG
  );
  const stableTodos = useMemo(() => todos, [todos]);

  useAutoScrollToTop(stableTodos, listRef);

  const containerClassName = useMemo(
    () =>
      `flex flex-col flex-grow h-full w-full bg-brgray-50/20 border shadow-inner border-brgray-50 rounded-lg overflow-hidden py-2`,
    []
  );

  return (
    <div className={containerClassName} data-testid="todo-list">
      {!hasLoaded || isLoading ? (
        <TodoListLoading />
      ) : stableTodos?.length === 0 ? (
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
