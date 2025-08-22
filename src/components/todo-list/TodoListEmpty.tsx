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
          className="mx-auto text-white/80 animate-[float_3s_ease-in-out_infinite] drop-shadow-[0_0_2px_rgba(255,255,255,0.2),0_0_4px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.15)]"
          aria-hidden="true"
        />
      </div>
      <p className="text-lg font-medium mb-2 !text-brgray-300/90">
        No todos yet
      </p>
      <p className="text-xs font-semibold text-brgray-100/80 ">
        Add your first todo!
      </p>
    </div>
  );
});
