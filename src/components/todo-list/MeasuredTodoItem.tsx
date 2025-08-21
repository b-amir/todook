"use client";
import React, { useRef, useEffect } from "react";
import { TodoItem } from "@/components/todo-item/TodoItem";
import type { Todo } from "@/types/todo";
import { TODO_LIST_CONSTANTS } from "@/constants/todoList";

interface MeasuredTodoItemProps {
  todo: Todo;
  onHeightChange: (height: number) => void;
}

export const MeasuredTodoItem = React.memo(function MeasuredTodoItem({
  todo,
  onHeightChange,
}: MeasuredTodoItemProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastHeightRef = useRef<number>(0);

  useEffect(() => {
    if (elementRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = Math.round(entry.contentRect.height);

          if (
            Math.abs(height - lastHeightRef.current) >
            TODO_LIST_CONSTANTS.MEASUREMENT_CHANGE_THRESHOLD
          ) {
            lastHeightRef.current = height;

            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
              onHeightChange(height);
            }, TODO_LIST_CONSTANTS.HEIGHT_UPDATE_DEBOUNCE_MS);
          }
        }
      });

      resizeObserver.observe(elementRef.current);
      return () => {
        resizeObserver.disconnect();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [onHeightChange]);

  return (
    <div ref={elementRef}>
      <TodoItem todo={todo} />
    </div>
  );
});
