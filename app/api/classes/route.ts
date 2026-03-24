import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all classes
export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        academicYear: true,
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
  }
}