import React, { memo } from "react";
import clsx from "clsx";
import { Input } from "@/components/Input";
import type { Todo } from "@/types/todo";

interface TodoTextProps {
  todo: Todo;
  isEditing: boolean;
  editText: string;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onToggle: () => void;
}

export const TodoText = memo(function TodoText({
  todo,
  isEditing,
  editText,
  onTextChange,
  onKeyDown,
  onToggle,
}: TodoTextProps) {
  if (isEditing) {
    return (
      <Input
        data-testid="edit-input"
        value={editText}
        onChange={onTextChange}
        onKeyDown={onKeyDown}
        autoFocus
        variant="minimal"
        className="flex-1"
      />
    );
  }

  return (
    <span
      className={clsx(
        "text-left cursor-pointer transition-colors hover:text-gray-700 break-all whitespace-pre-wrap",
        todo.completed && "line-through text-brgreen-700",
        (todo.isPending ?? false) && "cursor-not-allowed"
      )}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-label={`Mark todo as ${
        todo.completed ? "incomplete" : "complete"
      }: ${todo.text}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {todo.text}
    </span>
  );
});
