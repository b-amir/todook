import React from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const TodoListLoading = React.memo(function TodoListLoading() {
  return (
    <div
      className="flex items-center justify-center py-12"
      role="status"
      aria-live="polite"
      data-testid="todo-list-loading"
    >
      <LoadingSpinner size="lg" />
      <span className="sr-only">Loading todos...</span>
    </div>
  );
});
