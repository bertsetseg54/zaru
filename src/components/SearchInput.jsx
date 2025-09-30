// components/SearchInput.jsx
import { useState } from "react";

export default function SearchInput({
  placeholder = "Бүтээгдэхүүн, үйлчилгээ хайх...",
  onSearch,
}) {
  const [q, setQ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch(q); // Search хий
  }

  function handleClear() {
    setQ(""); // Input хоослох
    if (onSearch) onSearch(""); // ProductList-д searchTerm хоослох, бүх бүтээгдэхүүн харагдах
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <label htmlFor="site-search" className="sr-only">
        Хайх
      </label>
      <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-200">
        <svg
          className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>

        <input
          id="site-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          aria-label="Хайх"
        />

        <button
          type="submit"
          className="ml-3 px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
        >
          Хайх
        </button>
      </div>
    </form>
  );
}
