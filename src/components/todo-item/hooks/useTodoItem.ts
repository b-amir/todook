import { useState, useCallback } from "react";
import { useTodoStore } from "@/store/todoStore";
import { useTodoForm } from "../../todo-form/hooks/useTodoForm";
import type { Todo } from "@/types/todo";

interface UseTodoItemOptions {
  todo: Todo;
}

export const useTodoItem = ({ todo }: UseTodoItemOptions) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTodo, deleteTodo } = useTodoStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useTodoForm({ defaultText: todo.text, mode: "onBlur" });

  const handleToggleComplete = useCallback(() => {
    updateTodo(todo.id, { completed: !todo.completed });
  }, [updateTodo, todo.id, todo.completed]);

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

  return {
    isEditing,
    register,
    handleSubmit,
    errors,
    isValid,
    handleToggleComplete,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleDelete,
    handleKeyDown,
  };
};
