import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      // COPY-PASTE URL DATABASE DARI .env KE SINI
      url: "postgresql://postgres:CHOIRULAMIRs@db.gnvvhstkfxgjbsrnrpkw.supabase.co:5432/postgres"
    },
  },
});