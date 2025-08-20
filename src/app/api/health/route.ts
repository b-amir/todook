import { NextResponse } from "next/server";
import { prisma } from "@/lib/database";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Database connection failed",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
