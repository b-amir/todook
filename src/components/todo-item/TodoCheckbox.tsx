import React, { memo } from "react";
import { MdCheck } from "react-icons/md";
import clsx from "clsx";

interface TodoCheckboxProps {
  completed: boolean;
  isPending: boolean;
  onToggle: () => void;
}

export const TodoCheckbox = memo(function TodoCheckbox({
  completed,
  isPending,
  onToggle,
}: TodoCheckboxProps) {
  return (
    <button
      role="checkbox"
      aria-checked={completed}
      aria-label={`Mark todo as ${completed ? "incomplete" : "complete"}`}
      onClick={onToggle}
      disabled={isPending}
      className={clsx(
        "flex items-center justify-center w-5 h-5 border-2 rounded",
        completed
          ? "bg-brgreen-500 border-brgreen-500 text-white"
          : "border-gray-300 hover:border-brgreen-400"
      )}
      data-testid="todo-checkbox"
    >
      {completed && <MdCheck size={12} aria-hidden="true" />}
    </button>
  );
});
