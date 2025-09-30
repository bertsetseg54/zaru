"use client";

import { useState } from "react";
import products from "../context/ProductContext";
import SearchInput from "./SearchInput";
import { useRouter } from "next/router";

function ProductCard({ product }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 flex flex-col cursor-pointer border border-gray-200"
    >
      {/* Image */}
      <div className="relative w-full h-36 sm:h-44 md:h-52 overflow-hidden rounded-t-xl">
        <img
          src={product.zurag}
          alt={product.ner}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md shadow">
          {product.torol}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-1">
          {product.ner}
        </h2>
        <p className="text-gray-900 font-bold text-xs sm:text-sm md:text-base mt-1">
          {new Intl.NumberFormat("en-US").format(product.une)}₮
        </p>
        <div className="mt-1">
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-medium">
            🏭 {product.uildverlegch}
          </span>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
          Жин/Хэмжээ: {product.jin_hemjee}
        </p>
      </div>
    </div>
  );
}

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState("Бүгд");
  const [activeManufacturer, setActiveManufacturer] = useState("Бүгд");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Бүгд",
    "Хүнс",
    "Гар урлал",
    "Цагаан идээ",
    "Амьтан",
    "Бусад",
  ];
  const manufacturers = [
    "Бүгд",
    ...Array.from(new Set(products.map((p) => p.uildverlegch))),
  ];

  let filteredProducts = [...products];

  if (searchTerm.trim() !== "") {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.ner.toLowerCase().includes(term) ||
        p.uildverlegch.toLowerCase().includes(term)
    );
  }

  if (activeCategory !== "Бүгд") {
    filteredProducts = filteredProducts.filter(
      (p) => p.torol === activeCategory
    );
  }

  if (activeManufacturer !== "Бүгд") {
    filteredProducts = filteredProducts.filter(
      (p) => p.uildverlegch === activeManufacturer
    );
  }

  return (
    <div className="p-2 sm:p-4 max-w-7xl mx-auto">
      <div className="flex justify-center mb-2">
        <SearchInput
          placeholder="Бүтээгдэхүүн хайх..."
          onSearch={setSearchTerm}
          className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />
      </div>
      {searchTerm.trim() === "" && (
        <div className="flex justify-center overflow-x-auto scrollbar-hide gap-2 sm:gap-3 p-3 sm:p-4 mb-4 bg-gray-50 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      {searchTerm.trim() !== "" && (
        <div className="flex w-full justify-center overflow-x-auto scrollbar-hide gap-2 sm:gap-3 p-3 sm:p-4 mb-4 bg-gray-50 rounded-lg">
          {manufacturers
            .filter((manu) =>
              products.some(
                (p) =>
                  p.uildverlegch === manu &&
                  p.ner.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
            .map((manu) => (
              <button
                key={manu}
                onClick={() => setActiveManufacturer(manu)}
                className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  activeManufacturer === manu
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {manu}
              </button>
            ))}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, idx) => (
            <ProductCard
              key={idx}
              product={p}
              className="transition-transform duration-200 hover:scale-105 shadow-md hover:shadow-xl rounded-xl"
            />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full py-12">
            Бүтээгдэхүүн олдсонгүй
          </p>
        )}
      </div>
    </div>
  );
}
