"use client";

import React, { useState, memo } from "react";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import clsx from "clsx";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useTodoStore } from "@/store/todoStore";
import type { Todo } from "@/types/todo";

export const TodoItem = memo(function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== todo.text) {
      updateTodo(todo.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <li
      role="listitem"
      className={clsx(
        "flex items-center gap-3 p-4 bg-white border rounded-lg transition-all",
        todo.completed && "bg-brgreen-50 border-brgreen-200",
        todo.isPending && "opacity-60"
      )}
    >
      <button
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={`Mark todo as ${
          todo.completed ? "incomplete" : "complete"
        }`}
        onClick={handleToggleComplete}
        disabled={todo.isPending}
        className={clsx(
          "flex items-center justify-center w-5 h-5 border-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-brgreen-300 focus:ring-offset-2",
          todo.completed
            ? "bg-brgreen-300 border-brgreen-300 text-white"
            : "border-brgray-300 hover:border-brgreen-300"
        )}
      >
        {todo.completed && <AiOutlineCheck size={12} aria-hidden="true" />}
      </button>

      <div className="flex-1">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              data-testid="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") handleCancelEdit();
              }}
              autoFocus
              className="flex-1"
            />
            <Button onClick={handleSaveEdit} size="sm" variant="primary">
              Save
            </Button>
            <Button onClick={handleCancelEdit} size="sm" variant="secondary">
              Cancel
            </Button>
          </div>
        ) : (
          <button
            type="button"
            className={clsx(
              "text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brpink-300 focus:ring-offset-2 rounded px-1 py-1",
              todo.completed && "line-through text-brgray-300"
            )}
            onClick={handleEdit}
            aria-label={`Edit todo: ${todo.text}`}
            disabled={todo.isPending}
          >
            {todo.text}
          </button>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1">
          {todo.isPending && <LoadingSpinner size="sm" />}
          <button
            aria-label={`Edit todo: ${todo.text}`}
            onClick={handleEdit}
            disabled={todo.isPending}
            className="p-1 text-brgray-300 hover:text-brpink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-brpink-300 focus:ring-offset-1 rounded"
          >
            <AiOutlineEdit size={16} aria-hidden="true" />
          </button>
          <button
            aria-label={`Delete todo: ${todo.text}`}
            onClick={handleDelete}
            disabled={todo.isPending}
            className="p-1 text-brgray-300 hover:text-brpink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brpink-500 focus:ring-offset-1 rounded"
          >
            <AiOutlineDelete size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </li>
  );
});
