"use client";

import { useState } from "react";

export default function ProductForm({
  form = {}, // ← default утга
  setForm = () => {},
  onSubmit = () => {},
  onClose = () => {},
  saving = false,
}) {
  const [previewMain, setPreviewMain] = useState(form.image || "");
  const [ingredientInput, setIngredientInput] = useState("");
  const [previewProcessImages, setPreviewProcessImages] = useState(
    Array.isArray(form.processImages) ? form.processImages : []
  );

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewMain(reader.result);
        setForm((s) => ({ ...s, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === "processImages" && files) {
      const readers = Array.from(files).map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      );

      Promise.all(readers).then((images) => {
        setPreviewProcessImages((prev) => [...prev, ...images]);
        setForm((s) => ({
          ...s,
          processImages: [...(s.processImages || []), ...images],
        }));
      });
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  function handleIngredientKeyDown(e) {
    if (e.key === "Enter" && ingredientInput.trim()) {
      e.preventDefault();
      setForm((s) => ({
        ...s,
        ingredients: [...(s.ingredients || []), ingredientInput.trim()],
      }));
      setIngredientInput("");
    }
  }

  function removeIngredient(index) {
    setForm((s) => ({
      ...s,
      ingredients: s.ingredients.filter((_, i) => i !== index),
    }));
  }

  function removeProcessImage(index) {
    setPreviewProcessImages((prev) => prev.filter((_, i) => i !== index));
    setForm((s) => ({
      ...s,
      processImages: s.processImages.filter((_, i) => i !== index),
    }));
  }

  const inputStyle =
    "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 placeholder-gray-400 text-sm transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => !saving && onClose()}
      />

      {/* Card modal */}
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 ">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Бүтээгдэхүүн нэмэх
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={onSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Гол зураг */}
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-1">Зураг *</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className={inputStyle + " cursor-pointer"}
              />
              {previewMain && (
                <img
                  src={previewMain}
                  alt="Preview"
                  className="mt-2 h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-lg border border-gray-200"
                />
              )}
            </label>

            {/* Нэр */}
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-1">Нэр *</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Бүтээгдэхүүний нэр"
                className={inputStyle}
                required
              />
            </label>

            {/* Үнэ */}
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-1">Үнэ *</span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="₮"
                className={inputStyle}
                required
              />
            </label>

            {/* Жин / Хэмжээ */}
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-1">
                Жин / Хэмжээ
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="weightValue"
                  value={form.weightValue || ""}
                  onChange={handleChange}
                  placeholder="Тоон утга"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 placeholder-gray-400 text-sm"
                />
                <select
                  name="weightUnit"
                  value={form.weightUnit || ""}
                  onChange={handleChange}
                  className="w-24 sm:w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 text-sm"
                >
                  <option value="">Нэгж</option>
                  <option value="kg">кг</option>
                  <option value="g">г</option>
                  <option value="l">литр</option>
                  <option value="ml">мл</option>
                  <option value="pcs">ширхэг</option>
                </select>
              </div>
            </label>
          </div>

          {/* Дэлгэрэнгүй */}
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1">Дэлгэрэнгүй</span>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Бүтээгдэхүүний талаарх тайлбар"
              className={inputStyle + " h-20 resize-none"}
            />
          </label>

          {/* Орц / Найрлага */}
          <div>
            <span className="text-gray-700 font-medium mb-2 block">
              Орц / Найрлага
            </span>
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={handleIngredientKeyDown}
              placeholder="Орц бичээд Enter дарна уу"
              className={inputStyle + " w-full"}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {(form.ingredients || []).map((ing, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 border border-indigo-200"
                >
                  {ing}
                  <button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Үйл явц */}
          <div>
            <span className="text-gray-700 font-medium mb-2 block">
              Үйл явц / Process
            </span>
            <input
              type="text"
              name="process"
              value={form.process}
              onChange={handleChange}
              placeholder="Үйл явцын товч тайлбар"
              className={inputStyle + " w-full"}
            />
          </div>

          {/* Үйл явцын олон зураг */}
          <div>
            <span className="text-gray-700 font-medium mb-2 block">
              Үйл явцын зураг (олон зураг)
            </span>
            <input
              type="file"
              name="processImages"
              accept="image/*"
              multiple
              onChange={handleChange}
              className={inputStyle + " cursor-pointer w-full"}
            />
            <div className="mt-3 flex flex-wrap gap-3">
              {previewProcessImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt={`Process ${idx}`}
                    className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeProcessImage(idx)}
                    className="absolute -top-2 -right-2 text-red-600 bg-white rounded-full shadow p-1 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Болих
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              {saving ? "Хадгалж байна..." : "Нэмэх"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
