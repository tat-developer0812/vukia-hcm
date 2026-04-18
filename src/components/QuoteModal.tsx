"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import type { Car } from "@/lib/data";
import QuoteForm from "./QuoteForm";

export default function QuoteModal({ cars }: { cars: Car[] }) {
  const { isOpen, defaultCar, closeModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-black text-lg">Báo giá & Tư vấn</h2>
            <p className="text-gray-400 text-xs mt-0.5">Phản hồi trong vòng 30 phút</p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <QuoteForm cars={cars} defaultCar={defaultCar} onSuccess={closeModal} />
        </div>
      </div>
    </div>
  );
}
