import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, CheckCircle, Star, ArrowRight, Shield, Wrench, CreditCard } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import QuoteForm from "@/components/QuoteForm";
import { cars, promotions, contact } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Quick CTA bar */}
      <div className="bg-[#BB162B] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <a href="tel:0962216351" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Phone size={15} /> Gọi ngay: 096.2216.351
          </a>
          <Link href="/dang-ky-lai-thu-xe-kia" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Star size={15} /> Đăng ký lái thử miễn phí
          </Link>
          <Link href="/thu-tuc-tra-gop-xe-kia" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <CreditCard size={15} /> Trả góp 0% lãi suất
          </Link>
        </div>
      </div>

      {/* Promotions */}
      <section className="bg-gradient-to-r from-[#05141F] to-[#0d2137] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Ưu đãi tháng 4/2026</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Khuyến mãi khi mua xe KIA</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotions.map((promo, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <CheckCircle size={20} className="text-[#BB162B] shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">{promo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cars grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Showroom KIA HCM</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#05141F] mt-2">Dòng xe KIA</h2>
            <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3" />
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
              Khám phá đầy đủ các dòng xe KIA đang có tại đại lý. Giá tốt nhất – ưu đãi hấp dẫn nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Link
                key={car.slug}
                href={`/${car.slug}`}
                className="car-card bg-white rounded-2xl overflow-hidden border border-gray-100 group shadow-sm"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <span className="absolute top-3 left-3 bg-[#05141F] text-white text-xs px-2 py-1 rounded-full font-medium">
                    {car.category === "suv" ? "SUV" : car.category === "sedan" ? "Sedan" : car.category === "mpv" ? "MPV" : "Hatchback"}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-lg text-[#05141F] group-hover:text-[#BB162B] transition-colors">
                    {car.name}
                  </h3>
                  <div className="mt-2">
                    <p className="text-xs text-gray-400">Giá từ</p>
                    <p className="text-xl font-black text-[#BB162B]">{car.startPrice}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Trả trước từ: <span className="font-semibold">{car.downPayment}</span>
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{car.specs.seats} chỗ · {car.specs.fuel}</span>
                    <span className="text-xs font-semibold text-[#BB162B] flex items-center gap-1">
                      Xem chi tiết <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Tại sao chọn chúng tôi</span>
            <h2 className="text-3xl font-black text-[#05141F] mt-2">Đại Lý KIA Hồ Chí Minh</h2>
            <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10 text-[#BB162B]" />,
                title: "Chính hãng 100%",
                desc: "Xe KIA chính hãng THACO nhập khẩu và lắp ráp, đảm bảo chất lượng và bảo hành đầy đủ.",
              },
              {
                icon: <CreditCard className="w-10 h-10 text-[#BB162B]" />,
                title: "Hỗ trợ tài chính",
                desc: "Trả góp lãi suất 0%, thủ tục đơn giản. Hỗ trợ đăng ký và giao xe tận nơi.",
              },
              {
                icon: <Wrench className="w-10 h-10 text-[#BB162B]" />,
                title: "Dịch vụ hậu mãi",
                desc: "Bảo hành 5 năm / 150.000 km. Đội ngũ kỹ thuật viên được đào tạo bởi KIA Hàn Quốc.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors group">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-[#05141F] mb-2 group-hover:text-[#BB162B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + Contact */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Liên hệ ngay</span>
            <h2 className="text-3xl font-black text-[#05141F] mt-2 mb-6">Tư Vấn & Báo Giá</h2>
            <QuoteForm />
          </div>
          <div>
            <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Showroom</span>
            <h2 className="text-3xl font-black text-[#05141F] mt-2 mb-6">Địa chỉ đại lý</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <MapPin className="text-[#BB162B] mt-1 shrink-0" size={22} />
                <div>
                  <p className="font-bold text-sm text-[#05141F]">{contact.fullName}</p>
                  <p className="text-gray-500 text-sm mt-1">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Phone className="text-[#BB162B] shrink-0" size={22} />
                <div>
                  <p className="text-xs text-gray-400">Hotline tư vấn ({contact.consultant})</p>
                  <a href="tel:0962216351" className="font-black text-2xl text-[#BB162B] hover:opacity-80 transition-opacity">
                    {contact.hotline}
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-[#BB162B] mx-auto mb-2" size={36} />
                <p className="text-sm font-semibold text-[#05141F]">38 Chế Lan Viên</p>
                <p className="text-xs text-gray-500 mt-1">Tây Thạnh, Tân Phú, TP.HCM</p>
                <a
                  href="https://maps.google.com/?q=38+Chế+Lan+Viên+Tân+Phú+HCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#BB162B] font-bold mt-2 inline-block border border-[#BB162B] px-3 py-1 rounded-full hover:bg-[#BB162B] hover:text-white transition-colors"
                >
                  Xem Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating call button is in layout.tsx */}
    </>
  );
}
