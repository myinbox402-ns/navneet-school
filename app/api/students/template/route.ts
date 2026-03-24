import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    // Sample data showing how to fill the template
    const templateData = [
      {
        "Admission No": "NPSS-001",
        "First Name": "Aarav",
        "Last Name": "Sharma",
        "Date of Birth": "2015-04-12",
        "Gender": "Male",
        "Class": "Class 5th",
        "Section": "Shaheed Bhagat Singh Ji",
        "Phone": "98100-11111",
        "Address": "Narmana, Nabha",
        "Father Name": "Rajesh Sharma",
      },
      {
        "Admission No": "NPSS-002",
        "First Name": "Priya",
        "Last Name": "Verma",
        "Date of Birth": "2013-07-03",
        "Gender": "Female",
        "Class": "Class 6th",
        "Section": "Bhai Partap Singh Ji",
        "Phone": "98100-22222",
        "Address": "Narmana, Nabha",
        "Father Name": "Suresh Verma",
      },
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Main student sheet
    const studentSheet = XLSX.utils.json_to_sheet(templateData);

    // Set column widths
    studentSheet["!cols"] = [
      { wch: 12 }, // Admission No
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 15 }, // Date of Birth
      { wch: 10 }, // Gender
      { wch: 15 }, // Class
      { wch: 30 }, // Section
      { wch: 15 }, // Phone
      { wch: 25 }, // Address
      { wch: 20 }, // Father Name
    ];

    XLSX.utils.book_append_sheet(workbook, studentSheet, "Students");

    // Class reference sheet
    const classData = [
      { "Class Name": "Pre KG (Nursery)", "Section Name": "Tiny Champions" },
      { "Class Name": "Pre KG (Nursery)", "Section Name": "Brighter Rainbow" },
      { "Class Name": "Pre KG (Nursery)", "Section Name": "Shining Stars" },
      { "Class Name": "Pre KG (Nursery)", "Section Name": "Morning Sunbeams" },
      { "Class Name": "KG1", "Section Name": "Apple" },
      { "Class Name": "KG1", "Section Name": "Pear" },
      { "Class Name": "KG1", "Section Name": "Mango" },
      { "Class Name": "KG1", "Section Name": "Pine Apple" },
      { "Class Name": "KG2", "Section Name": "Tulip" },
      { "Class Name": "KG2", "Section Name": "Rose" },
      { "Class Name": "KG2", "Section Name": "Lotus" },
      { "Class Name": "Class 1st", "Section Name": "Zincron" },
      { "Class Name": "Class 1st", "Section Name": "Coral" },
      { "Class Name": "Class 1st", "Section Name": "Sapphire" },
      { "Class Name": "Class 1st", "Section Name": "Opal" },
      { "Class Name": "Class 1st", "Section Name": "Topaz" },
      { "Class Name": "Class 1st", "Section Name": "Stud" },
      { "Class Name": "Class 2nd", "Section Name": "Bhai Dayala Ji" },
      { "Class Name": "Class 2nd", "Section Name": "Bhagat Puran" },
      { "Class Name": "Class 2nd", "Section Name": "Bhai Nand Lal Ji" },
      { "Class Name": "Class 2nd", "Section Name": "Bhai Veer Singh Ji" },
      { "Class Name": "Class 2nd", "Section Name": "Bhai Kanhaiya Ji" },
      { "Class Name": "Class 2nd", "Section Name": "Dr. Inderjit Kaur" },
      { "Class Name": "Class 3rd", "Section Name": "Bhai Randhir Singh Ji" },
      { "Class Name": "Class 3rd", "Section Name": "Ripudaman Singh Ji" },
      { "Class Name": "Class 3rd", "Section Name": "Bhai Kahan Singh Ji" },
      { "Class Name": "Class 3rd", "Section Name": "Baba Gurditt Singh Ji" },
      { "Class Name": "Class 3rd", "Section Name": "Captain Mohan Singh Ji" },
      { "Class Name": "Class 4th", "Section Name": "Maharaja Kharak Singh Ji" },
      { "Class Name": "Class 4th", "Section Name": "Mata Raj Kaur Ji" },
      { "Class Name": "Class 4th", "Section Name": "Sr. Charat Singh Ji" },
      { "Class Name": "Class 4th", "Section Name": "S. Sher Singh Ji" },
      { "Class Name": "Class 5th", "Section Name": "Dr. Diwan Singh Kalepani" },
      { "Class Name": "Class 5th", "Section Name": "Bhai Kishan Singh Ji" },
      { "Class Name": "Class 5th", "Section Name": "Sr. Kartar Singh Sarabha" },
      { "Class Name": "Class 5th", "Section Name": "Shaheed Bhagat Singh Ji" },
      { "Class Name": "Class 5th", "Section Name": "Shaheed Udham Singh Ji" },
      { "Class Name": "Class 6th", "Section Name": "Bhai Partap Singh Ji" },
      { "Class Name": "Class 6th", "Section Name": "Baba Banda Singh Bahadur Ji" },
      { "Class Name": "Class 6th", "Section Name": "Giani Ditt Singh Ji" },
      { "Class Name": "Class 6th", "Section Name": "Bhai Bachittar Singh Ji" },
      { "Class Name": "Class 6th", "Section Name": "Bhai Jiwan Singh Ji" },
      { "Class Name": "Class 7th", "Section Name": "C.V. Raman" },
      { "Class Name": "Class 7th", "Section Name": "Sunita William" },
      { "Class Name": "Class 7th", "Section Name": "Kalpana Chawla" },
      { "Class Name": "Class 7th", "Section Name": "Bachendri Pal" },
      { "Class Name": "Class 7th", "Section Name": "Neil Armstrong" },
      { "Class Name": "Class 8th", "Section Name": "Bhai Mani Singh Ji" },
      { "Class Name": "Class 8th", "Section Name": "Bhai Mati Dass Ji" },
      { "Class Name": "Class 8th", "Section Name": "Bhai Sati Dass Ji" },
      { "Class Name": "Class 8th", "Section Name": "Bhai Taru Singh Ji" },
      { "Class Name": "Class 9th", "Section Name": "Mata Bhag Kaur Ji" },
      { "Class Name": "Class 9th", "Section Name": "Bhai Nibahu Singh Ji" },
      { "Class Name": "Class 9th", "Section Name": "Bhai Subeg Singh Ji" },
      { "Class Name": "Class 9th", "Section Name": "Bhai Sehwaj Singh Ji" },
      { "Class Name": "Class 9th", "Section Name": "Bhai Baghel Singh Ji" },
      { "Class Name": "Class 10th", "Section Name": "Bhai Daya Singh Ji" },
      { "Class Name": "Class 10th", "Section Name": "Bhai Dharam Singh Ji" },
      { "Class Name": "Class 10th", "Section Name": "Bhai Sahib Singh Ji" },
      { "Class Name": "Class 10th", "Section Name": "Bhai Mohkam Singh Ji" },
      { "Class Name": "Class 10th", "Section Name": "Bhai Himmat Singh Ji" },
      { "Class Name": "Class 11th", "Section Name": "Maharaja Ranjit Singh Ji (Science)" },
      { "Class Name": "Class 11th", "Section Name": "Maharaja Duleep Singh Ji (Commerce)" },
      { "Class Name": "Class 11th", "Section Name": "Sham Singh Attari (Arts)" },
      { "Class Name": "Class 12th", "Section Name": "Sardar Hari Singh Nalwa Ji (Science)" },
      { "Class Name": "Class 12th", "Section Name": "Baba Deep Singh Ji (Commerce)" },
      { "Class Name": "Class 12th", "Section Name": "Sardar Jassa Singh Ramgarhia (Arts+Com)" },
      { "Class Name": "Class 12th", "Section Name": "Nawab Kapoor Singh Ji (Arts)" },
    ];

    const classSheet = XLSX.utils.json_to_sheet(classData);
    classSheet["!cols"] = [{ wch: 20 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(workbook, classSheet, "Class Reference");

    // Convert to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=NPSS_Student_Import_Template.xlsx",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}