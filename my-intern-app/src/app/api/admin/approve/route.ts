import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(req: Request) {
  try {
    const { id, pembimbingNama } = await req.json();

    const result = await prisma.$transaction(async (tx) => {
      // 1. Update status di database
      const updatedPeserta = await tx.peserta.update({
        where: { id },
        data: { 
          status: "AKTIF",
          pembimbing: pembimbingNama,
        },
      });

      // 2. Kirim Email Otomatis
      // Di paket gratis Resend, Anda hanya bisa kirim ke email sendiri (testing)
      // Jika sudah punya domain, bisa kirim ke siapa saja.
      await resend.emails.send({
        from: 'Balai Tekkomdik <onboarding@resend.dev>',
        to: updatedPeserta.email,
        subject: 'Selamat! Pendaftaran Magang Anda Diterima',
        html: `
          <h1>Halo, ${updatedPeserta.nama}!</h1>
          <p>Selamat, pendaftaran magang Anda di <strong>Balai Teknologi Komunikasi Pendidikan (Balai Tekkomdik) Daerah Istimewa Yogyakarta </strong> telah disetujui.</p>
          <p><strong>Pembimbing:</strong> ${pembimbingNama}</p>
          <p>Silakan datang pada tanggal yang telah ditentukan. Selamat bergabung!</p>
        `,
      });

      // 3. Catat di Log
      await tx.auditLog.create({
        data: {
          pesertaId: updatedPeserta.id,
          aksi: "APPROVAL_SUCCESS",
          keterangan: `Diterima oleh Admin & Email dikirim ke ${updatedPeserta.email}`,
        },
      });

      return updatedPeserta;
    });

    return NextResponse.json({ message: "One-Click Success: Status Update + Email Terkirim!" });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Gagal: " + error.message }, { status: 500 });
  }
}