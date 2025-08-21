import React from "react";
import { FaGhost } from "react-icons/fa6";

export const TodoListEmpty = React.memo(function TodoListEmpty() {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 text-brgray-300"
      role="status"
      aria-live="polite"
      data-testid="todo-list-empty"
    >
      <div className="mb-4">
        <FaGhost
          size={48}
          className="mx-auto text-brgray-50 animate-[float_3s_ease-in-out_infinite]"
          aria-hidden="true"
        />
      </div>
      <p className="text-lg font-medium mb-2">No todos yet</p>
      <p className="text-sm text-brgray-100 font-normal">
        Add your first todo above to get started!
      </p>
    </div>
  );
});
