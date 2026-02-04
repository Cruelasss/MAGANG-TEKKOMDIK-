import { z } from "zod";

export const PendaftaranSchema = z.object({
  nama: z.string().min(3, "Nama terlalu pendek"),
  email: z.string().email("Format email tidak valid"),
  whatsapp: z.string().min(10, "Nomor WA tidak valid"),
  instansi: z.string().min(2, "Instansi wajib diisi"),
  jurusan: z.string().min(2, "Jurusan wajib diisi"),
  tglMulai: z.string().refine((date) => !isNaN(Date.parse(date)), "Tanggal tidak valid"),
  tglSelesai: z.string().refine((date) => !isNaN(Date.parse(date)), "Tanggal tidak valid"),
});