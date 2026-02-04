"use client";
import { useState } from "react";

export default function PendaftaranPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/daftar", {
        method: "POST",
        body: formData, // Mengirim teks + file sekaligus
      });

      const data = await res.json();

      if (res.ok) {
        alert("Pendaftaran Berhasil! Silakan cek email Anda secara berkala.");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Gagal: " + data.message);
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Form Pendaftaran Magang</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama Lengkap</label>
            <input name="nama" type="text" required className="w-full p-2 border rounded-md" placeholder="Nama sesuai KTP/KTM" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Aktif</label>
            <input name="email" type="email" required className="w-full p-2 border rounded-md" placeholder="contoh@gmail.com" />
          </div>

          <div>
            <label className="block text-sm font-medium">Nomor WhatsApp</label>
            <input name="whatsapp" type="tel" required className="w-full p-2 border rounded-md" placeholder="0812xxxx" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Instansi</label>
              <input name="instansi" type="text" required className="w-full p-2 border rounded-md" placeholder="SMK/Univ" />
            </div>
            <div>
              <label className="block text-sm font-medium">Jurusan</label>
              <input name="jurusan" type="text" required className="w-full p-2 border rounded-md" placeholder="TKJ/RPL/TI" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Tgl Mulai</label>
              <input name="tglMulai" type="date" required className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Tgl Selesai</label>
              <input name="tglSelesai" type="date" required className="w-full p-2 border rounded-md" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Berkas (PDF)</label>
            <input name="berkas" type="file" accept="application/pdf" required className="w-full text-sm mt-1" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Sedang Mengirim..." : "Kirim Pendaftaran"}
          </button>
        </form>
      </div>
    </div>
  );
}