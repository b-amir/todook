import {
  setupEmptyTodos,
  setupSlowCreateTodo,
  setupStandardAPI,
  testEmptyState,
  testFormValidation,
  testMultipleTodos,
  testKeyboardShortcuts,
  testEscapeKey,
  testLoadingStates,
  testCompleteTodoWorkflow,
} from "../support/todo-helpers";

describe("Todo App E2E", () => {
  it("allows user to manage todos", () => {
    setupStandardAPI();
    testCompleteTodoWorkflow();
  });

  it("shows empty state when no todos exist", () => {
    setupEmptyTodos();
    testEmptyState();
  });

  it("prevents adding empty todos", () => {
    setupStandardAPI();
    testFormValidation();
  });

  it("allows adding multiple todos", () => {
    setupStandardAPI();
    testMultipleTodos();
  });

  it("handles inline editing with keyboard shortcuts", () => {
    setupStandardAPI();
    testKeyboardShortcuts();
  });

  it("cancels editing with Escape key", () => {
    setupStandardAPI();
    testEscapeKey();
  });

  it("shows loading states during operations", () => {
    setupStandardAPI();
    setupSlowCreateTodo();
    testLoadingStates();
  });
});
