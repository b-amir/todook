import clsx from "clsx";
import type { Todo } from "@/types/todo";

interface TodoItemStylesOptions {
  todo: Todo;
  isEditing: boolean;
}

export const getTodoItemContainerClassName = ({
  todo,
  isEditing,
}: TodoItemStylesOptions): string => {
  return clsx(
    "group flex items-center gap-3 py-2 px-3 bg-gray-50 border border-gray-200 hover:shadow-sm shadow-brgray-200/10 rounded-md transition-all",
    todo.completed &&
      !isEditing &&
      "!bg-brgreen-50/60 !border-brgreen-200/30 !text-brgreen-500",
    (todo.isPending ?? false) && "opacity-40 animate-pulse",
    isEditing && "border-gray-400 bg-white shadow-sm"
  );
};
