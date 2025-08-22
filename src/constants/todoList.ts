// TodoList constants
export const TODO_LIST_CONSTANTS = {
  // Height calculations
  BASE_TODO_ITEM_HEIGHT: 56, // py-2 (16px) + min-h-[24px] (24px) + gap-3 (12px)
  CONTAINER_BOTTOM_PADDING: 8, // pb-2 = 8px
  TEXT_WRAP_LINE_HEIGHT: 20, // Additional height per text line
  TEXT_CHARS_PER_LINE: 50, // Characters per line for text wrapping estimation

  // Height update thresholds
  HEIGHT_CHANGE_THRESHOLD: 3, // Minimum height difference to trigger update
  MEASUREMENT_CHANGE_THRESHOLD: 2, // Minimum change for ResizeObserver updates

  // Debouncing
  HEIGHT_UPDATE_DEBOUNCE_MS: 100, // Debounce time for height updates

  // Default values
  DEFAULT_ITEM_HEIGHT: 56, //  Default height for missing items
  COMPLETION_RATIO_THRESHOLD: 0.7, // 70% completion ratio for theme change

  // List configuration
  OVERSCAN_COUNT: 5, // Number of items to render outside viewport

  // Performance optimizations
  MAX_VISIBLE_ITEMS: 20, // Maximum items to render at once
  SCROLL_VELOCITY_THRESHOLD: 1.5, // Pixels per millisecond for fast scrolling
  SKELETON_DELAY: 100, // Delay before showing skeletons during fast scroll
  HEIGHT_CACHE_SIZE: 100, // Maximum number of cached heights to store

  // UI configuration
  SCROLLBAR_CLASS: "custom-scrollbar",
  FAST_SCROLLING_CONFIG: {
    velocityThreshold: 1.5,
    hideDelay: 500,
  } as const,
} as const;
