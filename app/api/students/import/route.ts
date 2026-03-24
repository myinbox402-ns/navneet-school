import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read Excel file
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet) as any[];

    if (rows.length === 0) {
      return NextResponse.json({ error: "Excel file is empty" }, { status: 400 });
    }

    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const row of rows) {
      try {
        // Find class by name and section
        const className = String(row["Class"] || "").trim();
        const sectionName = String(row["Section"] || "").trim();

        const cls = await prisma.class.findFirst({
          where: {
            name: { contains: className, mode: "insensitive" },
            section: { contains: sectionName, mode: "insensitive" },
          },
        });

        if (!cls) {
          failed++;
          errors.push(`Row ${success + failed}: Class "${className} - ${sectionName}" not found`);
          continue;
        }

        // Check if student already exists
        const studentId = String(row["Admission No"] || row["Roll No"] || "").trim();
        if (!studentId) {
          failed++;
          errors.push(`Row ${success + failed}: Missing Admission No`);
          continue;
        }

        const existing = await prisma.student.findUnique({
          where: { studentId },
        });

        if (existing) {
          failed++;
          errors.push(`${studentId} already exists`);
          continue;
        }

        // Create student
        await prisma.student.create({
          data: {
            studentId,
            firstName: String(row["First Name"] || "").trim(),
            lastName: String(row["Last Name"] || "").trim(),
            dateOfBirth: new Date(row["Date of Birth"] || "2010-01-01"),
            gender: String(row["Gender"] || "Male").trim(),
            address: String(row["Address"] || "").trim(),
            phone: String(row["Phone"] || "").trim(),
            classId: cls.id,
          },
        });
        success++;
      } catch (err: any) {
        failed++;
        errors.push(`Error: ${err.message}`);
      }
    }

    return NextResponse.json({
      message: `✅ Import complete! ${success} students added, ${failed} failed.`,
      success,
      failed,
      errors: errors.slice(0, 10),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
