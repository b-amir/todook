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
    )
    .refine((text) => {
      const hasAlphanumeric = /[a-zA-Z0-9]/.test(text);
      const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(text);

      return !hasSpecialChars || hasAlphanumeric;
    }, "Todo can't be filled with only special characters"),
});

export type TodoFormData = z.infer<typeof todoSchema>;
