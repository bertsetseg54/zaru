import { useState } from "react";
import { useRouter } from "next/router";
import products from "../../context/ProductContext";
import { useSags } from "../../context/SagsContext";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [showFull, setShowFull] = useState(false);
  const { addToSags } = useSags();

  if (!id) return <p>Loading...</p>;

  const product = products.find((p) => p.id.toString() === id);
  if (!product) return <p>Бүтээгдэхүүн олдсонгүй</p>;

  const previewText = product.delgerengui.slice(0, 120) + "...";

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-[#FAF5F0]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Зураг */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={product.zurag}
            alt={product.ner}
            className="w-full max-h-[500px] object-contain rounded-xl border border-gray-200 shadow-md"
          />
        </div>

        {/* Мэдээлэл */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Гарчиг & Үнэ */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
            {product.ner}
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {new Intl.NumberFormat("en-US").format(product.une)} ₮
          </p>

          {/* Үндсэн мэдээлэл */}
          <div className="bg-gray-50 p-4 rounded-lg text-gray-700 space-y-1 border border-gray-100">
            <p>
              <span className="font-medium text-gray-900">Жин/Хэмжээ:</span>{" "}
              {product.jin_hemjee}
            </p>
            <p>
              <span className="font-medium text-gray-900">Төрөл:</span>{" "}
              {product.torol}
            </p>
            <p>
              <span className="font-medium text-gray-900">Үйлдвэрлэгч:</span>{" "}
              {product.uildverlegch}
            </p>
          </div>

          {/* Орц найрлага */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Орц найрлага
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.orts_nairlaga.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Дэлгэрэнгүй */}
          <div className="bg-gray-50 p-4 rounded-lg text-gray-700 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              📌 Дэлгэрэнгүй мэдээлэл
            </h3>
            <p className="leading-relaxed">
              {showFull ? product.delgerengui : previewText}
            </p>
            <button
              className="mt-1 text-gray-600 font-medium hover:text-gray-900 hover:underline transition-colors"
              onClick={() => setShowFull(!showFull)}
            >
              {showFull ? "See less" : "See more"}
            </button>
          </div>

          {/* Тоо ширхэг */}
          <div className="flex items-center gap-3">
            <button
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-semibold rounded transition"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-4 text-lg font-medium">{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-semibold rounded transition"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          {/* Сагсанд нэмэх */}
          <button
            onClick={() => addToSags(product, quantity)}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg text-lg font-semibold mt-3 transition-colors"
          >
            🛒 Сагсанд нэмэх
          </button>
        </div>
      </div>
    </div>
  );
}
