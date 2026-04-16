"use client";
import { useState } from "react";
import { Send, Phone } from "lucide-react";
import { cars } from "@/lib/data";

interface QuoteFormProps {
  defaultCar?: string;
  compact?: boolean;
}

export default function QuoteForm({ defaultCar = "", compact = false }: QuoteFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", car: defaultCar, note: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", car: defaultCar, note: "" });
  };

  return (
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

      {sent ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-semibold text-green-700">Đã gửi thành công!</p>
          <p className="text-sm text-gray-500 mt-1">Tư vấn viên sẽ liên hệ bạn sớm nhất.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Họ và tên *"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition"
          />
          <input
            type="tel"
            placeholder="Số điện thoại *"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition"
          />
          <select
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
          {!compact && (
            <textarea
              placeholder="Ghi chú thêm (tùy chọn)"
              rows={3}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition resize-none"
            />
          )}
          <button
            type="submit"
            className="w-full bg-[#BB162B] hover:bg-[#9a1022] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <Send size={16} />
            Nhận báo giá
          </button>
          <a
            href="tel:0962216351"
            className="w-full border border-[#05141F] text-[#05141F] hover:bg-[#05141F] hover:text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <Phone size={16} />
            Gọi: 096.2216.351
          </a>
        </form>
      )}
    </div>
  );
}
