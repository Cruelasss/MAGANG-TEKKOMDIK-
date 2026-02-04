import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadBerkas } from "@/lib/storage"; // TAMBAHKAN IMPORT INI

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const email = formData.get("email") as string;
    const file = formData.get("berkas") as File;

    // Pastikan file ada sebelum upload
    if (!file) {
      return NextResponse.json({ message: "Berkas wajib diunggah." }, { status: 400 });
    }

    // 1. Upload ke Supabase Storage
    const publicUrl = await uploadBerkas(file, "pendaftaran");

    // 2. Simpan ke Database
    const pendaftar = await prisma.peserta.create({
      data: {
        nama: formData.get("nama") as string,
        email: email,
        whatsapp: formData.get("whatsapp") as string,
        instansi: formData.get("instansi") as string,
        jurusan: formData.get("jurusan") as string,
        tglMulai: new Date(formData.get("tglMulai") as string),
        tglSelesai: new Date(formData.get("tglSelesai") as string),
        berkasUrl: publicUrl,
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Pendaftaran berhasil diproses." }, { status: 201 });

  } catch (error: any) {
    console.error("DEBUG ERROR:", error);
    return NextResponse.json({ 
      message: "Gagal memproses pendaftaran.",
      detail: error.message 
    }, { status: 500 });
  }
}