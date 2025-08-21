import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { todoSchema } from "@/types/todo";

type TodoFormValues = z.infer<typeof todoSchema>;

interface UseTodoFormOptions {
  defaultText?: string;
  mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
}

export const useTodoForm = ({
  defaultText,
  mode = "onChange",
}: UseTodoFormOptions = {}) => {
  return useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    mode,
    defaultValues: {
      text: defaultText || "",
    },
  });
};
