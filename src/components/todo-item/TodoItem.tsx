"use client";

import React, { useState, memo, useCallback } from "react";
import clsx from "clsx";
import { useTodoStore } from "@/store/todoStore";
import type { Todo } from "@/types/todo";
import { useTodoForm } from "@/hooks/useTodoForm";
import { TodoCheckbox } from "@/components/todo-item/TodoCheckbox";
import { TodoText } from "@/components/todo-item/TodoText";
import { TodoActions } from "@/components/todo-item/TodoActions";

export const TodoItem = memo(function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTodo, deleteTodo } = useTodoStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useTodoForm({ defaultText: todo.text, mode: "onBlur" });

  const hasValidText = isValid;

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    reset({ text: todo.text });
  }, [reset, todo.text]);

  const handleSaveEdit = useCallback(
    async (data: { text: string }) => {
      try {
        if (data.text !== todo.text) {
          await updateTodo(todo.id, { text: data.text });
        }
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    },
    [updateTodo, todo.id, todo.text]
  );

  const handleCancelEdit = useCallback(() => {
    reset({ text: todo.text });
    setIsEditing(false);
  }, [reset, todo.text]);

  const handleDelete = useCallback(() => {
    deleteTodo(todo.id);
  }, [deleteTodo, todo.id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(handleSaveEdit)();
      }
      if (e.key === "Escape") handleCancelEdit();
    },
    [handleSubmit, handleSaveEdit, handleCancelEdit]
  );

  return (
    <li
      role="listitem"
      className={clsx(
        "group flex items-center gap-3 py-2 px-3 bg-gray-50 border border-gray-200 hover:shadow-sm shadow-brgray-200/10 rounded-md transition-all",
        todo.completed &&
          !isEditing &&
          "!bg-brgreen-50/60 !border-brgreen-200/30 !text-brgreen-500",
        (todo.isPending ?? false) && "opacity-40 animate-pulse ",
        isEditing && "border-gray-400 bg-white shadow-sm"
      )}
    >
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
        hasValidText={hasValidText}
        onEdit={handleEdit}
        onSave={handleSubmit(handleSaveEdit)}
        onCancel={handleCancelEdit}
        onDelete={handleDelete}
      />
    </li>
  );
});
