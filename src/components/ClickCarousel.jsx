"use client";
import { useState, useRef, useEffect } from "react";

export default function ClickCarousel() {
  const images = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
  ];

  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setCurrentTranslate(-index * 100);
  }, [index]);

  const handleStart = (x) => {
    setIsDragging(true);
    setStartX(x);
  };

  const handleMove = (x) => {
    if (!isDragging) return;
    const diff = x - startX;
    setCurrentTranslate(
      -index * 100 + (diff / containerRef.current.offsetWidth) * 100
    );
  };

  const handleEnd = (x) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = x - startX;
    if (diff > 50) setIndex((prev) => Math.max(prev - 1, 0));
    else if (diff < -50)
      setIndex((prev) => Math.min(prev + 1, images.length - 1));
    setCurrentTranslate(-index * 100);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden cursor-grab select-none"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
      onMouseLeave={() => isDragging && handleEnd(startX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
    >
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(${currentTranslate}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0" // 🟢 зөвхөн дэлгэцийн өргөнд таарна
          >
            <img
              src={src}
              alt=""
              className="w-full h-auto object-cover" // 🟢 responsive + дэлгэц дүүргэнэ
            />
          </div>
        ))}
      </div>
    </div>
  );
}
