"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

const sampleSalesData = [
  { date: "2025-09-01", revenue: 120000, orders: 12 },
  { date: "2025-09-02", revenue: 200000, orders: 18 },
  { date: "2025-09-03", revenue: 150000, orders: 14 },
  { date: "2025-09-04", revenue: 300000, orders: 25 },
  { date: "2025-09-05", revenue: 100000, orders: 9 },
];

const sampleTopProducts = [
  { name: "Сүү", sales: 120 },
  { name: "Тараг", sales: 90 },
  { name: "Аарц", sales: 75 },
  { name: "Бяслаг", sales: 60 },
];

export default function SalesStats() {
  const [period, setPeriod] = useState("week");

  return (
    <div className="p-4 sm:p-2 lg:p-8 bg-gray-50 rounded-3xl shadow-lg space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Борлуулалтын статистик
        </h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded-lg px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="week">7 хоногоор</option>
          <option value="month">Сараар</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Орлого Card */}
        <div className="flex items-center p-4 bg-indigo-100 rounded-xl text-indigo-800">
          <div className="p-3 bg-indigo-200 rounded-full flex items-center justify-center">
            <FaMoneyBillWave className="w-5 h-5" />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium">Нийт орлого</p>
            <h3 className="text-lg font-semibold mt-1">
              {sampleSalesData
                .reduce((sum, d) => sum + d.revenue, 0)
                .toLocaleString()}{" "}
              ₮
            </h3>
          </div>
        </div>

        {/* Захиалга Card */}
        <div className="flex items-center p-4 bg-emerald-100 rounded-xl text-emerald-800">
          <div className="p-3 bg-emerald-200 rounded-full flex items-center justify-center">
            <FaShoppingCart className="w-5 h-5" />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium">Нийт захиалга</p>
            <h3 className="text-lg font-semibold mt-1">
              {sampleSalesData.reduce((sum, d) => sum + d.orders, 0)}
            </h3>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Орлого */}
        <div className=" bg-white rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Орлого</h3>
          <div className="h-72 sm:h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Захиалга */}
        <div className="p-5 bg-white rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Захиалга</h3>
          <div className="h-72 sm:h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Хамгийн их зарагдсан бүтээгдэхүүн */}
        <div className="p-5 bg-white rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Хамгийн их зарагдсан бүтээгдэхүүн
          </h3>
          <div className="h-72 sm:h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleTopProducts}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.95} />
                    <stop
                      offset="100%"
                      stopColor="#f97316"
                      stopOpacity={0.85}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#barGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
