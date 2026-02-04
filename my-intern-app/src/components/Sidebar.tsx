"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Peserta Magang", path: "/admin/peserta" },
    { name: "Audit Log", path: "/admin/log" },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-8 text-blue-300">Admin Tekkomdik</h2>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block p-3 rounded-lg transition ${
              pathname === item.path ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}