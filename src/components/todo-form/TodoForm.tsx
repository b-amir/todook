"use client";

import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTodoStore } from "@/store/todoStore";
import { useTodoForm } from "@/components/todo-form/hooks/useTodoForm";
import { VALIDATION_CONSTANTS } from "@/constants/validation";

export const TodoForm = memo(function TodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    clearErrors,
  } = useTodoForm({ mode: "onChange" });

  const {
    isDemoMode,
    todos,
    addTodo,
    error,
    clearError: clearServerError,
  } = useTodoStore();
  const isAdding = todos.some(
    (todo) => todo.isPending && todo.id.startsWith("temp-")
  );

  const textValue = watch("text");
  const hasValidText =
    textValue &&
    textValue.trim().length >= VALIDATION_CONSTANTS.TODO_TEXT_MIN_LENGTH;

  const onSubmit = useCallback(
    async (data: { text: string }) => {
      try {
        await addTodo(data.text, isDemoMode);
        reset(undefined, { keepErrors: false });
      } catch {
        // Error is handled by the store
      }
    },
    [addTodo, reset, isDemoMode]
  );

  const handleClearError = useCallback(() => {
    clearServerError();
    clearErrors("text");
  }, [clearServerError, clearErrors]);

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex gap-2">
          <Input
            {...register("text")}
            placeholder="Add a new todo..."
            className={`flex-1 shadow-sm backdrop-blur-2xl ${
              errors.text
                ? "border-brpink-300 focus:border-brpink-500 focus:shadow-[0_0_0_2px_rgba(236,72,153,0.5)]"
                : ""
            }`}
            maxLength={VALIDATION_CONSTANTS.TODO_TEXT_MAX_LENGTH}
            aria-label="New todo text"
            aria-invalid={!!errors.text}
            data-testid="todo-input"
          />
          <Button
            type="submit"
            disabled={isAdding || !hasValidText}
            loading={isAdding}
            variant="primary"
            aria-label={isAdding ? "Adding todo..." : "Add todo"}
            data-testid="add-todo-button"
          >
            Add
          </Button>
        </div>
        <div className="h-5">
          {(errors.text || error) && (
            <div className="flex justify-between items-center mt-1">
              <span className="text-brpink-500 text-xs">
                {errors.text?.message || error}
              </span>
              {error && (
                <button
                  onClick={handleClearError}
                  className="text-brpink-400 hover:text-brpink-600 focus:outline-none focus:shadow-[0_0_0_2px_rgba(236,72,153,0.5)] rounded p-1 text-xs"
                  aria-label="Dismiss error message"
                  data-testid="dismiss-error-button"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
});
