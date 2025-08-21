import React, { memo } from "react";
import { MdEdit, MdDelete, MdEditOff, MdCheck } from "react-icons/md";
import clsx from "clsx";
import type { Todo } from "@/types/todo";

interface TodoActionsProps {
  todo: Todo;
  isEditing: boolean;
  hasValidText: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export const TodoActions = memo(function TodoActions({
  todo,
  isEditing,
  hasValidText,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: TodoActionsProps) {
  return (
    <div className="flex items-center gap-1 w-16 justify-end opacity-100 transition-opacity">
      {isEditing ? (
        <>
          <button
            onClick={onCancel}
            aria-label="Cancel editing"
            className="p-1.5 text-gray-400 hover:text-brpink-500 transition-colors rounded"
            data-testid="cancel-edit-button"
          >
            <MdEditOff size={16} />
          </button>
          <button
            onClick={onSave}
            disabled={!hasValidText}
            aria-label="Save changes"
            className={clsx(
              "p-1.5 transition-colors rounded",
              !hasValidText
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-400 hover:text-brgreen-500"
            )}
            data-testid="save-edit-button"
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
            data-testid="edit-todo-button"
          >
            <MdEdit size={16} aria-hidden="true" />
          </button>
          <button
            aria-label={`Delete todo: ${todo.text}`}
            onClick={onDelete}
            disabled={todo.isPending ?? false}
            className="p-1.5 text-gray-400 hover:text-brpink-500 transition-color rounded"
            data-testid="delete-todo-button"
          >
            <MdDelete size={16} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
});
