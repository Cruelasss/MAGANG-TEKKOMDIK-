import { prisma } from "./prisma";

export async function createLog(pesertaId: string, aksi: string, keterangan: string) {
  await prisma.auditLog.create({
    data: {
      pesertaId,
      aksi,
      keterangan,
    },
  });
}