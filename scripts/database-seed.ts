import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
  console.log("📝 No DATABASE_URL found, using fallback: file:./dev.db");
}

const prisma = new PrismaClient();

interface SampleTodo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

async function seedDemoData() {
  try {
    console.log("🔧 Seeding demo data...");

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS demo_todos (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL
      )
    `;

    await prisma.$executeRaw`DELETE FROM demo_todos`;

    const sampleTodosPath = path.join(__dirname, "../prisma/sample-todos.json");
    const sampleTodos: SampleTodo[] = JSON.parse(
      fs.readFileSync(sampleTodosPath, "utf8")
    );

    for (const todo of sampleTodos) {
      await prisma.$executeRaw`
        INSERT INTO demo_todos (id, text, completed, createdAt, updatedAt)
        VALUES (${todo.id}, ${todo.text}, ${todo.completed}, ${todo.createdAt}, ${todo.updatedAt})
      `;
    }

    console.log(
      `✅ Successfully seeded ${sampleTodos?.length} todos to demo table`
    );
  } catch (error) {
    console.error("❌ Error seeding demo data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDemoData();
