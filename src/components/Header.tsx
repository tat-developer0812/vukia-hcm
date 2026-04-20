"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import type { Car } from "@/lib/data";
import Logo from "@/components/Logo";
import { useModal } from "@/context/ModalContext";

export default function Header({ cars }: { cars: Car[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [carMenuOpen, setCarMenuOpen] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-[#05141F] text-white text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:block text-xs tracking-wide">
            ĐẠI LÝ KIA CHÍNH HÃNG TẠI TP.HỒ CHÍ MINH
          </span>
          <div className="flex items-center gap-4 text-xs w-full md:w-auto justify-center md:justify-end">
            <a
              href="tel:0931456204"
              className="flex items-center gap-1.5 hover:text-[#BB162B] transition-colors"
            >
              <Phone size={13} />
              <span className="font-semibold">0931.456.204</span>
            </a>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300 hidden sm:block">7:30 – 21:00 · Thứ 2 – CN</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center shrink-0">
          <Logo variant="dark" size="md" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#05141F]">
          <Link href="/" className="hover:text-[#BB162B] transition-colors py-2">
            Trang chủ
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setCarMenuOpen(true)}
            onMouseLeave={() => setCarMenuOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#BB162B] transition-colors py-2">
              Dòng xe KIA <ChevronDown size={14} />
            </button>
            {carMenuOpen && (
              <div className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-[#BB162B] rounded-b-lg w-56 py-2 z-50">
                {cars.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="block px-4 py-2.5 text-sm hover:bg-red-50 hover:text-[#BB162B] transition-colors"
                  >
                    <span className="font-semibold">{c.shortName}</span>
                    <span className="text-xs text-gray-500 block">Từ {c.startPrice}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/dang-ky-lai-thu-xe-kia" className="hover:text-[#BB162B] transition-colors py-2">
            Đăng ký lái thử
          </Link>
          <Link href="/thu-tuc-tra-gop-xe-kia" className="hover:text-[#BB162B] transition-colors py-2">
            Trả góp
          </Link>
          <Link href="/lien-he-kia-ho-chi-minh" className="hover:text-[#BB162B] transition-colors py-2">
            Liên hệ
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => openModal(undefined, "header")}
            className="flex items-center gap-2 bg-[#BB162B] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#9a1022] transition-colors"
          >
            <Phone size={14} />
            Báo giá ngay
          </button>
        </div>

        <button
          className="lg:hidden p-2 text-[#05141F]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t px-4 pb-4 shadow-lg">
          <Link href="/" className="block py-3 border-b text-sm font-medium" onClick={() => setOpen(false)}>
            Trang chủ
          </Link>
          <div className="py-3 border-b">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Dòng xe KIA</p>
            <div className="grid grid-cols-2 gap-1">
              {cars.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="py-2 px-2 text-sm hover:text-[#BB162B] rounded"
                  onClick={() => setOpen(false)}
                >
                  {c.shortName}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/dang-ky-lai-thu-xe-kia" className="block py-3 border-b text-sm" onClick={() => setOpen(false)}>
            Đăng ký lái thử
          </Link>
          <Link href="/thu-tuc-tra-gop-xe-kia" className="block py-3 border-b text-sm" onClick={() => setOpen(false)}>
            Trả góp
          </Link>
          <Link href="/lien-he-kia-ho-chi-minh" className="block py-3 text-sm" onClick={() => setOpen(false)}>
            Liên hệ
          </Link>
          <button
            onClick={() => { setOpen(false); openModal(undefined, "header"); }}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[#BB162B] text-white px-4 py-3 rounded-full text-sm font-semibold"
          >
            <Phone size={14} />
            Báo giá ngay
          </button>
        </div>
      )}
    </header>
  );
}
