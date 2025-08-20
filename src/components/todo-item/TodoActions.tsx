import React, { memo } from "react";
import { MdEdit, MdDelete, MdEditOff, MdCheck } from "react-icons/md";
import clsx from "clsx";
import type { Todo } from "@/types/todo";

interface TodoActionsProps {
  todo: Todo;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export const TodoActions = memo(function TodoActions({
  todo,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: TodoActionsProps) {
  return (
    <div className="flex items-center gap-1 w-16 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
      {isEditing ? (
        <>
          <button
            onClick={onCancel}
            aria-label="Cancel editing"
            className="p-1.5 text-gray-400 hover:text-brpink-500 transition-colors rounded"
          >
            <MdEditOff size={16} />
          </button>
          <button
            onClick={onSave}
            aria-label="Save changes"
            className="p-1.5 text-gray-400 hover:text-brgreen-500 transition-colors rounded"
          >
            <MdCheck size={16} />
          </button>
        </>
      ) : (
        <>
          <button
            aria-label={`Edit todo: ${todo.text}`}
            onClick={onEdit}
            disabled={todo.isPending ?? false}
            className="p-1.5 text-gray-400 hover:text-brpink-500 transition-colors rounded"
          >
            <MdEdit size={16} aria-hidden="true" />
          </button>
          <button
            aria-label={`Delete todo: ${todo.text}`}
            onClick={onDelete}
            disabled={todo.isPending ?? false}
            className="p-1.5 text-gray-400 hover:text-brpink-500 transition-color rounded"
          >
            <MdDelete size={16} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
});
