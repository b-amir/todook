import { NextRequest, NextResponse } from "next/server";
import { updateTodo, deleteTodo } from "@/lib/todoService";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Update data is required" },
        { status: 400 }
      );
    }

    const todo = await updateTodo(id, updates);
    return NextResponse.json({ todo });
  } catch {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
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
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
