import React from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const TodoListLoading = React.memo(function TodoListLoading() {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 text-brgray-300"
      role="status"
      aria-live="polite"
      data-testid="todo-list-loading"
    >
      <div className="mb-4">
        <LoadingSpinner size="lg" className="!text-brgray-100 w-12 h-12" />
      </div>
      <p className="text-lg font-medium mb-2">Loading todos...</p>
      <p className="text-sm text-brgray-100 italic font-light">
        Please wait while we fetch your todos
      </p>
    </div>
  );
});
