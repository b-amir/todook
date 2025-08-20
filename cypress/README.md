# Cypress Tests

Modular E2E tests for the Todook app.

## Structure

```
cypress/
├── e2e/todo-app.cy.ts       # Main tests
├── support/
│   ├── commands.ts          # Custom commands
│   ├── todo-helpers.ts      # Helper functions
│   └── index.d.ts           # TypeScript types
└── fixtures/todos.json      # Test data
```

## Custom Commands

**Setup:**

- `cy.setupTodoApp()` - Setup app with mocked APIs

**Actions:**

- `cy.addTodo(text)` - Add a todo
- `cy.editTodo(old, new)` - Edit todo text
- `cy.deleteTodo(text)` - Delete a todo
- `cy.toggleTodo(text)` - Toggle completion

**Assertions:**

- `cy.assertTodoCompleted(text)` - Check if completed
- `cy.assertTodoExists(text)` - Check if exists
- `cy.assertAddButtonDisabled()` - Check button state

## Helper Functions

**Setup:**

- `setupStandardAPI()` - Standard API mocking
- `setupEmptyTodos()` - Empty state setup
- `setupSlowCreateTodo()` - Loading state setup

**Tests:**

- `testCompleteTodoWorkflow()` - Full CRUD workflow
- `testFormValidation()` - Input validation
- `testEmptyState()` - Empty state UI
- `testLoadingStates()` - Loading indicators

## Usage

```typescript
import {
  setupStandardAPI,
  testCompleteTodoWorkflow,
} from "../support/todo-helpers";

describe("Todo App", () => {
  it("manages todos", () => {
    setupStandardAPI();
    testCompleteTodoWorkflow();
  });
});
```

Or with custom commands:

```typescript
describe("Todo App", () => {
  beforeEach(() => cy.setupTodoApp());

  it("adds and completes todo", () => {
    cy.addTodo("Test todo");
    cy.toggleTodo("Test todo");
    cy.assertTodoCompleted("Test todo");
  });
});
```

## Running Tests

```bash
npm run test:e2e          # Run all tests
npm run test:e2e:open     # Open Cypress UI
```
