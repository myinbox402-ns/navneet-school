import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const examName = formData.get("examName") as string || "Midterm 2025-26";
    const classId = formData.get("classId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read Excel
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet) as any[];

    if (rows.length === 0) {
      return NextResponse.json({ error: "Excel file is empty" }, { status: 400 });
    }

    // Get or create exam
    let exam = await prisma.exam.findFirst({
      where: { name: examName },
    });
    if (!exam) {
      exam = await prisma.exam.create({
        data: {
          name: examName,
          type: "MIDTERM",
          totalMarks: 100,
          date: new Date(),
        },
      });
    }

    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const row of rows) {
      try {
        // Find student by admission number
        const admNo = String(row["Admission No"] || "").trim();
        if (!admNo) { failed++; continue; }

        const student = await prisma.student.findUnique({
          where: { studentId: admNo },
        });
        if (!student) {
          failed++;
          errors.push(`Student ${admNo} not found`);
          continue;
        }

        // Process each subject column
        const skipCols = ["Admission No","Student Name","Class","Section","Roll No"];
        for (const [subjectName, marksVal] of Object.entries(row)) {
          if (skipCols.includes(subjectName)) continue;
          const marks = Number(marksVal);
          if (isNaN(marks)) continue;

          // Get or create subject
          let subject = await prisma.subject.findFirst({
            where: {
              name: { equals: subjectName, mode: "insensitive" },
              classId: student.classId,
            },
          });
          if (!subject) {
            subject = await prisma.subject.create({
              data: {
                name: subjectName,
                code: subjectName.substring(0,6).toUpperCase(),
                classId: student.classId,
              },
            });
          }

          // Calculate CBSE grade
          let grade = "E";
          if(marks>=91) grade="A1"; else if(marks>=81) grade="A2";
          else if(marks>=71) grade="B1"; else if(marks>=61) grade="B2";
          else if(marks>=51) grade="C1"; else if(marks>=41) grade="C2";
          else if(marks>=33) grade="D";

          // Save grade
          await prisma.grade.upsert({
            where: {
              studentId_subjectId_examId: {
                studentId: student.id,
                subjectId: subject.id,
                examId: exam.id,
              },
            },
            update: { marks, grade },
            create: {
              studentId: student.id,
              subjectId: subject.id,
              examId: exam.id,
              marks,
              grade,
            },
          });
        }
        success++;
      } catch (err: any) {
        failed++;
        errors.push(err.message);
      }
    }

    return NextResponse.json({
      message: `✅ Grades imported! ${success} students processed, ${failed} failed.`,
      success,
      failed,
      errors: errors.slice(0, 10),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
