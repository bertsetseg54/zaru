"use client";

import { useSags } from "../context/SagsContext";
import OrderFormModal from "./OrderFormModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrders } from "../context/OrderContext";

export default function Cart() {
  const { sags, clearSags, removeFromSags, updateQuantity } = useSags();
  const { addOrder } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitOrder = (formData) => {
    addOrder(sags);
    clearSags();
    alert("Захиалга амжилттай илгээгдлээ! 🎉");
    setIsModalOpen(false);
    router.push("/orders");
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 py-4">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
        🛒 Миний сагс
      </h2>

      {/* Дээд талын товчнууд subtle, inline */}
      {sags.length > 0 && (
        <div className="flex flex-wrap justify-end gap-2 mb-4 sm:mb-6">
          <button
            onClick={handleOpenModal}
            className="px-4 sm:px-5 py-2 rounded-lg bg-gray-800 dark:bg-gray-600 text-white text-sm sm:text-base font-medium hover:bg-gray-700 dark:hover:bg-gray-500 shadow-sm transition"
          >
            💳 Худалдаж авах
          </button>
          <button
            onClick={clearSags}
            className="px-4 sm:px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            Сагсыг хоослох
          </button>
        </div>
      )}

      {sags.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">Сагс хоосон байна</p>
      )}

      <div className="space-y-4">
        {sags.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {/* Том зураг */}
            <div className="w-full sm:w-40 h-40 bg-gray-200 dark:bg-slate-700 flex-shrink-0 rounded-lg overflow-hidden">
              {item.zurag ? (
                <img
                  src={item.zurag}
                  alt={item.ner}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Зураг байхгүй
                </div>
              )}
            </div>

            {/* Мэдээлэл */}
            <div className="flex-1 flex flex-col justify-between h-full w-full">
              <div>
                <h3 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100">
                  {item.ner}
                </h3>
                <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mt-1">
                  Үнэ: {item.une}₮ | Нийт: {item.une * item.quantity}₮
                </p>
              </div>

              {/* Quantity + Устгах button */}
              <div className="flex flex-row items-center gap-3 mt-4 w-full">
                {/* Quantity controls */}
                <div className="flex items-center gap-3">
                  <button
                    className="px-4 py-2 sm:px-5 sm:py-3 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition shadow-md text-gray-800 dark:text-gray-100 font-semibold text-lg"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>

                  <span className="px-4 py-2 sm:px-5 sm:py-3 bg-gray-50 dark:bg-slate-700 rounded-lg text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 shadow-inner">
                    {item.quantity}ш
                  </span>

                  <button
                    className="px-4 py-2 sm:px-5 sm:py-3 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition shadow-md text-gray-800 dark:text-gray-100 font-semibold text-lg"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Устгах товч */}
                <button
                  className="ml-auto px-3 py-2 rounded-md bg-red-100 dark:bg-red-700 hover:bg-red-200 dark:hover:bg-red-600 transition text-red-700 dark:text-red-100 text-sm sm:text-base"
                  onClick={() => removeFromSags(item.id)}
                >
                  устгах
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OrderFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitOrder}
      />
    </div>
  );
}
