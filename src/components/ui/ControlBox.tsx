"use client";

import { DatasetSwitch } from "./DatasetSwitch";
import { useTodoStore } from "@/store/todoStore";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

export function ControlBox() {
  const { isDemoMode, deleteAllTodos, todos } = useTodoStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (todos.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all todos? This action cannot be undone."
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteAllTodos(isDemoMode);
    } catch (error) {
      console.error("Failed to delete all todos:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center px-2 justify-between gap-6 bg-brgray-50/20 backdrop-blur-sm rounded-lg">
      <DatasetSwitch />
      <button
        disabled={isDemoMode || isDeleting || todos?.length === 0}
        onClick={handleDeleteAll}
        className={`flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold border transition-colors duration-200 rounded-md shadow-sm ${
          !isDemoMode && !isDeleting && todos.length > 0
            ? "bg-brpink-50 text-brpink-500/60 border-brpink-100/20 hover:bg-brpink-100 hover:text-brpink-50 cursor-pointer"
            : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
        }`}
      >
        <FaTrash size={12} />
        {isDeleting ? "Deleting..." : "Delete All"}
      </button>
    </div>
  );
}
