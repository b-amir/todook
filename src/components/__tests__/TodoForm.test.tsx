import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { TodoForm } from "../todo-form/TodoForm";
import { useTodoStore } from "@/store/todoStore";

jest.mock("@/store/todoStore");

const mockUseTodoStore = useTodoStore as jest.MockedFunction<
  typeof useTodoStore
>;

describe("TodoForm", () => {
  const mockAddTodo = jest.fn();
  const mockClearError = jest.fn();

  beforeEach(() => {
    mockAddTodo.mockClear();
    mockClearError.mockClear();
    mockUseTodoStore.mockReturnValue({
      addTodo: mockAddTodo,
      error: null,
      clearError: mockClearError,
      todos: [],
      isLoading: false,
      isDemoMode: false,
      loadTodos: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
      deleteAllTodos: jest.fn(),
      setDemoMode: jest.fn(),
    });
  });

  test("renders form with input and button", () => {
    render(<TodoForm />);

    expect(screen.getByPlaceholderText(/add a new todo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("allows user to add new todo", async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, "New todo");
    await user.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith("New todo", false);
  });

  test("clears input after adding todo", async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, "New todo");
    await user.click(button);

    expect(input).toHaveValue("");
  });

  test("prevents adding empty todo", async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const button = screen.getByRole("button", { name: /add/i });
    expect(button).toBeDisabled();

    const input = screen.getByPlaceholderText(/add a new todo/i);
    await user.type(input, "{enter}");

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test("prevents adding todo with only whitespace", async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole("button", { name: /add/i });
    await user.type(input, "   ");
    expect(button).toBeDisabled();
    await user.type(input, "{enter}");
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test("shows error message when todo creation fails", () => {
    mockUseTodoStore.mockReturnValue({
      addTodo: mockAddTodo,
      error: "Failed to add todo",
      clearError: mockClearError,
      todos: [],
      isLoading: false,
      isDemoMode: false,
      loadTodos: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
      deleteAllTodos: jest.fn(),
      setDemoMode: jest.fn(),
    });

    render(<TodoForm />);

    expect(screen.getByText(/failed to add todo/i)).toBeInTheDocument();
  });

  test("allows user to clear error", async () => {
    const user = userEvent.setup();
    mockUseTodoStore.mockReturnValue({
      addTodo: mockAddTodo,
      error: "Failed to add todo",
      clearError: mockClearError,
      todos: [],
      isLoading: false,
      isDemoMode: false,
      loadTodos: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
      deleteAllTodos: jest.fn(),
      setDemoMode: jest.fn(),
    });

    render(<TodoForm />);

    const clearButton = screen.getByTestId("dismiss-error-button");
    await user.click(clearButton);

    expect(mockClearError).toHaveBeenCalled();
  });

  test("submits form on Enter key", async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByPlaceholderText(/add a new todo/i);

    await user.type(input, "New todo{enter}");

    expect(mockAddTodo).toHaveBeenCalledWith("New todo", false);
  });

  test("prevents todo with only special characters", async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole("button", { name: /add/i });
    await user.type(input, "!!!@@@###");
    expect(button).toBeDisabled();
    await user.type(input, "{enter}");

    expect(mockAddTodo).not.toHaveBeenCalled();
    expect(
      screen.getByText(/can't be filled with only special characters/i)
    ).toBeInTheDocument();
  });
});
