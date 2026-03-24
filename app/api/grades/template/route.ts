import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classGroup = searchParams.get("class") || "35";

    const workbook = XLSX.utils.book_new();

    if (classGroup === "35") {
      // Class 3-5 template
      const subjects = ["English","Punjabi","Hindi","Math","Computer","EVS"];
      const headers = ["Admission No","Student Name","Roll No","Class","Section"];
      subjects.forEach(sub => {
        headers.push(
          `${sub} - PT`,
          `${sub} - Multiple Assessment`,
          `${sub} - Portfolio`,
          `${sub} - Subject Enrichment`,
          `${sub} - Half Yearly (80)`,
          `${sub} - Total (100)`
        );
      });
      headers.push("GK Grade","Work Edu","Art/Craft","Health & Phy","Discipline","Skill Subject");

      const sampleRow: any = {
        "Admission No":"NPSS-001",
        "Student Name":"Sample Student",
        "Roll No":"1",
        "Class":"Class 3rd",
        "Section":"Bhai Randhir Singh Ji",
      };
      subjects.forEach(sub => {
        sampleRow[`${sub} - PT`] = 5;
        sampleRow[`${sub} - Multiple Assessment`] = 5;
        sampleRow[`${sub} - Portfolio`] = 5;
        sampleRow[`${sub} - Subject Enrichment`] = 5;
        sampleRow[`${sub} - Half Yearly (80)`] = 60;
        sampleRow[`${sub} - Total (100)`] = 80;
      });
      sampleRow["GK Grade"] = "A";
      sampleRow["Work Edu"] = "A";
      sampleRow["Art/Craft"] = "B";
      sampleRow["Health & Phy"] = "A";
      sampleRow["Discipline"] = "A";
      sampleRow["Skill Subject"] = "A";

      const sheet = XLSX.utils.json_to_sheet([sampleRow]);
      sheet["!cols"] = headers.map((h) => ({ wch: Math.max(h.length + 2, 12) }));
      XLSX.utils.book_append_sheet(workbook, sheet, "Grades Class 3-5");

    } else if (classGroup === "68") {
      // Class 6-8 template
      const subjects = ["English","Punjabi","Hindi","Math","Science","Computer","Social Science"];
      const headers = ["Admission No","Student Name","Roll No","Class","Section"];
      subjects.forEach(sub => {
        headers.push(
          `${sub} - PT`,
          `${sub} - Multiple Assessment`,
          `${sub} - Portfolio`,
          `${sub} - Subject Enrichment`,
          `${sub} - Half Yearly (80)`,
          `${sub} - Total (100)`
        );
      });
      headers.push("GK Grade","Work Edu","Art/Craft","Health & Phy","Discipline","Skill Subject");

      const sampleRow: any = {
        "Admission No":"NPSS-001",
        "Student Name":"Sample Student",
        "Roll No":"1",
        "Class":"Class 6th",
        "Section":"Bhai Partap Singh Ji",
      };
      subjects.forEach(sub => {
        sampleRow[`${sub} - PT`] = 5;
        sampleRow[`${sub} - Multiple Assessment`] = 5;
        sampleRow[`${sub} - Portfolio`] = 5;
        sampleRow[`${sub} - Subject Enrichment`] = 5;
        sampleRow[`${sub} - Half Yearly (80)`] = 55;
        sampleRow[`${sub} - Total (100)`] = 75;
      });
      sampleRow["GK Grade"] = "A";
      sampleRow["Work Edu"] = "A";
      sampleRow["Art/Craft"] = "B";
      sampleRow["Health & Phy"] = "A";
      sampleRow["Discipline"] = "A";
      sampleRow["Skill Subject"] = "A";

      const sheet = XLSX.utils.json_to_sheet([sampleRow]);
      sheet["!cols"] = headers.map((h) => ({ wch: Math.max(h.length + 2, 12) }));
      XLSX.utils.book_append_sheet(workbook, sheet, "Grades Class 6-8");

    } else if (classGroup === "910") {
      // Class 9-10 template
      const subjects = [
        {code:"184", name:"English"},
        {code:"004", name:"Punjabi"},
        {code:"041", name:"Mathematics"},
        {code:"086", name:"Science"},
        {code:"087", name:"Social Science"},
        {code:"402", name:"Information Technology"},
        {code:"085", name:"Hindi Course-B"},
      ];
      const sampleRow: any = {
        "Admission No":"NPSS-001",
        "Student Name":"Sample Student",
        "Roll No":"1",
        "Class":"Class 9th",
        "Section":"Mata Bhag Kaur Ji",
      };
      subjects.forEach(sub => {
        sampleRow[`${sub.name} (${sub.code}) - Theory`] = 65;
        sampleRow[`${sub.name} (${sub.code}) - IA/Practical`] = 18;
      });
      sampleRow["Work Experience"] = "A";
      sampleRow["Health & Phy Education"] = "B";
      sampleRow["General Studies"] = "A";
      sampleRow["Discipline"] = "A";

      const sheet = XLSX.utils.json_to_sheet([sampleRow]);
      const headers = Object.keys(sampleRow);
      sheet["!cols"] = headers.map((h) => ({ wch: Math.max(h.length + 2, 12) }));
      XLSX.utils.book_append_sheet(workbook, sheet, "Grades Class 9-10");

    } else {
      // Class 11-12 templates
      const streamSubjects: Record<string, {code:string,name:string}[]> = {
        "1112_science_pcb": [
          {code:"301",name:"English Core"},{code:"044",name:"Biology"},
          {code:"042",name:"Physics"},{code:"043",name:"Chemistry"},
          {code:"083",name:"Computer Science"},{code:"048",name:"Physical Education"},
          {code:"041",name:"Math"},
        ],
        "1112_science_pcm": [
          {code:"301",name:"English Core"},{code:"042",name:"Physics"},
          {code:"043",name:"Chemistry"},{code:"041",name:"Math"},
          {code:"083",name:"Computer Science"},{code:"104",name:"Punjabi"},
          {code:"048",name:"Physical Education"},
        ],
        "1112_commerce": [
          {code:"301",name:"English Core"},{code:"083",name:"Computer Science"},
          {code:"055",name:"Accountancy"},{code:"054",name:"Business Studies"},
          {code:"030",name:"Economics"},{code:"104",name:"Punjabi"},
          {code:"041",name:"Math"},{code:"048",name:"Physical Education"},
        ],
        "1112_arts": [
          {code:"301",name:"English Core"},{code:"104",name:"Punjabi"},
          {code:"028",name:"Political Science"},{code:"029",name:"Geography"},
          {code:"030",name:"Economics"},{code:"041",name:"Math"},
          {code:"027",name:"History"},{code:"048",name:"Physical Education"},
        ],
      };

      const subjects = streamSubjects[classGroup] || streamSubjects["1112_science_pcb"];
      const streamName = classGroup.replace("1112_","").replace("_"," ").toUpperCase();

      const sampleRow: any = {
        "Admission No":"NPSS-001",
        "Student Name":"Sample Student",
        "Roll No":"1",
        "Class":"Class 11th",
        "Section":"Maharaja Ranjit Singh Ji (Science)",
      };
      subjects.forEach(sub => {
        sampleRow[`${sub.name} (${sub.code}) - Theory`] = 70;
        sampleRow[`${sub.name} (${sub.code}) - IA/Practical`] = 18;
      });
      sampleRow["Work Experience"] = "A";
      sampleRow["Health & Phy Education"] = "B";
      sampleRow["General Studies"] = "A";
      sampleRow["Discipline"] = "A";

      const sheet = XLSX.utils.json_to_sheet([sampleRow]);
      const headers = Object.keys(sampleRow);
      sheet["!cols"] = headers.map((h) => ({ wch: Math.max(h.length + 2, 14) }));
      XLSX.utils.book_append_sheet(workbook, sheet, `Grades ${streamName}`);
    }

    // Instructions sheet
    const instructions = [
      {"Instructions": "HOW TO FILL THIS GRADES TEMPLATE"},
      {"Instructions": "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"},
      {"Instructions": "1. Do NOT change the column headers"},
      {"Instructions": "2. Admission No must match exactly with the system"},
      {"Instructions": "3. For Class 3-8: Fill PT, Multiple Assessment, Portfolio, Subject Enrichment, Half Yearly, Total"},
      {"Instructions": "4. For Class 9-12: Fill Theory and IA/Practical marks"},
      {"Instructions": "5. For Co-Scholastic: Enter A, B, or C"},
      {"Instructions": "6. Save the file and upload in the software"},
      {"Instructions": "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"},
    ];
    const instrSheet = XLSX.utils.json_to_sheet(instructions);
    instrSheet["!cols"] = [{ wch: 60 }];
    XLSX.utils.book_append_sheet(workbook, instrSheet, "Instructions");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    const fileNames: Record<string,string> = {
      "35":"Class_3_to_5",
      "68":"Class_6_to_8",
      "910":"Class_9_to_10",
      "1112_science_pcb":"Class_11_12_Science_PCB",
      "1112_science_pcm":"Class_11_12_Science_PCM",
      "1112_commerce":"Class_11_12_Commerce",
      "1112_arts":"Class_11_12_Arts",
    };

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=NPSS_Grades_${fileNames[classGroup]||classGroup}.xlsx`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}