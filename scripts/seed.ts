const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@2026", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@npss.edu" },
    update: {},
    create: {
      email: "admin@npss.edu",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });
  
  console.log("✅ Admin created:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());