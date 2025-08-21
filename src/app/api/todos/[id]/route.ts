import { NextRequest, NextResponse } from "next/server";
import { updateTodo, deleteTodo } from "@/lib/todoService";
import { API_CONSTANTS } from "@/constants/api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: API_CONSTANTS.ERROR_MESSAGES.UPDATE_DATA_REQUIRED },
        { status: API_CONSTANTS.STATUS_BAD_REQUEST }
      );
    }

    const todo = await updateTodo(id, updates);
    return NextResponse.json({ todo });
  } catch {
    return NextResponse.json(
      { error: API_CONSTANTS.ERROR_MESSAGES.FAILED_TO_UPDATE_TODO },
      { status: API_CONSTANTS.STATUS_INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteTodo(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: API_CONSTANTS.ERROR_MESSAGES.FAILED_TO_DELETE_TODO },
      { status: API_CONSTANTS.STATUS_INTERNAL_SERVER_ERROR }
    );
  }
}
