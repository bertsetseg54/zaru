"use client";

import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductDisplayCard from "./ProductDisplayCard";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    weight: "",
    bio: "",
    process: "",
    processImages: [],
    ingredients: [],
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("products_v2");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("products_v2", JSON.stringify(products));
  }, [products]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price)
      return alert("Нэр болон үнэ заавал оруулна уу");

    const newProduct = editingId
      ? { ...form, id: editingId }
      : { ...form, id: Date.now().toString() };

    setProducts((prev) =>
      editingId
        ? prev.map((p) => (p.id === editingId ? newProduct : p))
        : [newProduct, ...prev]
    );

    setShowForm(false);
    setEditingId(null);
    setForm({
      image: "",
      name: "",
      price: "",
      description: "",
      weight: "",
      bio: "",
      process: "",
      processImages: [],
      ingredients: [],
    });
  }

  function handleEdit(product) {
    setForm(product);
    setEditingId(product.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (!confirm("Энэ бүтээгдэхүүнийг устгах уу?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold">
          Бүтээгдэхүүн
        </h1>
        <button
          onClick={() => {
            setForm({
              image: "",
              name: "",
              price: "",
              description: "",
              weight: "",
              bio: "",
              process: "",
              processImage: "",
            });
            setEditingId(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 
             px-3 sm:px-4 py-2 text-sm sm:text-base 
             bg-indigo-600 text-white rounded-lg 
             hover:bg-indigo-700 transition w-full sm:w-auto"
        >
          {/* Icon нэммээр байвал энд тавьж болно */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>

          {/* Жижиг дэлгэц дээр харагдах */}
          <span className="block sm:hidden">Бүтээгдэхүүн</span>

          {/* Том дэлгэц дээр харагдах */}
          <span className="hidden sm:block">Бүтээгдэхүүн нэмэх</span>
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-gray-500 text-center py-6 sm:py-3 text-sm sm:text-base">
          Одоогоор бүтээгдэхүүн нэмэгдээгүй байна.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center sm:justify-items-start">
          {products.map((p) => (
            <ProductDisplayCard
              key={p.id}
              product={p}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-lg sm:max-w-2xl shadow-xl p-4 sm:p-6 lg:p-8 overflow-auto max-h-[90vh]">
            <ProductForm
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              onClose={() => setShowForm(false)}
              saving={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
}
