"use client";
import { createContext, useContext, useState } from "react";

const SagsContext = createContext();

export const SagsProvider = ({ children }) => {
  const [sags, setSags] = useState([]);

  // ✅ Сагсанд нэмэх
  const addToSags = (product, quantity = 1) => {
    setSags((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Хэрэв өмнө байсан бол тоог нь нэмнэ
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Хэрэв шинээр нэмэгдэж байгаа бол
      return [...prev, { ...product, quantity }];
    });
  };

  // ✅ Quantity-г өөрчлөх
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromSags(productId);
    } else {
      setSags((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // ✅ Бараа устгах
  const removeFromSags = (productId) => {
    setSags((prev) => prev.filter((item) => item.id !== productId));
  };

  // ✅ Сагс хоослох
  const clearSags = () => setSags([]);

  // ✅ Нийт дүн
  const totalPrice = sags.reduce(
    (sum, item) => sum + item.une * item.quantity,
    0
  );

  return (
    <SagsContext.Provider
      value={{
        sags,
        addToSags,
        updateQuantity,
        removeFromSags,
        clearSags,
        totalPrice,
      }}
    >
      {children}
    </SagsContext.Provider>
  );
};

export const useSags = () => {
  const context = useContext(SagsContext);
  if (!context) {
    throw new Error(
      "useSags нь заавал SagsProvider-ийн дотор ашиглагдах ёстой!"
    );
  }
  return context;
};
