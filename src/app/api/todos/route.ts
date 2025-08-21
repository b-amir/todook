import { NextRequest, NextResponse } from "next/server";
import { getAllTodos, createTodo } from "@/lib/todoService";
import { API_CONSTANTS } from "@/constants/api";

export async function GET() {
  try {
    const todos = await getAllTodos();
    return NextResponse.json({ todos });
  } catch {
    return NextResponse.json(
      { error: API_CONSTANTS.ERROR_MESSAGES.FAILED_TO_FETCH_TODOS },
      { status: API_CONSTANTS.STATUS_INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text?.trim()) {
      return NextResponse.json(
        { error: API_CONSTANTS.ERROR_MESSAGES.TODO_TEXT_REQUIRED },
        { status: API_CONSTANTS.STATUS_BAD_REQUEST }
      );
    }

    const todo = await createTodo(text.trim());
    return NextResponse.json(
      { todo },
      { status: API_CONSTANTS.STATUS_CREATED }
    );
  } catch {
    return NextResponse.json(
      { error: API_CONSTANTS.ERROR_MESSAGES.FAILED_TO_CREATE_TODO },
      { status: API_CONSTANTS.STATUS_INTERNAL_SERVER_ERROR }
    );
  }
}
