"use client";
import React, { useRef, useEffect, useCallback } from "react";
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

  const measureHeight = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const height = Math.round(rect.height);

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
  }, [onHeightChange]);

  useEffect(() => {
    if (elementRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(measureHeight);
      });

      resizeObserver.observe(elementRef.current);
      const initialTimeout = setTimeout(measureHeight, 10);

      return () => {
        resizeObserver.disconnect();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        clearTimeout(initialTimeout);
      };
    }
  }, [measureHeight]);

  return (
    <div ref={elementRef} className="w-full">
      <TodoItem todo={todo} />
    </div>
  );
});
