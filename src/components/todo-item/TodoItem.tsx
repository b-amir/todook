"use client";

import React, { useState, memo } from "react";
import clsx from "clsx";
import { useTodoStore } from "@/store/todoStore";
import type { Todo } from "@/types/todo";
import { TodoCheckbox } from "@/components/todo-item/TodoCheckbox";
import { TodoText } from "@/components/todo-item/TodoText";
import { TodoActions } from "@/components/todo-item/TodoActions";

export const TodoItem = memo(function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== todo.text) {
      updateTodo(todo.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSaveEdit();
    if (e.key === "Escape") handleCancelEdit();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  return (
    <li
      role="listitem"
      className={clsx(
        "group flex items-center gap-3 py-2 px-3 bg-gray-50 border border-gray-200 hover:shadow-sm shadow-brgray-200/10 rounded-md transition-all",
        todo.completed &&
          !isEditing &&
          "!bg-brgreen-50/60 !border-brgreen-200/30 !text-brgreen-500",
        (todo.isPending ?? false) && "opacity-40 animate-pulse ",
        isEditing && "border-gray-400 bg-white shadow-sm"
      )}
    >
      <TodoCheckbox
        completed={todo.completed}
        isPending={todo.isPending ?? false}
        onToggle={handleToggleComplete}
      />

      <div className="flex-1 min-h-[24px] flex items-center">
        <TodoText
          todo={todo}
          isEditing={isEditing}
          editText={editText}
          onTextChange={handleTextChange}
          onKeyDown={handleKeyDown}
          onToggle={handleToggleComplete}
        />
      </div>

      <TodoActions
        todo={todo}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        onDelete={handleDelete}
      />
    </li>
  );
});
