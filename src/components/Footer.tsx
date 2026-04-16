import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { cars, contact } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#05141F] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <span className="text-3xl font-black tracking-tighter italic">KIA</span>
            <div className="w-12 h-1 bg-[#BB162B] mt-2" />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {contact.fullName}
          </p>
          <p className="text-xs text-gray-400">
            Đại lý KIA chính hãng tại TP.HCM – Cam kết giá tốt nhất, dịch vụ chuyên nghiệp nhất.
          </p>
        </div>

        {/* Dòng xe */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white">
            Dòng xe KIA
          </h3>
          <ul className="space-y-2">
            {cars.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className="text-gray-300 hover:text-[#BB162B] text-sm transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-[#BB162B] rounded-full shrink-0" />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white">
            Dịch vụ
          </h3>
          <ul className="space-y-2">
            {[
              { href: "/dang-ky-lai-thu-xe-kia", label: "Đăng ký lái thử" },
              { href: "/thu-tuc-tra-gop-xe-kia", label: "Thủ tục trả góp" },
              { href: "/lien-he-kia-ho-chi-minh", label: "Liên hệ tư vấn" },
              { href: "/privacy-policy", label: "Chính sách bảo mật" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-gray-300 hover:text-[#BB162B] text-sm transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-[#BB162B] rounded-full shrink-0" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white">
            Liên hệ
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[#BB162B] mt-0.5 shrink-0" />
              <span className="text-gray-300 text-sm">{contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#BB162B] shrink-0" />
              <a
                href={`tel:${contact.hotline.replace(/\./g, "")}`}
                className="text-gray-300 hover:text-[#BB162B] text-sm transition-colors font-semibold"
              >
                {contact.hotline}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#BB162B] shrink-0" />
              <a
                href={`mailto:${contact.email}`}
                className="text-gray-300 hover:text-[#BB162B] text-sm transition-colors"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={16} className="text-[#BB162B] mt-0.5 shrink-0" />
              <span className="text-gray-300 text-sm">{contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 {contact.name}. All rights reserved.</p>
          <p>Tư vấn viên: {contact.consultant} – {contact.hotline}</p>
        </div>
      </div>
    </footer>
  );
}
