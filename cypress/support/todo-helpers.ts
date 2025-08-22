export const setupEmptyTodos = () => {
  cy.intercept("GET", "/api/todos*", { todos: [] }).as("getEmptyTodos");
  cy.visit("/", { timeout: 60000 });
  cy.wait("@getEmptyTodos", { timeout: 30000 });
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
  let todos = [
    {
      id: "1",
      text: "Editable todo",
      completed: false,
      createdAt: "2025-10-27T10:00:00.000Z",
      updatedAt: "2025-10-27T10:00:00.000Z",
    },
    {
      id: "2",
      text: "Original todo",
      completed: true,
      createdAt: "2025-10-26T10:00:00.000Z",
      updatedAt: "2025-10-26T10:00:00.000Z",
    },
    {
      id: "3",
      text: "Another todo",
      completed: false,
      createdAt: "2025-10-25T10:00:00.000Z",
      updatedAt: "2025-10-25T10:00:00.000Z",
    },
  ];

  cy.intercept("GET", "/api/todos*", { todos }).as("getTodos");

  cy.intercept("POST", "/api/todos", (req) => {
    const todoId = `new-${Date.now()}`;
    const newTodo = {
      id: todoId,
      text: req.body.text,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    todos = [newTodo, ...todos];

    const response = {
      statusCode: 201,
      body: { todo: newTodo },
    };
    req.reply(response);
  }).as("createTodo");

  cy.intercept("PATCH", "/api/todos/*", (req) => {
    const todoId = req.url.split("/").pop()?.split("?")?.[0];
    const updates = req.body;

    todos = todos.map((todo) =>
      todo.id === todoId
        ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
        : todo
    );

    req.reply({
      statusCode: 200,
      body: {
        todo: todos.find((todo) => todo.id === todoId),
      },
    });
  }).as("updateTodo");

  cy.intercept("DELETE", "/api/todos/*", (req) => {
    const todoId = req.url.split("/").pop()?.split("?")?.[0];

    todos = todos.filter((todo) => todo.id !== todoId);

    req.reply({
      statusCode: 200,
      body: { success: true },
    });
  }).as("deleteTodo");

  cy.visit("/", { timeout: 60000 });
  cy.wait("@getTodos", { timeout: 30000 });
  cy.get('[data-testid="todo-input"]', { timeout: 30000 }).should("be.visible");
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
  const updatedTodoText = "Updated workflow todo";

  // Step 1: Create a new todo
  cy.get('[role="listitem"]').then(($initialItems) => {
    const initialCount = $initialItems?.length;

    cy.get('[data-testid="todo-input"]').clear().type(todoText);
    cy.get('[data-testid="add-todo-button"]').should("be.visible").click();
    cy.wait("@createTodo");
    cy.get('[role="listitem"]').should("have?.length", initialCount + 1);
  });

  cy.get('[data-testid="todo-list"]').should("be.visible");

  // Step 2: Verify the todo was created
  cy.contains(todoText, { timeout: 10000 }).should("be.visible");
  cy.wait(500);
  cy.contains(todoText).closest('[role="listitem"]').should("be.visible");

  // Step 3: Mark the todo as completed
  cy.contains(todoText)
    .closest('[role="listitem"]')
    .find('[data-testid="todo-checkbox"]')
    .should("be.visible")
    .click();
  cy.wait("@updateTodo");
  cy.contains(todoText)
    .closest('[role="listitem"]')
    .find("span")
    .should("have.class", "line-through");

  // Step 4: Edit the todo
  cy.contains(todoText)
    .closest('[role="listitem"]')
    .find('[data-testid="edit-todo-button"]')
    .should("be.visible")
    .should("not.be.disabled")
    .click();
  cy.get('[data-testid="edit-input"]').clear().type(updatedTodoText);
  cy.get('[data-testid="save-edit-button"]').should("be.visible").click();
  cy.wait("@updateTodo");
  cy.contains(updatedTodoText).should("be.visible");

  // Step 5: Delete the updated todo
  cy.contains(updatedTodoText)
    .closest('[role="listitem"]')
    .find('[data-testid="delete-todo-button"]')
    .should("be.visible")
    .should("not.be.disabled")
    .click();

  cy.get('[data-testid="confirm-dialog-button"]', { timeout: 10000 }).should(
    "be.visible"
  );
  cy.get('[data-testid="confirm-dialog-button"]').click();
  cy.wait("@deleteTodo");
  cy.contains(updatedTodoText).should("not.exist");
};
