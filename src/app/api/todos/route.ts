import { NextRequest, NextResponse } from "next/server";
import { getAllTodos, createTodo } from "@/lib/todoService";

export async function GET() {
  try {
    const todos = await getAllTodos();
    return NextResponse.json({ todos });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text?.trim()) {
      return NextResponse.json(
        { error: "Todo text is required" },
        { status: 400 }
      );
    }

    const todo = await createTodo(text.trim());
    return NextResponse.json({ todo }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
