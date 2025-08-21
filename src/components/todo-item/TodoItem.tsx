"use client";

import React, { memo } from "react";
import type { Todo } from "@/types/todo";
import { useTodoItem } from "@/components/todo-item/hooks/useTodoItem";
import { getTodoItemContainerClassName } from "@/components/todo-item/utils/todoItemStyles";
import { TodoCheckbox } from "@/components/todo-item/TodoCheckbox";
import { TodoText } from "@/components/todo-item/TodoText";
import { TodoActions } from "@/components/todo-item/TodoActions";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";

export const TodoItem = memo(function TodoItem({ todo }: { todo: Todo }) {
  const {
    isEditing,
    register,
    handleSubmit,
    errors,
    hasText,
    handleToggleComplete,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    showDeleteDialog,
    handleKeyDown,
  } = useTodoItem({ todo });

  const containerClassName = getTodoItemContainerClassName({ todo, isEditing });

  return (
    <>
      <li role="listitem" className={containerClassName}>
        <div className="flex-shrink-0 pt-0.5">
          <TodoCheckbox
            completed={todo.completed}
            isPending={todo.isPending ?? false}
            onToggle={handleToggleComplete}
          />
        </div>

        <div className="flex-1 min-h-[24px] flex items-start">
          <TodoText
            todo={todo}
            isEditing={isEditing}
            register={register}
            errors={errors}
            onKeyDown={handleKeyDown}
            onToggle={handleToggleComplete}
          />
        </div>

        <div className="flex-shrink-0 pt-0.5">
          <TodoActions
            todo={todo}
            isEditing={isEditing}
            hasValidText={hasText}
            onEdit={handleEdit}
            onSave={handleSubmit(handleSaveEdit)}
            onCancel={handleCancelEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </li>

      <ConfirmationDialog
        open={showDeleteDialog}
        title="Delete Todo"
        message={`Are you sure you want to delete "${todo.text}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        severity="danger"
      />
    </>
  );
});
