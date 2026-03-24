import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasources: {
    db: {
      url: "postgresql://postgres.rxuhgswknssxdqiqqztz:$-yLvi%@SL2uQ/#@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
",
    },
  },
})