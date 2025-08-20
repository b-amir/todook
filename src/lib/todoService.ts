import { prisma } from "./database";
import type { Todo, UpdateTodoRequest } from "@/types/todo";

export async function getAllTodos(): Promise<Todo[]> {
  return prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createTodo(text: string): Promise<Todo> {
  return prisma.todo.create({
    data: { text },
  });
}

export async function updateTodo(
  id: string,
  data: UpdateTodoRequest
): Promise<Todo> {
  return prisma.todo.update({
    where: { id },
    data,
  });
}

export async function deleteTodo(id: string): Promise<void> {
  await prisma.todo.delete({
    where: { id },
  });
}
