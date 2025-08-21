"use client";
import React, { useMemo } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import type { Todo } from "@/types/todo";
import { TODO_LIST_CONSTANTS } from "@/constants/todoList";
import { useRowHeights, useTodoItemRenderer } from "@/hooks";

interface TodoListVirtualizedProps {
  todos: Todo[];
  listRef: React.RefObject<List | null>;
  scrollbarClass: string;
  showSkeletons?: boolean;
  skeletonDelay?: number;
  onScroll?: (info: {
    scrollOffset: number;
    scrollUpdateWasRequested: boolean;
  }) => void;
}

export const TodoListVirtualized = React.memo(function TodoListVirtualized({
  todos,
  listRef,
  scrollbarClass,
  showSkeletons = false,
  skeletonDelay = 100,
  onScroll,
}: TodoListVirtualizedProps) {
  const stableTodos = useMemo(() => todos, [todos]);

  const { getItemHeight, createHeightChangeHandler } = useRowHeights({
    todos: stableTodos,
    listRef,
  });

  const renderItem = useTodoItemRenderer({
    todos: stableTodos,
    onHeightChange: createHeightChangeHandler,
    showSkeleton: showSkeletons,
    skeletonDelay,
  });

  const containerClassName = useMemo(
    () =>
      `h-[60vh] min-h-[400px] ${scrollbarClass} bg-brgray-50/20 border shadow-inner border-brgray-50 py-4 px-1 rounded-lg`,
    [scrollbarClass]
  );

  return (
    <div className={containerClassName} data-testid="todo-list">
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemCount={stableTodos.length}
            itemSize={getItemHeight}
            overscanCount={TODO_LIST_CONSTANTS.OVERSCAN_COUNT}
            itemData={stableTodos}
            className={scrollbarClass}
            onScroll={onScroll}
          >
            {renderItem}
          </List>
        )}
      </AutoSizer>
      {stableTodos.length > 0 && (
        <div id="todo-count" className="sr-only">
          {stableTodos.length} todo{stableTodos.length === 1 ? "" : "s"}
        </div>
      )}
    </div>
  );
});
