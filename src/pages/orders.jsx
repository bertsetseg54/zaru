"use client";

import { useOrders } from "../context/OrderContext";

export default function OrdersPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
          📦 Миний захиалгууд
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Одоогоор захиалга алга байна.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-6">
        📦 Миний захиалгууд
      </h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-4 sm:p-6 shadow-sm bg-white dark:bg-slate-800 transition"
          >
            <h2 className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
              Захиалга #{order.id}
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm md:text-base">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.ner}</span>
                  <span>
                    {item.quantity}ш — {item.une * item.quantity}₮
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
