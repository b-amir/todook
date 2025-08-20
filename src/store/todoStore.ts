import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Todo, UpdateTodoRequest } from "@/types/todo";

interface TodoState {
  todos: Todo[];
  error: string | null;
  isLoading: boolean;
}

interface TodoActions {
  loadTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  updateTodo: (id: string, updates: UpdateTodoRequest) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useTodoStore = create<TodoState & TodoActions>()(
  devtools((set, get) => ({
    todos: [],
    error: null,
    isLoading: false,

    loadTodos: async () => {
      set({ isLoading: true });
      try {
        const response = await fetch("/api/todos");
        const { todos } = await response.json();
        set({ todos, error: null });
      } catch {
        set({ error: "Failed to load todos" });
      } finally {
        set({ isLoading: false });
      }
    },

    addTodo: async (text: string) => {
      const tempId = `temp-${Date.now()}`;
      const optimisticTodo: Todo = {
        id: tempId,
        text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPending: true,
      };

      set((state) => ({
        todos: [optimisticTodo, ...state.todos],
        error: null,
      }));

      try {
        const response = await fetch("/api/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) throw new Error("Failed to create todo");

        const { todo } = await response.json();

        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === tempId ? { ...todo, isPending: false } : t
          ),
        }));
      } catch {
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== tempId),
          error: "Failed to add todo. Please try again.",
        }));
      }
    },

    updateTodo: async (id: string, updates: UpdateTodoRequest) => {
      const originalTodos = get().todos;

      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...updates, isPending: true } : todo
        ),
        error: null,
      }));

      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!response.ok) throw new Error("Failed to update todo");

        const { todo } = await response.json();

        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...todo, isPending: false } : t
          ),
        }));
      } catch {
        set({
          todos: originalTodos,
          error: "Failed to update todo. Changes reverted.",
        });
      }
    },

    deleteTodo: async (id: string) => {
      const originalTodos = get().todos;

      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, isPending: true } : todo
        ),
        error: null,
      }));

      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete todo");

        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      } catch {
        set({
          todos: originalTodos,
          error: "Failed to delete todo. Please try again.",
        });
      }
    },

    clearError: () => set({ error: null }),
  }))
);
