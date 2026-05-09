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
    const { firstName, lastName, dateOfBirth, gender, address, parentPhone, studentId, classId, academicYear } = body;

    if (!firstName || !lastName || !dateOfBirth || !studentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const yearName = academicYear || "2026-27";

    // ── Step 1: Find or create AcademicYear by name ──────────────────────────
    let academicYearRecord = await prisma.academicYear.findFirst({
      where: { name: yearName },
    });

    if (!academicYearRecord) {
      // Parse start and end year from "2026-27"
      const startYear = parseInt(yearName.split("-")[0]);
      const endYear   = startYear + 1;
      academicYearRecord = await prisma.academicYear.create({
        data: {
          name:      yearName,
          startDate: new Date(`${startYear}-04-01`),
          endDate:   new Date(`${endYear}-03-31`),
          isCurrent: false,
        },
      });
    }

    // ── Step 2: Find or create Class ─────────────────────────────────────────
    let resolvedClassId = classId;

    if (classId && classId.includes("||")) {
      const [cName, cSection] = classId.split("||");

      const foundClass = await prisma.class.findFirst({
        where: {
          name:          { equals: cName.trim(),    mode: "insensitive" },
          section:       { equals: cSection.trim(), mode: "insensitive" },
          academicYearId: academicYearRecord.id,
        },
      });

      if (!foundClass) {
        const newClass = await prisma.class.create({
          data: {
            name:          cName.trim(),
            section:       cSection.trim(),
            academicYearId: academicYearRecord.id,
          },
        });
        resolvedClassId = newClass.id;
      } else {
        resolvedClassId = foundClass.id;
      }
    }

    if (!resolvedClassId) {
      return NextResponse.json({ error: "Please select a class." }, { status: 400 });
    }

    // ── Step 3: Create Student ────────────────────────────────────────────────
    const student = await prisma.student.create({
      data: {
        studentId,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        address:  address     || "",
        phone:    parentPhone || "",
        classId:  resolvedClassId,
      },
    });

    return NextResponse.json(student);
  } catch (error: any) {
    console.error("Student creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create student" }, { status: 500 });
  }
}