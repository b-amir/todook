import { prisma } from "./database";
import type { Todo, UpdateTodoRequest } from "@/types/todo";

export async function getAllTodos(isDemo: boolean = false): Promise<Todo[]> {
  if (isDemo) {
    const demoTodos = await prisma.$queryRaw`
      SELECT id, text, completed, createdAt, updatedAt 
      FROM demo_todos 
      ORDER BY createdAt DESC
    `;
    return demoTodos as Todo[];
  }

  return prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createTodo(
  text: string,
  isDemo: boolean = false
): Promise<Todo> {
  if (isDemo) {
    const id = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    await prisma.$executeRaw`
      INSERT INTO demo_todos (id, text, completed, createdAt, updatedAt)
      VALUES (${id}, ${text}, false, ${now}, ${now})
    `;

    return {
      id,
      text,
      completed: false,
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };
  }

  return prisma.todo.create({
    data: { text },
  });
}

export async function updateTodo(
  id: string,
  data: UpdateTodoRequest,
  isDemo: boolean = false
): Promise<Todo> {
  if (isDemo) {
    const updates = [];
    const values = [];

    if (data.text !== undefined) {
      updates.push("text = ?");
      values.push(data.text);
    }

    if (data.completed !== undefined) {
      updates.push("completed = ?");
      values.push(data.completed);
    }

    updates.push("updatedAt = ?");
    values.push(new Date().toISOString());
    values.push(id);

    await prisma.$executeRawUnsafe(
      `UPDATE demo_todos SET ${updates.join(", ")} WHERE id = ?`,
      ...values
    );

    const updatedTodos = (await prisma.$queryRawUnsafe(
      "SELECT id, text, completed, createdAt, updatedAt FROM demo_todos WHERE id = ?",
      id
    )) as Todo[];

    return updatedTodos?.[0];
  }

  return prisma.todo.update({
    where: { id },
    data,
  });
}

export async function deleteTodo(
  id: string,
  isDemo: boolean = false
): Promise<void> {
  if (isDemo) {
    await prisma.$executeRaw`DELETE FROM demo_todos WHERE id = ${id}`;
  } else {
    await prisma.todo.delete({
      where: { id },
    });
  }
}

export async function deleteAllTodos(isDemo: boolean = false): Promise<void> {
  if (isDemo) {
    await prisma.$executeRaw`DELETE FROM demo_todos`;
  } else {
    await prisma.todo.deleteMany();
  }
}
