import { Phone, MapPin, Mail, Clock } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Liên hệ KIA Hồ Chí Minh – 0931.456.204",
  description: "Liên hệ đại lý KIA HCM để nhận tư vấn và báo giá xe tốt nhất. Địa chỉ: 38 Chế Lan Viên, Tân Phú, TP.HCM",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-2">Liên hệ KIA Hồ Chí Minh</h1>
        <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3 mb-4" />
        <p className="text-gray-300 text-sm">Tư vấn viên sẵn sàng hỗ trợ bạn mọi lúc</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="space-y-5">
          <h2 className="text-2xl font-black text-[#05141F]">Thông tin liên hệ</h2>
          {[
            {
              icon: <MapPin className="text-[#BB162B]" size={24} />,
              label: "Địa chỉ showroom",
              value: contact.address,
              note: contact.fullName,
            },
            {
              icon: <Phone className="text-[#BB162B]" size={24} />,
              label: `Hotline (${contact.consultant})`,
              value: contact.hotline,
              href: `tel:${contact.hotline.replace(/\./g, "")}`,
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 32 32" fill="#0068FF">
                  <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm6.5 19.5h-2.1l-4.9-6.3v6.3H13V10.5h2.1l4.9 6.3v-6.3H22.5v11z"/>
                </svg>
              ),
              label: "Zalo",
              value: contact.hotline,
              href: `https://zalo.me/${contact.hotline.replace(/\./g, "")}`,
            },
            {
              icon: <Mail className="text-[#BB162B]" size={24} />,
              label: "Email",
              value: contact.email,
              href: `mailto:${contact.email}`,
            },
            {
              icon: <Clock className="text-[#BB162B]" size={24} />,
              label: "Giờ làm việc",
              value: contact.hours,
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="mt-0.5 shrink-0">{item.icon}</div>
              <div>
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("https") ? "_blank" : undefined}
                    rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                    className="font-bold text-[#05141F] hover:text-[#BB162B] transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-bold text-[#05141F]">{item.value}</p>
                )}
                {item.note && <p className="text-xs text-gray-500 mt-1">{item.note}</p>}
              </div>
            </div>
          ))}

          {/* Google Map */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=38+Ch%E1%BA%BF+Lan+Vi%C3%AAn+T%C3%A2y+Th%E1%BA%A1nh+T%C3%A2n+Ph%C3%BA+TP+HCM&output=embed&z=16"
              width="100%" height="300" style={{border:0}} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ KIA Hồ Chí Minh"
            />
            <div className="px-5 py-3 flex items-center justify-between border-t border-gray-100">
              <p className="text-sm text-gray-500">{contact.address}</p>
              <a href="https://maps.google.com/maps?q=38+Ch%E1%BA%BF+Lan+Vi%C3%AAn+T%C3%A2y+Th%E1%BA%A1nh+T%C3%A2n+Ph%C3%BA+TP+HCM"
                target="_blank" rel="noopener noreferrer"
                className="shrink-0 ml-4 text-xs font-bold text-[#BB162B] hover:underline">
                Chỉ đường →
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-2xl font-black text-[#05141F] mb-6">Gửi yêu cầu tư vấn</h2>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
