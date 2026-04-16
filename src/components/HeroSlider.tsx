"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { cars } from "@/lib/data";

const slides = [
  {
    car: cars[6], // Carnival
    tagline: "Đẳng cấp gia đình",
    badge: "MPV Hạng sang",
    bg: "from-[#05141F] to-[#1a3a5c]",
  },
  {
    car: cars[7], // Sorento
    tagline: "SUV mạnh mẽ, sang trọng",
    badge: "SUV 7 chỗ",
    bg: "from-[#1a0a0e] to-[#3d1520]",
  },
  {
    car: cars[1], // Seltos
    tagline: "Crossover năng động",
    badge: "Bán chạy số 1",
    bg: "from-[#0a1628] to-[#152d4a]",
  },
  {
    car: cars[4], // Sportage
    tagline: "Phong cách táo bạo",
    badge: "SUV Cao cấp",
    bg: "from-[#1a1000] to-[#3d2800]",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);
  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-[#05141F]">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-all duration-700`} />

      {/* Content — mobile: column stack, desktop: 2 col */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 items-center min-h-0">

          {/* Car image — top on mobile */}
          <div className="lg:order-2 w-full flex justify-center pt-6 lg:pt-0">
            <div className="relative w-full max-w-sm lg:max-w-lg h-48 sm:h-56 md:h-64 lg:h-80">
              <Image
                src={slide.car.heroImage}
                alt={slide.car.name}
                fill
                className="object-contain drop-shadow-2xl"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Text — below image on mobile */}
          <div className="lg:order-1 text-white py-6 lg:py-16 w-full">
            <span className="inline-block bg-[#BB162B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              {slide.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-1">
              {slide.car.name}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-1">{slide.tagline}</p>
            {/* Hide description on mobile to save space */}
            <p className="hidden sm:block text-sm text-gray-400 mb-4 line-clamp-2">
              {slide.car.description}
            </p>

            <div className="mb-4">
              <p className="text-xs text-gray-400">Giá từ</p>
              <p className="text-2xl sm:text-3xl font-black text-[#BB162B]">{slide.car.startPrice}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Trả trước: <span className="text-white font-semibold">{slide.car.downPayment}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pb-6 lg:pb-0">
              <Link
                href={`/${slide.car.slug}`}
                className="bg-[#BB162B] hover:bg-[#9a1022] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors"
              >
                Xem chi tiết
              </Link>
              <a
                href="tel:0962216351"
                className="flex items-center gap-1.5 border border-white/70 text-white hover:bg-white hover:text-[#05141F] px-5 py-2.5 rounded-full font-bold text-sm transition-colors"
              >
                <Phone size={13} />
                Báo giá
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#BB162B] w-6" : "bg-white/40 w-2"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
