"use client";

import { useState } from "react";

const initialOrders = [
  {
    id: 1,
    customer: "Батаа",
    product: "Сүү",
    amount: 5000,
    weight: "1л",
    location: "Хөвсгөл, Мөрөн 10-11-3",
    phone: "99112233",
    status: "pending",
    date: "2025-09-01",
  },
  {
    id: 2,
    customer: "Сараа",
    product: "Аарц",
    amount: 10000,
    weight: "500гр",
    location: "Хөвсгөл, Мөрөн 14-9-1",
    phone: "88117766",
    status: "confirmed",
    date: "2025-09-02",
  },
  {
    id: 3,
    customer: "Туяа",
    product: "Бяслаг",
    amount: 15000,
    weight: "1кг",
    location: "Хөвсгөл, Мөрөн 8-7-5",
    phone: "99001122",
    status: "unconfirmed",
    date: "2025-09-02",
  },
];

const statusStyles = {
  confirmed: "bg-green-100 text-green-800",
  unconfirmed: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

export default function OrderList() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("all");

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-800">Захиалгын жагсаалт</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">Бүгд</option>
          <option value="confirmed">Баталгаажсан</option>
          <option value="unconfirmed">Цуцлагдсан</option>
          <option value="pending">Хүлээгдэж буй</option>
        </select>
      </div>

      {/* Table view */}
      <div className="hidden sm:overflow-x-auto sm:rounded-2xl sm:border sm:border-gray-200 sm:block">
        <table className="min-w-full divide-y divide-gray-300 text-sm rounded-2xl overflow-hidden">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              {[
                "#",
                "Хэрэглэгч",
                "Бүтээгдэхүүн",
                "Жин/Хэмжээ",
                "Үнэ",
                "Байршил",
                "Утас",
                "Огноо",
                "Статус",
                "Төлөв",
              ].map((t, i) => (
                <th key={i} className="px-4 py-3 text-left font-medium">
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((o, i) => (
              <tr
                key={o.id}
                className="hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-700">
                  {o.customer}
                </td>
                <td className="px-4 py-3 text-gray-600">{o.product}</td>
                <td className="px-4 py-3 text-gray-600">{o.weight}</td>
                <td className="px-4 py-3 text-gray-800 font-semibold">
                  {o.amount.toLocaleString()}₮
                </td>
                <td className="px-4 py-3 text-gray-600">{o.location}</td>
                <td className="px-4 py-3 text-gray-600">{o.phone}</td>
                <td className="px-4 py-3 text-gray-500">{o.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[o.status]
                    } shadow-sm`}
                  >
                    {o.status === "confirmed"
                      ? "Баталгаажсан"
                      : o.status === "unconfirmed"
                      ? "Цуцлагдсан"
                      : "Хүлээгдэж буй"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  >
                    <option value="confirmed">Баталгаажуулах</option>
                    <option value="unconfirmed">Цуцлах</option>
                    <option value="pending">Хүлээгдэж буй</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="space-y-4 sm:hidden">
        {filteredOrders.map((o) => (
          <div
            key={o.id}
            className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white transition hover:shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{o.customer}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusStyles[o.status]
                } shadow`}
              >
                {o.status === "confirmed"
                  ? "Баталгаажсан"
                  : o.status === "unconfirmed"
                  ? "Цуцлагдсан"
                  : "Хүлээгдэж буй"}
              </span>
            </div>
            <div className="text-gray-600 text-sm space-y-1">
              <div>Бүтээгдэхүүн: {o.product}</div>
              <div>Жин/Хэмжээ: {o.weight}</div>
              <div>Үнэ: {o.amount.toLocaleString()}₮</div>
              <div>Байршил: {o.location}</div>
              <div>Утас: {o.phone}</div>
              <div>Огноо: {o.date}</div>
              <div className="mt-3">
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  <option value="confirmed">Баталгаажуулах</option>
                  <option value="unconfirmed">Цуцлах</option>
                  <option value="pending">Хүлээгдэж буй</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
