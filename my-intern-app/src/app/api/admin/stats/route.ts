import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Ambil total peserta berdasarkan status
    const statsStatus = await prisma.peserta.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    // 2. Ambil statistik asal instansi (untuk grafik)
    const statsInstansi = await prisma.peserta.groupBy({
      by: ['instansi'],
      _count: {
        id: true,
      },
    });

    // 3. Ambil aktivitas terbaru dari Audit Log
    const recentLogs = await prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      status: statsStatus,
      instansi: statsInstansi,
      recentLogs: recentLogs
    });

  } catch (error) {
    return NextResponse.json({ message: "Gagal mengambil data analitik" }, { status: 500 });
  }
}