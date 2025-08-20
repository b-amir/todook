"use client";

import React, { useEffect, memo } from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { TodoItem } from "@/components/TodoItem";
import { useTodoStore } from "@/store/todoStore";

export const TodoList = memo(function TodoList() {
  const { todos, isLoading, loadTodos } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-brgray-300">
        <div className="mb-4">
          <AiOutlineCheckSquare size={48} className="mx-auto text-brgray-100" />
        </div>
        <p className="text-lg font-medium mb-2">No todos yet</p>
        <p className="text-sm">Add your first todo above to get started!</p>
      </div>
    );
  }

  return (
    <ul role="list" className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});
