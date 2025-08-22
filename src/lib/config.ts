export const config = {
  database: {
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
  nodeEnv: process.env.NODE_ENV || "development",
  analyze: process.env.ANALYZE === "true",
} as const;

export type Config = typeof config;
