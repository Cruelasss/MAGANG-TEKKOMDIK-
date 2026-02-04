"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p>Loading Data Cerdas...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Ringkasan</h1>
      
      {/* Statistik Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {stats.status.map((s: any) => (
          <div key={s.status} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
            <p className="text-gray-500 uppercase text-xs font-bold">{s.status}</p>
            <p className="text-3xl font-bold">{s._count.id} Orang</p>
          </div>
        ))}
      </div>

      {/* Tabel Recent Logs */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Aktivitas Sistem Terbaru</h2>
        <div className="space-y-3">
          {stats.recentLogs.map((log: any) => (
            <div key={log.id} className="text-sm p-3 border-b border-gray-100 flex justify-between">
              <span>{log.keterangan}</span>
              <span className="text-gray-400 italic">{new Date(log.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}