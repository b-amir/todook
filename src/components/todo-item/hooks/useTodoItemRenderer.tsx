import { useCallback } from "react";
import { TodoItemRenderer } from "@/components/todo-list/TodoItemRenderer";
import type { Todo } from "@/types/todo";

interface UseTodoItemRendererProps {
  todos: Todo[];
  onHeightChange: (index: number) => (height: number) => void;
  showSkeleton: boolean;
  skeletonDelay: number;
}

export function useTodoItemRenderer({
  todos,
  onHeightChange,
  showSkeleton,
  skeletonDelay,
}: UseTodoItemRendererProps) {
  return useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <TodoItemRenderer
        index={index}
        style={style}
        todos={todos}
        onHeightChange={onHeightChange}
        showSkeleton={showSkeleton}
        skeletonDelay={skeletonDelay}
      />
    ),
    [todos, onHeightChange, showSkeleton, skeletonDelay]
  );
}
