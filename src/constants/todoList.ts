// TodoList virtualization constants
export const TODO_LIST_CONSTANTS = {
  // Height calculations
  BASE_TODO_ITEM_HEIGHT: 52, // py-2 (16px) + min-h-[24px] (24px) + gap-3 (12px)
  CONTAINER_BOTTOM_PADDING: 12, // pb-3 = 12px
  TEXT_WRAP_LINE_HEIGHT: 20, // Additional height per text line
  TEXT_CHARS_PER_LINE: 50, // Characters per line for text wrapping estimation

  // Height update thresholds
  HEIGHT_CHANGE_THRESHOLD: 3, // Minimum height difference to trigger update
  MEASUREMENT_CHANGE_THRESHOLD: 2, // Minimum change for ResizeObserver updates

  // Debouncing
  HEIGHT_UPDATE_DEBOUNCE_MS: 100, // Debounce time for height updates

  // Default values
  DEFAULT_ITEM_HEIGHT: 72, // Default height for missing items
  COMPLETION_RATIO_THRESHOLD: 0.7, // 70% completion ratio for theme change

  // List configuration
  OVERSCAN_COUNT: 5, // Number of items to render outside viewport
  CONTAINER_HEIGHT: "60vh", // Virtual list container height
  MIN_CONTAINER_HEIGHT: "400px", // Minimum container height
} as const;
