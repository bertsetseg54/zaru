"use client";

import { useOrg } from "@/context/OrgContext";

export default function OrgProfile() {
  const { org } = useOrg();

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        {org.image ? (
          <img
            src={org.image}
            alt={org.name}
            className="w-32 h-32 object-cover rounded-lg border border-gray-200 flex-shrink-0"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg border text-gray-400 flex-shrink-0">
            No Image
          </div>
        )}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {org.name || "Нэр оруулаагүй"}
          </h1>
          <p className="text-md sm:text-lg text-gray-600 mt-1">
            {org.type || "Төрөл оруулаагүй"}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div className="p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-xs sm:text-sm text-gray-500 uppercase">
            📍 Хаяг
          </h3>
          <p className="mt-1 sm:mt-2 text-gray-800 font-medium text-sm sm:text-base">
            {org.address || "Хаяг оруулаагүй"}
          </p>
        </div>
        <div className="p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-xs sm:text-sm text-gray-500 uppercase">
            📞 Утас
          </h3>
          <p className="mt-1 sm:mt-2 text-gray-800 font-medium text-sm sm:text-base">
            {org.phone || "Утас оруулаагүй"}
          </p>
        </div>
        <div className="p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-xs sm:text-sm text-gray-500 uppercase">
            📧 Имэйл
          </h3>
          <p className="mt-1 sm:mt-2 text-gray-800 font-medium text-sm sm:text-base">
            {org.email || "Имэйл оруулаагүй"}
          </p>
        </div>
        <div className="p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-xs sm:text-sm text-gray-500 uppercase">
            🌐 Вэбсайт
          </h3>
          {org.website ? (
            <a
              href={org.website}
              target="_blank"
              className="mt-1 sm:mt-2 inline-block text-blue-600 hover:underline font-medium text-sm sm:text-base"
            >
              {org.website}
            </a>
          ) : (
            <p className="mt-1 sm:mt-2 text-gray-800 font-medium text-sm sm:text-base">
              Вэбсайт оруулаагүй
            </p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="mt-8 sm:mt-12">
        <h3 className="text-gray-800 text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          🏷 Үйлдвэрлэдэг бүтээгдэхүүн
        </h3>
        {org.products && org.products.length > 0 ? (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {org.products.map((p, i) => (
              <span
                key={i}
                className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-xs sm:text-sm"
              >
                {p}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm sm:text-base">
            Бүтээгдэхүүний мэдээлэл оруулаагүй
          </p>
        )}
      </div>
    </div>
  );
}
