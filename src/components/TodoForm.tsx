"use client";

import React, { useState, memo, useCallback } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useTodoStore } from "@/store/todoStore";

export const TodoForm = memo(function TodoForm() {
  const [text, setText] = useState("");
  const { todos, addTodo, error, clearError } = useTodoStore();
  const isAdding = todos.some((todo) => todo.isPending);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!text.trim()) return;

      await addTodo(text.trim());
      setText("");
    },
    [text, addTodo]
  );

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1"
          maxLength={500}
        />
        <Button
          type="submit"
          disabled={!text.trim() || isAdding}
          loading={isAdding}
          variant="primary"
        >
          Add
        </Button>
      </form>
    </div>
  );
});
