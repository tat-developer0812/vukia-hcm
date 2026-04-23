"use client";
import { useState } from "react";
import { Send, Phone } from "lucide-react";
import type { Car } from "@/lib/data";
import Toast from "./Toast";
import { trackEvent } from "@/lib/analytics";

interface QuoteFormProps {
  cars: Car[];
  defaultCar?: string;
  compact?: boolean;
  page?: string;
  onSuccess?: () => void;
}

export default function QuoteForm({
  cars,
  defaultCar = "",
  compact = false,
  page = "unknown",
  onSuccess,
}: QuoteFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    car: defaultCar,
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, page }),
      });
    } catch {
      // Silent fail — toast still shows so UX is not broken
    }

    trackEvent("quote_form_submit", { car: form.car || "none", page });
    setToast(true);
    setForm({ name: "", phone: "", email: "", car: defaultCar, note: "" });
    setLoading(false);

    if (onSuccess) {
      setTimeout(onSuccess, 500);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message="Đã gửi thành công! Tư vấn viên Vũ sẽ liên hệ bạn sớm nhất."
          onClose={() => setToast(false)}
        />
      )}
      <div className={compact ? "" : "bg-white rounded-2xl shadow-xl p-6 border border-gray-100"}>
        {!compact && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#05141F]">Nhận báo giá ưu đãi</h3>
            <div className="w-10 h-0.5 bg-[#BB162B] mt-2" />
            <p className="text-sm text-gray-500 mt-2">
              Để lại thông tin, tư vấn viên sẽ liên hệ ngay!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="quote-name" className="sr-only">Họ và tên</label>
            <input
              id="quote-name"
              type="text"
              placeholder="Họ và tên *"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <div>
            <label htmlFor="quote-phone" className="sr-only">Số điện thoại</label>
            <input
              id="quote-phone"
              type="tel"
              placeholder="Số điện thoại *"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <div>
            <label htmlFor="quote-email" className="sr-only">Email</label>
            <input
              id="quote-email"
              type="email"
              placeholder="Email (tùy chọn)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <div>
            <label htmlFor="quote-car" className="sr-only">Dòng xe</label>
            <select
              id="quote-car"
              value={form.car}
              onChange={(e) => setForm({ ...form, car: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition bg-white"
            >
              <option value="">-- Chọn dòng xe --</option>
              {cars.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {!compact && (
            <div>
              <label htmlFor="quote-note" className="sr-only">Ghi chú</label>
              <textarea
                id="quote-note"
                placeholder="Ghi chú thêm (tùy chọn)"
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition resize-none"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#BB162B] hover:bg-[#9a1022] disabled:opacity-60 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <Send size={16} />
            {loading ? "Đang gửi..." : "Nhận báo giá"}
          </button>
          <a
            href="tel:0931456204"
            onClick={() => trackEvent("phone_click", { location: "quote_form" })}
            className="w-full border border-[#05141F] text-[#05141F] hover:bg-[#05141F] hover:text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <Phone size={16} />
            Gọi: 0931.456.204
          </a>
        </form>
      </div>
    </>
  );
}
