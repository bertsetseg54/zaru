"use client";
import { useState } from "react";

export default function ProductCard2({ product, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    image: "",
    name: "",
    price: "",
    weightValue: "",
    weightUnit: "",
    bio: "",
    ingredients: [],
    process: "",
    processImages: [],
  });

  return (
    <div className="p-4 flex justify-center w-full sm:w-auto">
      <div className="relative flex flex-col items-start gap-3 p-5 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all w-full sm:w-72">
        {/* Зураг */}
        {product.image && (
          <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Гол мэдээлэл */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">
          {product.name}
        </h3>
        <div className="text-sm sm:text-base font-medium text-gray-700">
          Жин: {product.weightValue} {product.weightUnit}
        </div>
        <div className="text-lg sm:text-xl font-bold text-green-600">
          {product.price ? `${product.price.toLocaleString()}₮` : ""}
        </div>

        {/* Дэлгэрэнгүй харах товч */}
        <button
          onClick={() => setOpen(true)}
          className="mt-2 px-3 py-1.5 text-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition w-full"
        >
          Дэлгэрэнгүй харах
        </button>

        {/* Edit/Delete */}
        <div className="mt-4 flex justify-between gap-3 w-full">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1 text-sm px-4 py-2 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:shadow-sm transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 flex items-center justify-center gap-1 text-sm px-4 py-2 rounded-xl border border-red-300 text-red-600 bg-white hover:bg-red-50 hover:shadow-sm transition"
          >
            🗑 Delete
          </button>
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg sm:max-w-xl md:max-w-2xl w-full p-5 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh] animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {product.name}
              </h2>

              {/* Price & Weight */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 text-gray-800">
                {product.price && (
                  <span className="text-lg sm:text-xl font-semibold text-green-600">
                    {product.price.toLocaleString()}₮
                  </span>
                )}
                {product.weightValue && (
                  <span className="text-sm sm:text-base">
                    Жин: {product.weightValue} {product.weightUnit}
                  </span>
                )}
              </div>

              {/* Main Image */}
              {product.image && (
                <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-gray-700 mb-4">{product.description}</p>
              )}

              {/* Bio */}
              {product.bio && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Дэлгэрэнгүй
                  </h4>
                  <p className="text-gray-600">{product.bio}</p>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Орц найрлага
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-2">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              {product.process && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Үйл явц
                  </h4>
                  <p className="text-gray-600 mb-2">{product.process}</p>
                  {product.processImages &&
                    Array.isArray(product.processImages) &&
                    product.processImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {product.processImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="w-full aspect-[4/3] overflow-hidden rounded-xl"
                          >
                            <img
                              src={img}
                              alt={`Process ${idx}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-50 transition"
                >
                  Хаах
                </button>
              </div>
            </div>
          </div>
        )}
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
