import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar di sebelah kiri */}
      <Sidebar />
      
      {/* Konten utama di sebelah kanan */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}