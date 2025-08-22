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
        <LoadingSpinner
          size="lg"
          className="!text-white/90 w-12 h-12 drop-shadow-[0_0_2px_rgba(255,255,255,0.15),0_0_4px_rgba(255,255,255,0.2),0_0_20px_rgba(0,0,0,0.1),0_0_8px_rgba(0,0,0,0.15)]"
        />
      </div>
      <p className="text-lg font-medium mb-2 !text-brgray-300/90">
        Loading todos
      </p>
      <p className="text-xs font-semibold text-brgray-100/80 ">
        Please wait a moment
      </p>
    </div>
  );
});
