import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <Sidebar />

          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Topbar */}
        <div className="md:hidden p-4 bg-white shadow flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>
          <h1 className="font-semibold">Dashboard</h1>
        </div>

        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
