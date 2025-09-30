"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [noWebsite, setNoWebsite] = useState(false);
  const [address, setAddress] = useState("");
  const [type, setType] = useState("huns");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      if (password !== confirmPassword) {
        alert("Нууц үг таарахгүй байна!");
        return;
      }

      // ШИНЭ хэрэглэгчийн object энд үүснэ
      const newUser = {
        name,
        email,
        phone,
        website: noWebsite ? null : website,
        address,
        type,
        image,
        products: [],
      };

      console.log("📌 Бүртгэсэн хэрэглэгч:", newUser);
      setUser(newUser); // Context-д хадгална
      router.push("/dashboard");
    } else {
      if (email === "boldoo@gmail.com" && password === "qwerty") {
        setUser({ email });
        router.push("/dashboard");
      } else {
        alert("Имэйл эсвэл нууц үг буруу!");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Үйлдвэрлэгчээр бүртгүүлэх" : "Үйлдвэрлэгчээр нэвтрэх"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              {/* Нэр */}
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Нэр</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Утас */}
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Утас</label>
                <input
                  type="tel"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Вэбсайт */}
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Вэбсайт</label>
                <input
                  type="url"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  readOnly={noWebsite}
                  required={!noWebsite}
                  placeholder={noWebsite ? "Байхгүй" : "https://example.com"}
                />
                <div className="mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={noWebsite}
                      onChange={(e) => setNoWebsite(e.target.checked)}
                    />
                    <span>Вэбсайт байхгүй</span>
                  </label>
                </div>
              </div>

              {/* Төрөл */}
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Төрөл</label>
                <select
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="huns">Хүнс</option>
                  <option value="garUrlal">Гар урлал</option>
                  <option value="tsagaanIdee">Цагаан идээ</option>
                  <option value="amitan">Амьтан</option>
                  <option value="busad">Бусад</option>
                </select>
              </div>

              {/* Байгууллагын зураг */}
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">
                  Үйлдвэрлэгчийн зураг
                </label>
                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
                    Зураг сонгох
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                  </label>
                  {image && (
                    <span className="text-sm text-gray-600 truncate max-w-[150px]">
                      {image.name}
                    </span>
                  )}
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 w-full h-40 object-cover rounded-lg border"
                  />
                )}
              </div>

              {/* Хаяг */}
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Хаяг</label>
                <textarea
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="2"
                  required
                />
              </div>
            </>
          )}

          {/* Имэйл */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">И-мэйл</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Нууц үг */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Нууц үг</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Нууц үг давтах */}
          {isRegister && (
            <div className="mb-6">
              <label className="block mb-1 text-gray-700">Нууц үг давтах</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isRegister ? "Бүртгүүлэх" : "Нэвтрэх"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {isRegister ? (
            <p>
              Аль хэдийн бүртгэлтэй юу?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-blue-500 hover:underline"
              >
                Нэвтрэх
              </button>
            </p>
          ) : (
            <p>
              Бүртгэлгүй юу?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-blue-500 hover:underline"
              >
                Бүртгүүлэх
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
