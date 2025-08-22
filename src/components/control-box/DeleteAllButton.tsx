"use client";

import { useTodoStore } from "@/store/todoStore";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";

export function DeleteAllButton() {
  const { isDemoMode, deleteAllTodos, todos } = useTodoStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const handleDeleteAllClick = () => {
    if (todos?.length === 0) return;
    setShowDeleteAllDialog(true);
  };

  const handleDeleteAllConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteAllTodos(isDemoMode);
    } catch (error) {
      console.error("Failed to delete all todos:", error);
    } finally {
      setIsDeleting(false);
    }
    setShowDeleteAllDialog(false);
  };

  const handleDeleteAllCancel = () => {
    setShowDeleteAllDialog(false);
  };

  return (
    <>
      <button
        disabled={isDemoMode || isDeleting || todos?.length === 0}
        onClick={handleDeleteAllClick}
        className={`flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold border transition-colors duration-200 rounded-md shadow-sm ${
          !isDemoMode && !isDeleting && todos?.length > 0
            ? "bg-brpink-50 text-brpink-500/60 border-brpink-100/20 hover:bg-brpink-100 hover:text-brpink-50 cursor-pointer"
            : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
        }`}
      >
        <FaTrash size={12} />
        {isDeleting ? "Deleting..." : "Delete All"}
      </button>

      <ConfirmationDialog
        open={showDeleteAllDialog}
        title="Delete All Todos"
        message={`Are you sure you want to delete all ${todos?.length} todos? This action cannot be undone.`}
        confirmText="Delete All"
        cancelText="Cancel"
        onConfirm={handleDeleteAllConfirm}
        onCancel={handleDeleteAllCancel}
        severity="danger"
      />
    </>
  );
}
