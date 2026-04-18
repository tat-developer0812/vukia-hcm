import { CreditCard, CheckCircle, Phone, FileText } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { getCars } from "@/lib/data";

export const metadata = {
  title: "Thủ tục trả góp xe KIA – Lãi suất 0% | KIA HCM",
  description: "Hướng dẫn thủ tục trả góp mua xe KIA tại TP.HCM. Lãi suất ưu đãi, thủ tục đơn giản, duyệt nhanh.",
};

const steps = [
  { step: "01", title: "Chọn xe & phiên bản", desc: "Chọn dòng xe KIA phù hợp với nhu cầu và ngân sách" },
  { step: "02", title: "Chuẩn bị hồ sơ", desc: "CMND/CCCD, hộ khẩu, xác nhận thu nhập" },
  { step: "03", title: "Ngân hàng duyệt hồ sơ", desc: "Thời gian duyệt: 1-3 ngày làm việc" },
  { step: "04", title: "Ký hợp đồng & nhận xe", desc: "Đóng tiền trước và ký hợp đồng vay tại showroom" },
];

const docs = [
  "CMND/CCCD bản gốc + 2 bản photo",
  "Hộ khẩu/KT3 bản gốc + 2 bản photo",
  "Giấy đăng ký kết hôn (nếu có)",
  "Xác nhận thu nhập / Hợp đồng lao động",
  "Sao kê tài khoản 3-6 tháng gần nhất",
  "Giấy tờ tài sản thế chấp (nếu có)",
];

export default async function FinancingPage() {
  const cars = await getCars();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-2">Thủ Tục Trả Góp Xe KIA</h1>
        <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3 mb-4" />
        <p className="text-gray-300 text-sm max-w-md mx-auto">
          Hỗ trợ vay trả góp lên đến 80% giá trị xe – Lãi suất ưu đãi – Thủ tục đơn giản
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-[#05141F] mb-6 text-center">Quy trình 4 bước</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-[#BB162B] z-10" />
                )}
                <div className="w-10 h-10 bg-[#BB162B] text-white rounded-full flex items-center justify-center font-black text-sm mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-bold text-sm text-[#05141F] mb-1">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Docs + info */}
          <div className="space-y-6">
            {/* Docs */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-[#BB162B]" size={22} />
                <h3 className="font-black text-[#05141F]">Hồ sơ cần chuẩn bị</h3>
              </div>
              <div className="space-y-2">
                {docs.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[#BB162B] mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-600">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages */}
            <div className="bg-gradient-to-br from-[#05141F] to-[#0d2137] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="text-[#BB162B]" size={22} />
                <h3 className="font-black">Ưu đãi tài chính</h3>
              </div>
              <div className="space-y-2">
                {["Lãi suất 0% trong 12 tháng đầu", "Vay tối đa 80% giá trị xe", "Thời hạn vay 12–84 tháng", "Duyệt hồ sơ nhanh trong 24 giờ", "Liên kết 10+ ngân hàng lớn"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#BB162B]" />
                    <span className="text-sm text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
              <a href="tel:0931456204"
                className="mt-5 flex items-center justify-center gap-2 bg-[#BB162B] hover:bg-[#9a1022] text-white py-3 rounded-full font-bold text-sm transition-colors">
                <Phone size={16} /> 0931.456.204
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-black text-[#05141F] mb-6">Tư vấn trả góp miễn phí</h2>
            <QuoteForm cars={cars} />
          </div>
        </div>
      </div>
    </div>
  );
}
