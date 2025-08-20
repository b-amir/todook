"use client";

import React, { memo, useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useTodoStore } from "@/store/todoStore";
import { todoSchema } from "@/types/todo";

type TodoFormValues = z.infer<typeof todoSchema>;

export const TodoForm = memo(function TodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    mode: "onSubmit",
  });

  const {
    todos,
    addTodo,
    error,
    clearError: clearServerError,
  } = useTodoStore();
  const isAdding = todos.some((todo) => todo.isPending);

  const onSubmit = useCallback(
    async (data: TodoFormValues) => {
      try {
        await addTodo(data.text);
        reset();
      } catch {
        // Error is handled by the store
      }
    },
    [addTodo, reset]
  );

  const handleClearError = useCallback(() => {
    clearServerError();
    clearErrors("text");
  }, [clearServerError, clearErrors]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex gap-2">
          <Input
            {...register("text")}
            placeholder="Add a new todo..."
            className={`flex-1 ${
              errors.text
                ? "border-brpink-300 focus:border-brpink-500 focus:shadow-[0_0_0_2px_rgba(236,72,153,0.5)]"
                : ""
            }`}
            maxLength={200}
            aria-label="New todo text"
            aria-invalid={!!errors.text}
          />
          <Button
            type="submit"
            disabled={isAdding || !!errors.text}
            loading={isAdding}
            variant="primary"
            aria-label={isAdding ? "Adding todo..." : "Add todo"}
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
