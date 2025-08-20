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
        <div
          className="bg-brpink-50 border border-brpink-200 text-brpink-500 px-4 py-3 rounded-md"
          role="alert"
          aria-live="polite"
        >
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-brpink-400 hover:text-brpink-600 focus:outline-none focus:ring-2 focus:ring-brpink-500 focus:ring-offset-1 rounded p-1"
              aria-label="Dismiss error message"
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
          aria-label="New todo text"
          aria-describedby={text.length > 400 ? "char-count" : undefined}
        />
        <Button
          type="submit"
          disabled={!text.trim() || isAdding}
          loading={isAdding}
          variant="primary"
          aria-label={isAdding ? "Adding todo..." : "Add todo"}
        >
          Add
        </Button>
      </form>
      {text.length > 400 && (
        <div id="char-count" className="text-sm text-brgray-300">
          {text.length}/500 characters
        </div>
      )}
    </div>
  );
});
