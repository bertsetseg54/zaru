"use client";

import React, { useEffect, useRef, useState } from "react";

export default function OrderFormModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    address: "",
    lastname: "",
    firstname: "",
    age: "",
    phone: "",
    emergencyPhone: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const first = dialogRef.current?.querySelector("input, textarea, button");
      first?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 transform transition-all duration-300 ease-out scale-100 animate-fade-in overflow-y-auto max-h-[90vh]"
        style={{ backdropFilter: "saturate(120%) blur(6px)" }}
      >
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Захиалгын мэдээлэл
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-300">
              Бүх * тэмдэгтэй талбарууд заавал бөглөнө үү.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="-mr-1 sm:-mr-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600 dark:text-gray-300"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
              Хаяг (дүүрэг, хороо, байр, орц, тоот, тайлбар) *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows={2}
              placeholder="Жишээ: БЗД, 13-р хороо, Наран апартмент, 3-р орц, 45 тоот"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-slate-700 px-2 sm:px-3 py-1.5 sm:py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
              Овог *
            </label>
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
              placeholder="Бат"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-slate-700 px-2 sm:px-3 py-1.5 sm:py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
              Нэр *
            </label>
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
              placeholder="Баяр"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-slate-700 px-2 sm:px-3 py-1.5 sm:py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
              Нас
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              min={0}
              placeholder="30"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-slate-700 px-2 sm:px-3 py-1.5 sm:py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
              Утасны дугаар *
            </label>
            <input
              type="number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="88887777"
              pattern="\\d{8,15}"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-slate-700 px-2 sm:px-3 py-1.5 sm:py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <p className="mt-1 text-[10px] sm:text-xs text-gray-400">
              8-15 оронтой цифр ашиглана үү.
            </p>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
              Яаралтай үед холбогдох дугаар *
            </label>
            <input
              type="number"
              name="emergencyPhone"
              value={form.emergencyPhone}
              onChange={handleChange}
              required
              placeholder="99998888"
              pattern="\\d{8,15}"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-slate-700 px-2 sm:px-3 py-1.5 sm:py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
              Имэйл *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="example@mail.com"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-slate-700 px-2 sm:px-3 py-1.5 sm:py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-2 sm:gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 shadow-sm"
              disabled={submitting}
            >
              Болих
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 shadow-md disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? "Илгээж байна..." : "Илгээх"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 220ms ease-out both;
        }
      `}</style>
    </div>
  );
}
