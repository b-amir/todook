import React, { memo } from "react";
import clsx from "clsx";
import { Input } from "@/components/ui/Input";
import type { Todo } from "@/types/todo";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

interface TodoTextProps {
  todo: Todo;
  isEditing: boolean;
  register: UseFormRegister<{ text: string }>;
  errors: FieldErrors<{ text: string }>;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onToggle: () => void;
}

export const TodoText = memo(function TodoText({
  todo,
  isEditing,
  register,
  errors,
  onKeyDown,
  onToggle,
}: TodoTextProps) {
  if (isEditing) {
    return (
      <div className="flex-1">
        <Input
          {...register("text")}
          data-testid="edit-input"
          onKeyDown={onKeyDown}
          autoFocus
          variant="minimal"
          className={`flex-1 ${
            errors.text
              ? "border-brpink-300 focus:border-brpink-500 focus:shadow-[0_0_0_2px_rgba(236,72,153,0.5)]"
              : ""
          }`}
          aria-invalid={!!errors.text}
        />
        {errors.text && (
          <div className="mt-1">
            <span className="text-brpink-500 text-xs">
              {errors.text.message}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <span
      className={clsx(
        "text-left cursor-pointer transition-colors hover:text-gray-700 break-all whitespace-pre-wrap font-semibold",
        todo.completed && "line-through text-brgreen-400/80",
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
