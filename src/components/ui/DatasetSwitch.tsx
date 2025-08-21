"use client";

import { useTodoStore } from "@/store/todoStore";
import { ImLab } from "react-icons/im";
import { FaFireAlt } from "react-icons/fa";
import { useEffect, useCallback } from "react";

export function DatasetSwitch() {
  const { isDemoMode, setDemoMode, loadTodos } = useTodoStore();

  const stableLoadTodos = useCallback(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stableLoadTodos();
  }, [stableLoadTodos]);

  return (
    <div className="flex items-center justify-center py-2">
      <div className="flex items-center gap-2">
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => setDemoMode(false)}
            disabled={!isDemoMode}
            className={`flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium border transition-colors duration-200 ${
              !isDemoMode
                ? "bg-green-50 text-green-700 border-green-200 cursor-default"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 cursor-pointer"
            } rounded-l-md`}
          >
            <FaFireAlt size={12} />
            Production
          </button>
          <button
            onClick={() => setDemoMode(true)}
            disabled={isDemoMode}
            className={`flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium border-l-0 border transition-colors duration-200 ${
              isDemoMode
                ? "bg-green-50 text-green-700 border-green-200 cursor-default"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 cursor-pointer"
            } rounded-r-md`}
          >
            <ImLab size={12} />
            Demo
          </button>
        </div>
      </div>
    </div>
  );
}
