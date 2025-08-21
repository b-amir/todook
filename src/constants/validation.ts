// Validation constants used across the application
export const VALIDATION_CONSTANTS = {
  // Todo text validation
  TODO_TEXT_MIN_LENGTH: 3,
  TODO_TEXT_MAX_LENGTH: 200,

  // Error messages
  TODO_TEXT_MIN_ERROR: "Todo must be at least 3 characters long",
  TODO_TEXT_MAX_ERROR: "Todo cannot exceed 200 characters",
  TODO_TEXT_MIN_AFTER_TRIM_ERROR:
    "Todo must be at least 3 characters long after trimming",
  TODO_TEXT_SPECIAL_CHARS_ERROR:
    "Todo can't be filled with only special characters",
  TODO_TEXT_INVALID_CONTENT_ERROR: "Todo contains invalid content",

  // Security validation patterns
  FORBIDDEN_PATTERNS: [
    "<script",
    "javascript:",
    "data:text/html",
    "vbscript:",
    "onload=",
    "onerror=",
  ],

  // Character validation
  ALPHANUMERIC_PATTERN: /[a-zA-Z0-9]/,
  SPECIAL_CHARS_PATTERN: /[^a-zA-Z0-9\s]/,
} as const;
