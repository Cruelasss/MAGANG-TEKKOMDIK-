"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin"); // Redirect ke dashboard admin jika sukses
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Admin Login</h1>
          <p className="text-gray-500 mt-2">Sistem Informasi Magang Tekkomdik</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Admin</label>
            <input
              type="email"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="admin@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white p-3 rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400"
          >
            {loading ? "Mengecek..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}