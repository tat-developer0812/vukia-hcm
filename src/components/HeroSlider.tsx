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
    <section className="relative h-[520px] md:h-[600px] lg:h-[680px] overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-all duration-700`} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Text */}
          <div className="text-white order-2 lg:order-1">
            <span className="inline-block bg-[#BB162B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              {slide.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-2">
              {slide.car.name}
            </h1>
            <p className="text-xl text-gray-300 mb-2">{slide.tagline}</p>
            <p className="text-sm text-gray-400 mb-6">{slide.car.description}</p>

            <div className="mb-6">
              <p className="text-sm text-gray-400">Giá từ</p>
              <p className="text-3xl font-black text-[#BB162B]">
                {slide.car.startPrice}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Trả trước từ: <span className="text-white font-semibold">{slide.car.downPayment}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${slide.car.slug}`}
                className="bg-[#BB162B] hover:bg-[#9a1022] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
              >
                Xem chi tiết
              </Link>
              <a
                href="tel:0962216351"
                className="flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#05141F] px-6 py-3 rounded-full font-bold text-sm transition-colors"
              >
                <Phone size={14} />
                Báo giá ngay
              </a>
            </div>
          </div>

          {/* Car image */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-lg h-64 md:h-80">
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
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-[#BB162B] w-6" : "bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
