import { PrismaClient } from "@prisma/client";
import { config } from "./config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: config.database.url,
      },
    },
  });

if (config.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}
