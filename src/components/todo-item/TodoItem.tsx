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
    isValid,
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
        <TodoCheckbox
          completed={todo.completed}
          isPending={todo.isPending ?? false}
          onToggle={handleToggleComplete}
        />

        <div className="flex-1 min-h-[24px] flex items-center">
          <TodoText
            todo={todo}
            isEditing={isEditing}
            register={register}
            errors={errors}
            onKeyDown={handleKeyDown}
            onToggle={handleToggleComplete}
          />
        </div>

        <TodoActions
          todo={todo}
          isEditing={isEditing}
          hasValidText={isValid}
          onEdit={handleEdit}
          onSave={handleSubmit(handleSaveEdit)}
          onCancel={handleCancelEdit}
          onDelete={handleDeleteClick}
        />
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
