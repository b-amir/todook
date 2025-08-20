"use client";

import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import clsx from "clsx";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useTodoStore } from "@/store/todoStore";
import type { Todo } from "@/types/todo";

export function TodoItem({ todo }: { todo: Todo }) {
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
        onClick={handleToggleComplete}
        disabled={todo.isPending}
        className={clsx(
          "flex items-center justify-center w-5 h-5 border-2 rounded transition-colors",
          todo.completed
            ? "bg-brgreen-300 border-brgreen-300 text-white"
            : "border-brgray-300 hover:border-brgreen-300"
        )}
      >
        {todo.completed && <AiOutlineCheck size={12} />}
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
          <span
            className={clsx(
              "cursor-pointer",
              todo.completed && "line-through text-brgray-300"
            )}
            onClick={handleEdit}
          >
            {todo.text}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1">
          {todo.isPending && <LoadingSpinner size="sm" />}
          <button
            title="edit todo"
            onClick={handleEdit}
            disabled={todo.isPending}
            className="p-1 text-brgray-300 hover:text-brpink-300 transition-colors"
          >
            <AiOutlineEdit size={16} />
          </button>
          <button
            title="delete todo"
            onClick={handleDelete}
            disabled={todo.isPending}
            className="p-1 text-brgray-300 hover:text-red-500 transition-colors"
          >
            <AiOutlineDelete size={16} />
          </button>
        </div>
      )}
    </li>
  );
}
