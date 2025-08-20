"use client";

import React, { useEffect, memo } from "react";
import { FaGhost } from "react-icons/fa6";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { TodoItem } from "@/components/todo-item/TodoItem";
import { useTodoStore } from "@/store/todoStore";

export const TodoList = memo(function TodoList() {
  const { todos, isLoading, loadTodos } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-12"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner size="lg" />
        <span className="sr-only">Loading todos...</span>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div
        className="text-center py-12 text-brgray-300"
        role="status"
        aria-live="polite"
      >
        <div className="mb-4">
          <FaGhost
            size={48}
            className="mx-auto text-brgray-50 animate-[float_3s_ease-in-out_infinite]"
            aria-hidden="true"
          />
        </div>
        <p className="text-lg font-medium mb-2">No todos yet</p>
        <p className="text-sm text-brgray-100 italic font-light">
          Add your first todo above to get started!
        </p>
      </div>
    );
  }

  return (
    <ul
      role="list"
      className="space-y-3"
      aria-label="Todo list"
      aria-describedby={todos.length > 0 ? "todo-count" : undefined}
    >
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {todos.length > 0 && (
        <div id="todo-count" className="sr-only">
          {todos.length} todo{todos.length === 1 ? "" : "s"}
        </div>
      )}
    </ul>
  );
});
