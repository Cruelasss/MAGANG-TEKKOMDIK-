"use client";
import { useState, useEffect } from "react";

export default function PesertaPage() {
  const [peserta, setPeserta] = useState([]);

  // Ambil data peserta (kita asumsikan sudah ada API /api/admin/peserta)
  useEffect(() => {
    fetch("/api/admin/stats").then(res => res.json()).then(data => {
       // Untuk demo, kita pakai data dari stats atau buat API baru
    });
  }, []);

  async function handleApprove(id: string) {
    if (!confirm("Setujui pendaftar ini? Peserta akan otomatis menerima email konfirmasi.")) return;

    const res = await fetch("/api/admin/approve", {
      method: "PATCH",
      body: JSON.stringify({ id, pembimbingNama: "Admin Tekkomdik" }),
    });

    if (res.ok) {
      alert("One-Click Success! Status diperbarui & Email terkirim.");
      window.location.reload();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kelola Peserta Magang</h1>
      <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-left">Nama</th>
            <th className="p-4 text-left">Instansi</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping data peserta di sini */}
          {/* Tombol One-Click */}
          <button 
             onClick={() => handleApprove("ID_PESERTA")}
             className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
          >
            Setujui
          </button>
        </tbody>
      </table>
    </div>
  );
}