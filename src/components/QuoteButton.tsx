"use client";
import { Phone } from "lucide-react";
import { useModal } from "@/context/ModalContext";

interface QuoteButtonProps {
  carSlug?: string;
  className?: string;
  label?: string;
}

export default function QuoteButton({ carSlug, className, label = "Báo giá ngay" }: QuoteButtonProps) {
  const { openModal } = useModal();
  return (
    <button
      onClick={() => openModal(carSlug)}
      className={className ?? "bg-[#BB162B] hover:bg-[#9a1022] text-white px-4 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-colors"}
    >
      <Phone size={14} /> {label}
    </button>
  );
}
