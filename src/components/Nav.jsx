"use client";

import Link from "next/link";
import { useSags } from "../context/SagsContext";
import { useState } from "react";

export default function Nav() {
  const { sags } = useSags();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalQuantity = sags.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link className="flex items-center gap-2 sm:gap-3" href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/187/187879.png"
            alt="logo"
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <h2 className="hidden sm:block text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white">
            Хөгжлийг бүтээгч
          </h2>
        </Link>

        {/* Desktop icons */}
        <div className="hidden md:flex gap-6 items-center relative">
          {/* Cart */}
          <Link href="/cart" className="relative group">
            <div
              className="bg-center bg-cover h-8 w-8 hover:scale-110 transition"
              style={{
                backgroundImage: `url("https://img.icons8.com/?size=96&id=P6ZYIof6BwLW&format=png")`,
              }}
            ></div>
            {totalQuantity > 0 && (
              <div className="absolute -top-2 -right-3 bg-red-600 text-white h-5 w-5 rounded-full flex items-center justify-center text-[11px] font-bold shadow-md">
                {totalQuantity}
              </div>
            )}
          </Link>

          {/* Login */}
          <Link href="/login">
            <div
              className="bg-center bg-cover h-8 w-8 hover:scale-110 transition"
              style={{
                backgroundImage: `url("https://img.icons8.com/?size=96&id=8Ti9KslZmll1&format=png")`,
              }}
            ></div>
          </Link>

          {/* Orders */}
          <Link href="/orders">
            <div
              className="bg-center bg-cover h-8 w-8 hover:scale-110 transition"
              style={{
                backgroundImage: `url("https://img.icons8.com/?size=96&id=cUGFxfE5Snpo&format=png")`,
              }}
            ></div>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition relative"
        >
          <span className="text-3xl">☰</span>
          {/* Mobile Cart Quantity on top of hamburger */}
          {totalQuantity > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-600 text-white h-5 w-5 rounded-full flex items-center justify-center text-[11px] font-bold shadow-md">
              {totalQuantity}
            </div>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-inner">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/cart" className="relative flex items-center gap-2">
              <span
                className="bg-center bg-cover h-7 w-7"
                style={{
                  backgroundImage: `url("https://img.icons8.com/?size=96&id=P6ZYIof6BwLW&format=png")`,
                }}
              ></span>
              <span>Сагс</span>
              {totalQuantity > 0 && (
                <span className="ml-auto bg-red-600 text-white h-5 w-5 rounded-full flex items-center justify-center text-[11px] font-bold shadow-md">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <Link href="/login" className="flex items-center gap-2">
              <span
                className="bg-center bg-cover h-7 w-7"
                style={{
                  backgroundImage: `url("https://img.icons8.com/?size=96&id=8Ti9KslZmll1&format=png")`,
                }}
              ></span>
              <span>Нэвтрэх</span>
            </Link>

            <Link href="/orders" className="flex items-center gap-2">
              <span
                className="bg-center bg-cover h-7 w-7"
                style={{
                  backgroundImage: `url("https://img.icons8.com/?size=96&id=cUGFxfE5Snpo&format=png")`,
                }}
              ></span>
              <span>Захиалгууд</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
