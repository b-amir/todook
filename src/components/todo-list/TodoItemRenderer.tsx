"use client";
import React from "react";
import { MeasuredTodoItem } from "./MeasuredTodoItem";
import { TodoItemSkeleton } from "./TodoItemSkeleton";
import { useSkeletonLoading } from "@/hooks";
import type { Todo } from "@/types/todo";

interface TodoItemRendererProps {
  index: number;
  style: React.CSSProperties;
  todos: Todo[];
  onHeightChange: (index: number) => (height: number) => void;
  showSkeleton?: boolean;
  skeletonDelay?: number;
}

export const TodoItemRenderer = React.memo(function TodoItemRenderer({
  index,
  style,
  todos,
  onHeightChange,
  showSkeleton = false,
  skeletonDelay = 100,
}: TodoItemRendererProps) {
  const todo = todos[index];
  const { isLoading } = useSkeletonLoading({ showSkeleton, skeletonDelay });
  const handleHeightChange = onHeightChange(index);

  if (!todo) {
    return <TodoItemSkeleton style={style} />;
  }

  if (isLoading) {
    return <TodoItemSkeleton style={style} />;
  }

  return (
    <div style={style}>
      <div className="px-2 pb-2">
        <MeasuredTodoItem todo={todo} onHeightChange={handleHeightChange} />
      </div>
    </div>
  );
});
