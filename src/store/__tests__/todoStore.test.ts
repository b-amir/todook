import { renderHook, act } from "@testing-library/react";
import { useTodoStore } from "../todoStore";

describe("TodoStore", () => {
  beforeEach(() => {
    useTodoStore.getState().todos = [];
    useTodoStore.getState().error = null;
    (global.fetch as jest.Mock).mockClear();
  });

  test("loads todos successfully", async () => {
    const mockTodos = [
      {
        id: "1",
        text: "Test todo",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const mockResponse = {
      ok: true,
      json: async () => ({ todos: mockTodos }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.loadTodos();
    });

    expect(result.current.todos).toEqual(mockTodos);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("handles load todos error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.loadTodos();
    });

    expect(result.current.error).toBe("Failed to load todos");
    expect(result.current.isLoading).toBe(false);
  });

  test("adds todo optimistically", async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        todo: {
          id: "1",
          text: "Test todo",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.addTodo("Test todo");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos?.[0].text).toBe("Test todo");
    expect(result.current.todos?.[0].isPending).toBe(false);
  });

  test("reverts optimistic update on error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.addTodo("Failed todo");
    });

    expect(result.current.todos).toHaveLength(0);
    expect(result.current.error).toContain("Failed to add todo");
  });

  test("updates todo optimistically", async () => {
    const initialTodo = {
      id: "1",
      text: "Old text",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    useTodoStore.getState().todos = [initialTodo];

    const mockResponse = {
      ok: true,
      json: async () => ({
        todo: { ...initialTodo, text: "New text", updatedAt: new Date() },
      }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.updateTodo("1", { text: "New text" });
    });

    expect(result.current.todos?.[0].text).toBe("New text");
    expect(result.current.todos?.[0].isPending).toBe(false);
  });

  test("reverts update on error", async () => {
    const originalTodo = {
      id: "1",
      text: "Original",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    useTodoStore.getState().todos = [originalTodo];

    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.updateTodo("1", { text: "Failed update" });
    });

    expect(result.current.todos?.[0].text).toBe("Original");
    expect(result.current.error).toContain("Failed to update todo");
  });

  test("deletes todo optimistically", async () => {
    const todo = {
      id: "1",
      text: "To delete",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    useTodoStore.getState().todos = [todo];

    const mockResponse = { ok: true };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.deleteTodo("1");
    });

    expect(result.current.todos).toHaveLength(0);
  });

  test("reverts delete on error", async () => {
    const todo = {
      id: "1",
      text: "To delete",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    useTodoStore.getState().todos = [todo];

    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useTodoStore());

    await act(async () => {
      await result.current.deleteTodo("1");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.error).toContain("Failed to delete todo");
  });

  test("clears error", () => {
    useTodoStore.getState().error = "Test error";

    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
