"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, ShoppingCart, Box, BarChart2 } from "lucide-react";
import { useOrg } from "@/context/OrgContext";

export default function DashboardNav({ active, setActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { org } = useOrg();

  const menuItems = [
    { name: "Пропайл", icon: <User size={20} /> },
    { name: "Борлуулалт", icon: <BarChart2 size={20} /> },
    { name: "Бүтээгдэхүүн", icon: <Box size={20} /> },
    { name: "Захиалгын жагсаалт", icon: <ShoppingCart size={20} /> },
  ];

  const handleLogout = () => router.push("/login");

  // Хэрэв зураг байхгүй бол default
  const logoUrl =
    org?.image || "https://via.placeholder.com/150?text=Logo+Not+Found";

  // Хэрэв нэр байхгүй бол default
  const orgName = org?.name || "Байгууллагын нэр";

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div
            className="h-10 w-10 rounded-xl bg-center bg-cover"
            style={{ backgroundImage: `url(${logoUrl})` }}
          />
          <h2 className="text-lg font-semibold">{orgName}</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md border border-gray-200"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full md:h-screen bg-white shadow-xl border-r border-gray-200 p-6 w-64 md:static md:w-[280px] transform transition-transform duration-300 z-50
    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-10">
            {/* Logo */}
            <div className="hidden md:flex items-center gap-4 p-3 rounded-lg border border-gray-100 shadow-sm bg-white">
              <div
                role="img"
                aria-label="байгууллын лого"
                className="h-14 w-14 rounded-xl bg-center bg-cover shadow"
                style={{ backgroundImage: `url(${logoUrl})` }}
              />
              <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
                {orgName}
              </h2>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium hover:bg-gray-100 ${
                    active === item.name
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    setActive(item.name);
                    setIsOpen(false);
                  }}
                >
                  {item.icon}
                  <span className="text-sm md:text-base">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:text-red-600 transition"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span className="text-sm md:text-base">Гарах</span>
          </button>
        </div>
      </nav>
    </>
  );
}
