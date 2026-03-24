import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create Academic Year
    let academicYear = await prisma.academicYear.findFirst({
      where: { name: "2025-2026" },
    });
    if (!academicYear) {
      academicYear = await prisma.academicYear.create({
        data: {
          name: "2025-2026",
          startDate: new Date("2025-04-01"),
          endDate: new Date("2026-03-31"),
          isCurrent: true,
        },
      });
    }

    // All classes with exact section names
    const classData = [
      // Nursery
      { name: "Pre KG (Nursery)", section: "Tiny Champions" },
      { name: "Pre KG (Nursery)", section: "Brighter Rainbow" },
      { name: "Pre KG (Nursery)", section: "Shining Stars" },
      { name: "Pre KG (Nursery)", section: "Morning Sunbeams" },
      // KG1
      { name: "KG1", section: "Apple" },
      { name: "KG1", section: "Pear" },
      { name: "KG1", section: "Mango" },
      { name: "KG1", section: "Pine Apple" },
      // KG2
      { name: "KG2", section: "Tulip" },
      { name: "KG2", section: "Rose" },
      { name: "KG2", section: "Lotus" },
      // Class 1
      { name: "Class 1st", section: "Zincron" },
      { name: "Class 1st", section: "Coral" },
      { name: "Class 1st", section: "Sapphire" },
      { name: "Class 1st", section: "Opal" },
      { name: "Class 1st", section: "Topaz" },
      { name: "Class 1st", section: "Stud" },
      // Class 2
      { name: "Class 2nd", section: "Bhai Dayala Ji" },
      { name: "Class 2nd", section: "Bhagat Puran" },
      { name: "Class 2nd", section: "Bhai Nand Lal Ji" },
      { name: "Class 2nd", section: "Bhai Veer Singh Ji" },
      { name: "Class 2nd", section: "Bhai Kanhaiya Ji" },
      { name: "Class 2nd", section: "Dr. Inderjit Kaur" },
      // Class 3
      { name: "Class 3rd", section: "Bhai Randhir Singh Ji" },
      { name: "Class 3rd", section: "Ripudaman Singh Ji" },
      { name: "Class 3rd", section: "Bhai Kahan Singh Ji" },
      { name: "Class 3rd", section: "Baba Gurditt Singh Ji" },
      { name: "Class 3rd", section: "Captain Mohan Singh Ji" },
      // Class 4
      { name: "Class 4th", section: "Maharaja Kharak Singh Ji" },
      { name: "Class 4th", section: "Mata Raj Kaur Ji" },
      { name: "Class 4th", section: "Sr. Charat Singh Ji" },
      { name: "Class 4th", section: "S. Sher Singh Ji" },
      // Class 5
      { name: "Class 5th", section: "Dr. Diwan Singh Kalepani" },
      { name: "Class 5th", section: "Bhai Kishan Singh Ji" },
      { name: "Class 5th", section: "Sr. Kartar Singh Sarabha" },
      { name: "Class 5th", section: "Shaheed Bhagat Singh Ji" },
      { name: "Class 5th", section: "Shaheed Udham Singh Ji" },
      // Class 6
      { name: "Class 6th", section: "Bhai Partap Singh Ji" },
      { name: "Class 6th", section: "Baba Banda Singh Bahadur Ji" },
      { name: "Class 6th", section: "Giani Ditt Singh Ji" },
      { name: "Class 6th", section: "Bhai Bachittar Singh Ji" },
      { name: "Class 6th", section: "Bhai Jiwan Singh Ji" },
      // Class 7
      { name: "Class 7th", section: "C.V. Raman" },
      { name: "Class 7th", section: "Sunita William" },
      { name: "Class 7th", section: "Kalpana Chawla" },
      { name: "Class 7th", section: "Bachendri Pal" },
      { name: "Class 7th", section: "Neil Armstrong" },
      // Class 8
      { name: "Class 8th", section: "Bhai Mani Singh Ji" },
      { name: "Class 8th", section: "Bhai Mati Dass Ji" },
      { name: "Class 8th", section: "Bhai Sati Dass Ji" },
      { name: "Class 8th", section: "Bhai Taru Singh Ji" },
      // Class 9
      { name: "Class 9th", section: "Mata Bhag Kaur Ji" },
      { name: "Class 9th", section: "Bhai Nibahu Singh Ji" },
      { name: "Class 9th", section: "Bhai Subeg Singh Ji" },
      { name: "Class 9th", section: "Bhai Sehwaj Singh Ji" },
      { name: "Class 9th", section: "Bhai Baghel Singh Ji" },
      // Class 10
      { name: "Class 10th", section: "Bhai Daya Singh Ji" },
      { name: "Class 10th", section: "Bhai Dharam Singh Ji" },
      { name: "Class 10th", section: "Bhai Sahib Singh Ji" },
      { name: "Class 10th", section: "Bhai Mohkam Singh Ji" },
      { name: "Class 10th", section: "Bhai Himmat Singh Ji" },
      // Class 11
      { name: "Class 11th", section: "Maharaja Ranjit Singh Ji (Science)" },
      { name: "Class 11th", section: "Maharaja Duleep Singh Ji (Commerce)" },
      { name: "Class 11th", section: "Sham Singh Attari (Arts)" },
      // Class 12
      { name: "Class 12th", section: "Sardar Hari Singh Nalwa Ji (Science)" },
      { name: "Class 12th", section: "Baba Deep Singh Ji (Commerce)" },
      { name: "Class 12th", section: "Sardar Jassa Singh Ramgarhia (Arts+Com)" },
      { name: "Class 12th", section: "Nawab Kapoor Singh Ji (Arts)" },
    ];

    let created = 0;
    for (const cls of classData) {
      const existing = await prisma.class.findFirst({
        where: { name: cls.name, section: cls.section },
      });
      if (!existing) {
        await prisma.class.create({
          data: {
            name: cls.name,
            section: cls.section,
            academicYearId: academicYear.id,
          },
        });
        created++;
      }
    }

    // Create Admin if not exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@npss.edu" },
    });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin@2026", 10);
      await prisma.user.create({
        data: {
          name: "Admin",
          email: "admin@npss.edu",
          password: hashedPassword,
          role: "ADMIN",
        },
      });
    }

    return NextResponse.json({
      message: "✅ Setup complete!",
      totalClasses: classData.length,
      newlyCreated: created,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}