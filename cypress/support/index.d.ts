declare namespace Cypress {
  interface Chainable {
    setupTodoApp(): Chainable<void>;
    addTodo(text: string): Chainable<void>;
    editTodo(oldText: string, newText: string): Chainable<void>;
    deleteTodo(text: string): Chainable<void>;
    toggleTodo(text: string): Chainable<void>;
    waitForTodos(): Chainable<void>;
    assertTodoCompleted(text: string): Chainable<void>;
    assertTodoNotCompleted(text: string): Chainable<void>;
    assertTodoExists(text: string): Chainable<void>;
    assertTodoNotExists(text: string): Chainable<void>;
    clearTodoInput(): Chainable<void>;
    typeInTodoInput(text: string): Chainable<void>;
    clickAddButton(): Chainable<void>;
    assertAddButtonDisabled(): Chainable<void>;
    assertAddButtonEnabled(): Chainable<void>;
  }
}
