Cypress.Commands.add("setupTodoApp", () => {
  cy.intercept("GET", "/api/todos", { fixture: "todos.json" }).as("getTodos");
  cy.intercept("POST", "/api/todos", (req) => {
    const todoId = `new-${Date.now()}`;
    req.reply({
      statusCode: 201,
      body: {
        todo: {
          id: todoId,
          text: req.body.text,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }).as("createTodo");
  cy.intercept("PATCH", "/api/todos/*", (req) => {
    const todoId = req.url.split("/").pop();
    req.reply({
      statusCode: 200,
      body: {
        todo: {
          id: todoId,
          text: req.body.text || "Updated todo",
          completed:
            req.body.completed !== undefined ? req.body.completed : false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
  cy.get('input[placeholder*="Add a new todo"]').should("be.visible");
});

Cypress.Commands.add("addTodo", (text: string) => {
  cy.get('input[placeholder*="Add a new todo"]').clear().type(text);
  cy.get("button").contains("Add").click();
  cy.wait("@createTodo");
  cy.get('[role="listitem"]').should("contain", text);
});

Cypress.Commands.add("editTodo", (oldText: string, newText: string) => {
  cy.contains(oldText)
    .closest('[role="listitem"]')
    .find('button[title="edit todo"]')
    .should("be.visible")
    .click();
  cy.get('[data-testid="edit-input"]').clear().type(newText);
  cy.get("button").contains("Save").click();
  cy.wait("@updateTodo");
  cy.contains(newText).should("be.visible");
});

Cypress.Commands.add("deleteTodo", (text: string) => {
  cy.contains(text)
    .closest('[role="listitem"]')
    .find('button[title="delete todo"]')
    .click();
  cy.wait("@deleteTodo");
  cy.contains(text).should("not.exist");
});

Cypress.Commands.add("toggleTodo", (text: string) => {
  cy.contains(text)
    .closest('[role="listitem"]')
    .find('[role="checkbox"]')
    .click();
  cy.wait("@updateTodo");
});

Cypress.Commands.add("waitForTodos", () => {
  cy.get('input[placeholder*="Add a new todo"]').should("be.visible");
});

Cypress.Commands.add("assertTodoCompleted", (text: string) => {
  cy.contains(text)
    .closest('[role="listitem"]')
    .find("span")
    .should("have.class", "line-through");
});

Cypress.Commands.add("assertTodoNotCompleted", (text: string) => {
  cy.contains(text)
    .closest('[role="listitem"]')
    .find("span")
    .should("not.have.class", "line-through");
});

Cypress.Commands.add("assertTodoExists", (text: string) => {
  cy.contains(text).should("be.visible");
});

Cypress.Commands.add("assertTodoNotExists", (text: string) => {
  cy.contains(text).should("not.exist");
});

Cypress.Commands.add("clearTodoInput", () => {
  cy.get('input[placeholder*="Add a new todo"]').clear();
});

Cypress.Commands.add("typeInTodoInput", (text: string) => {
  cy.get('input[placeholder*="Add a new todo"]').type(text);
});

Cypress.Commands.add("clickAddButton", () => {
  cy.get("button").contains("Add").click();
});

Cypress.Commands.add("assertAddButtonDisabled", () => {
  cy.get("button").contains("Add").should("be.disabled");
});

Cypress.Commands.add("assertAddButtonEnabled", () => {
  cy.get("button").contains("Add").should("not.be.disabled");
});
