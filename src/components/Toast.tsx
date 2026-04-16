"use client";
import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[#05141F] text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-slide-up max-w-sm w-[calc(100vw-2rem)]">
      <CheckCircle size={20} className="text-green-400 shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="shrink-0 text-gray-400 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}
