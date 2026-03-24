import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { class: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, dateOfBirth, gender, address, phone, classId, parentPhone, studentId } = body;

    if (!firstName || !lastName || !classId || !dateOfBirth || !studentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const student = await prisma.student.create({
      data: {
        studentId,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        address: address || "",
        phone: parentPhone || "",
        classId,
      },
    });

    return NextResponse.json(student);
  } catch (error: any) {
    console.error("Student creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create student" }, { status: 500 });
  }
}