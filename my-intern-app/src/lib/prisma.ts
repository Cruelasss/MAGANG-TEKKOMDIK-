import { PrismaClient } from "@prisma/client";

// Mencegah pembuatan banyak koneksi ke database saat "Fast Refresh" di Next.js
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;