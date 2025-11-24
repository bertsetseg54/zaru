"use client";
import { useState, useEffect, useRef } from "react";

export default function ClickCarousel() {
  const images = ["/reklam1.png", "/reklam2.png", "/reklam3.png"];
  const imagesExtended = [...images, ...images];

  const [index, setIndex] = useState(0);
  const [smooth, setSmooth] = useState(true);
  const autoSlideRef = useRef(null);

  // Auto slide
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  };

  // Infinite loop
  useEffect(() => {
    if (index === images.length) {
      setTimeout(() => {
        setSmooth(false);
        setIndex(0);
        setTimeout(() => setSmooth(true), 60);
      }, 500);
    }

    if (index < 0) {
      setSmooth(false);
      setIndex(images.length - 1);
      setTimeout(() => setSmooth(true), 60);
    }
  }, [index, images.length]);

  const nextSlide = () => setIndex((prev) => prev + 1);
  const prevSlide = () => setIndex((prev) => prev - 1);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className={`flex ${smooth ? "transition-transform duration-500" : ""}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {imagesExtended.map((src, i) => (
          <div key={i} className="w-full flex-shrink-0">
            <img
              src={src}
              className="w-full h-auto object-cover aspect-2138/684"
              alt=""
            />
          </div>
        ))}
      </div>
      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="
    absolute top-1/2 -translate-y-1/2
    flex items-center justify-center
    rounded-full border border-white/30 text-white backdrop-blur-md
    transition-all duration-200

    /* Position */
    left-2       /* mobile */
    sm:left-3    /* small tablets */
    md:left-5    /* desktop */

    /* Size */
    w-7 h-7 text-sm       /* mobile */
    sm:w-8 sm:h-8 sm:text-base
    md:w-10 md:h-10 md:text-lg

    hover:bg-white/20
  "
      >
        ‹
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="
    absolute top-1/2 -translate-y-1/2
    flex items-center justify-center
    rounded-full border border-white/30 text-white backdrop-blur-md
    transition-all duration-200

    /* Position */
    right-2       /* mobile */
    sm:right-3
    md:right-5

    /* Size */
    w-7 h-7 text-sm
    sm:w-8 sm:h-8 sm:text-base
    md:w-10 md:h-10 md:text-lg

    hover:bg-white/20
  "
      >
        ›
      </button>
    </div>
  );
}
