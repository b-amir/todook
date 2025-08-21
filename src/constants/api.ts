// API constants used across the application
export const API_CONSTANTS = {
  // HTTP Status Codes
  STATUS_OK: 200,
  STATUS_CREATED: 201,
  STATUS_BAD_REQUEST: 400,
  STATUS_NOT_FOUND: 404,
  STATUS_INTERNAL_SERVER_ERROR: 500,

  // Error Messages
  ERROR_MESSAGES: {
    UPDATE_DATA_REQUIRED: "Update data is required",
    FAILED_TO_UPDATE_TODO: "Failed to update todo",
    FAILED_TO_DELETE_TODO: "Failed to delete todo",
    FAILED_TO_DELETE_ALL_TODOS: "Failed to delete all todos",
    FAILED_TO_CREATE_TODO: "Failed to create todo",
    FAILED_TO_FETCH_TODOS: "Failed to fetch todos",
    TODO_TEXT_REQUIRED: "Todo text is required",
  },

  // Success Messages
  SUCCESS_MESSAGES: {
    TODO_DELETED: "Todo deleted successfully",
    ALL_TODOS_DELETED: "All todos deleted successfully",
    TODO_UPDATED: "Todo updated successfully",
    TODO_CREATED: "Todo created successfully",
  },

  // Request Timeouts
  REQUEST_TIMEOUT_MS: 10000,
  RESPONSE_TIMEOUT_MS: 10000,
} as const;
