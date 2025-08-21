import { NextRequest, NextResponse } from "next/server";
import { getAllTodos, createTodo, deleteAllTodos } from "@/lib/todoService";
import { API_CONSTANTS } from "@/constants/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isDemo = searchParams.get("demo") === "true";

    const todos = await getAllTodos(isDemo);
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
    const { text, isDemo = false } = await request.json();

    if (!text?.trim()) {
      return NextResponse.json(
        { error: API_CONSTANTS.ERROR_MESSAGES.TODO_TEXT_REQUIRED },
        { status: API_CONSTANTS.STATUS_BAD_REQUEST }
      );
    }

    const todo = await createTodo(text.trim(), isDemo);
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isDemo = searchParams.get("demo") === "true";

    await deleteAllTodos(isDemo);

    return NextResponse.json(
      { message: API_CONSTANTS.SUCCESS_MESSAGES.ALL_TODOS_DELETED },
      { status: API_CONSTANTS.STATUS_OK }
    );
  } catch {
    return NextResponse.json(
      { error: API_CONSTANTS.ERROR_MESSAGES.FAILED_TO_DELETE_ALL_TODOS },
      { status: API_CONSTANTS.STATUS_INTERNAL_SERVER_ERROR }
    );
  }
}
