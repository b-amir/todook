export const setupEmptyTodos = () => {
  cy.intercept("GET", "/api/todos", { todos: [] }).as("getEmptyTodos");
  cy.visit("/");
  cy.wait("@getEmptyTodos");
};

export const setupSlowCreateTodo = () => {
  cy.intercept("POST", "/api/todos", (req) => {
    req.reply({
      statusCode: 201,
      delay: 1000,
      body: {
        todo: {
          id: `new-${Date.now()}`,
          text: req.body.text,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }).as("createTodoSlow");
};

export const setupStandardAPI = () => {
  cy.intercept("GET", "/api/todos", { fixture: "todos.json" }).as("getTodos");
  cy.intercept("POST", "/api/todos", (req) => {
    req.reply({
      statusCode: 201,
      body: {
        todo: {
          id: `new-${Date.now()}`,
          text: req.body.text,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }).as("createTodo");
  cy.intercept("PATCH", "/api/todos/*", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        todo: {
          id: req.url.split("/").pop(),
          ...req.body,
        },
      },
    });
  }).as("updateTodo");
  cy.intercept("DELETE", "/api/todos/*", {
    statusCode: 200,
    body: { success: true },
  }).as("deleteTodo");

  cy.visit("/");
  cy.wait("@getTodos");
  cy.get('[data-testid="todo-input"]').should("be.visible");
};

export const testEmptyState = () => {
  cy.get('[data-testid="todo-list-empty"]').should("be.visible");
  cy.contains("No todos yet").should("be.visible");
};

export const testFormValidation = () => {
  cy.get('[data-testid="add-todo-button"]').should("be.disabled");

  cy.get('[data-testid="todo-input"]').type("   ");
  cy.get('[data-testid="add-todo-button"]').should("be.disabled");

  cy.get('[data-testid="todo-input"]').clear().type("Valid todo");
  cy.get('[data-testid="add-todo-button"]').should("not.be.disabled");
};

export const testMultipleTodos = () => {
  cy.get('[data-testid="todo-input"]').type("First todo");
  cy.get('[data-testid="add-todo-button"]').click();
  cy.wait("@createTodo");
  cy.get('[data-testid="todo-input"]').type("Second todo");
  cy.get('[data-testid="add-todo-button"]').click();
  cy.wait("@createTodo");
  cy.contains("First todo").should("be.visible");
  cy.contains("Second todo").should("be.visible");
};

export const testKeyboardShortcuts = () => {
  cy.contains("Editable todo")
    .closest('[role="listitem"]')
    .find('[data-testid="edit-todo-button"]')
    .should("be.visible")
    .click();
  cy.get('[data-testid="edit-input"]')
    .clear()
    .type("Updated via keyboard{enter}");
  cy.wait("@updateTodo");
  cy.contains("Updated via keyboard").should("be.visible");
};

export const testEscapeKey = () => {
  cy.contains("Original todo")
    .closest('[role="listitem"]')
    .find('[data-testid="edit-todo-button"]')
    .should("be.visible")
    .click();
  cy.get('[data-testid="edit-input"]')
    .clear()
    .type("This will be cancelled{esc}");
  cy.contains("Original todo").should("be.visible");
  cy.contains("This will be cancelled").should("not.exist");
};

export const testLoadingStates = () => {
  cy.get('[data-testid="todo-input"]').type("Loading test");
  cy.get('[data-testid="add-todo-button"]').click();
  cy.get('[data-testid="loading-spinner"]').should("be.visible");
  cy.wait("@createTodoSlow");
  cy.get('[data-testid="loading-spinner"]').should("not.exist");
};

export const testCompleteTodoWorkflow = () => {
  const todoText = "Complete workflow todo";

  cy.get('[data-testid="todo-input"]').clear().type(todoText);
  cy.get('[data-testid="add-todo-button"]').should("be.visible").click();
  cy.wait("@createTodo");

  cy.get('[data-testid="todo-list"]').should("be.visible");
  cy.contains(todoText).should("be.visible");

  cy.contains(todoText)
    .closest('[role="listitem"]')
    .find('[data-testid="todo-checkbox"]')
    .click();
  cy.wait("@updateTodo");
  cy.contains(todoText)
    .closest('[role="listitem"]')
    .find("span")
    .should("have.class", "line-through");

  cy.contains(todoText)
    .closest('[role="listitem"]')
    .find('[data-testid="edit-todo-button"]')
    .should("be.visible")
    .click();
  cy.get('[data-testid="edit-input"]').clear().type("Updated workflow todo");
  cy.get('[data-testid="save-edit-button"]').click();
  cy.wait("@updateTodo");
  cy.contains("Updated workflow todo").should("be.visible");

  cy.contains("Updated workflow todo")
    .closest('[role="listitem"]')
    .find('[data-testid="delete-todo-button"]')
    .click();
  cy.wait("@deleteTodo");
  cy.contains("Updated workflow todo").should("not.exist");
};
