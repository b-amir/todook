import { z } from "zod";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  isPending?: boolean;
}

export interface CreateTodoRequest {
  text: string;
}

export interface UpdateTodoRequest {
  text?: string;
  completed?: boolean;
}

export const todoSchema = z.object({
  text: z
    .string()
    .min(3, "Todo must be at least 3 characters long")
    .max(200, "Todo cannot exceed 200 characters")
    .refine(
      (text) => !text.includes("<script") && !text.includes("javascript:"),
      "Todo contains invalid content"
    )
    .refine(
      (text) => !text.includes("data:text/html") && !text.includes("vbscript:"),
      "Todo contains invalid content"
    )
    .refine(
      (text) => !text.includes("onload=") && !text.includes("onerror="),
      "Todo contains invalid content"
    )
    .transform((text) => text.trim())
    .refine(
      (text) => text.length >= 3,
      "Todo must be at least 3 characters long after trimming"
    ),
});

export type TodoFormData = z.infer<typeof todoSchema>;
