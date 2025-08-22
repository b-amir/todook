import React from "react";
import { TODO_LIST_CONSTANTS } from "@/constants/todoList";

interface TodoItemSkeletonProps {
  style?: React.CSSProperties;
}

export const TodoItemSkeleton = React.memo(function TodoItemSkeleton({
  style,
}: TodoItemSkeletonProps) {
  const randomWidth = Math.floor(Math.random() * 50) + 40; // 40-90%

  return (
    <div
      style={{
        ...style,
        height: TODO_LIST_CONSTANTS.BASE_TODO_ITEM_HEIGHT,
      }}
      className="px-2 pb-2"
      data-testid="todo-item-skeleton"
    >
      <div className="p-4 animate-pulse h-full flex items-center">
        <div className="flex items-start gap-3 w-full">
          <div className="w-5 h-5 bg-brgray-50/60 rounded border border-brgray-50/40 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div
              className="h-4 bg-brgray-50/60 rounded"
              style={{ width: `${randomWidth}%` }}
            />
          </div>
          <div className="w-4 h-4 bg-brgray-50/30 rounded flex-shrink-0 mt-0.5" />
          <div className="w-4 h-4 bg-brgray-50/30 rounded flex-shrink-0 mt-0.5" />
        </div>
      </div>
    </div>
  );
});
