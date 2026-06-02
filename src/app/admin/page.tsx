import {
  getLeadsWithStats,
  getRecentVisitors,
  getVisitorJourney,
} from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  robots: { index: false, follow: false },
};

const TZ = "Asia/Ho_Chi_Minh";

function fmt(ts: string | null): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleString("vi-VN", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Nhãn tiếng Việt cho từng loại event
const EVENT_LABEL: Record<string, string> = {
  pageview: "👁️ Vào trang",
  car_detail_view: "🚗 Xem chi tiết xe",
  quote_modal_open: "📝 Mở form báo giá",
  quote_form_submit: "✅ GỬI BÁO GIÁ",
  hero_quote_click: "📝 Bấm báo giá (banner)",
  phone_click: "📞 BẤM GỌI ĐIỆN",
  zalo_click: "💬 BẤM CHAT ZALO",
};

function labelOf(name: string): string {
  return EVENT_LABEL[name] ?? name;
}

function shortVid(id: string): string {
  return id.slice(0, 8);
}

interface PageProps {
  searchParams: Promise<{ key?: string; visitor?: string }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const { key, visitor } = await searchParams;
  const adminKey = process.env.ADMIN_KEY;

  // ── Lớp bảo vệ tối thiểu bằng key ──
  if (!adminKey || key !== adminKey) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
          <h1 className="text-lg font-bold text-gray-800">🔒 Khu vực quản trị</h1>
          <p className="text-sm text-gray-500 mt-2">
            Cần khóa truy cập. Mở trang bằng đường dẫn{" "}
            <code className="bg-gray-100 px-1 rounded">/admin?key=...</code>
          </p>
        </div>
      </main>
    );
  }

  const qs = `key=${encodeURIComponent(key)}`;

  // ── Chế độ xem hành trình của 1 visitor ──
  if (visitor) {
    const journey = await getVisitorJourney(visitor);
    return (
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <a href={`/admin?${qs}`} className="text-sm text-[#BB162B] hover:underline">
            ← Về danh sách
          </a>
          <h1 className="text-xl font-bold text-gray-800 mt-2">
            Hành trình khách <span className="font-mono">{shortVid(visitor)}</span>
          </h1>
          <p className="text-sm text-gray-500 mb-6">{journey.length} hành động</p>

          {journey.length === 0 ? (
            <p className="text-gray-500">Chưa có dữ liệu.</p>
          ) : (
            <ol className="relative border-l-2 border-gray-200 ml-3 space-y-4">
              {journey.map((e) => {
                const isHot =
                  e.name === "quote_form_submit" ||
                  e.name === "phone_click" ||
                  e.name === "zalo_click";
                return (
                  <li key={e.id} className="ml-6">
                    <span
                      className={`absolute -left-[7px] w-3 h-3 rounded-full ${
                        isHot ? "bg-[#BB162B]" : "bg-gray-300"
                      }`}
                    />
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-xs text-gray-400 font-mono w-24 shrink-0">
                        {fmt(e.created_at)}
                      </span>
                      <span
                        className={`text-sm ${
                          isHot ? "font-bold text-[#BB162B]" : "text-gray-700"
                        }`}
                      >
                        {labelOf(e.name)}
                      </span>
                      {e.props?.car && e.props.car !== "none" && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                          {e.props.car}
                        </span>
                      )}
                      {e.path && (
                        <span className="text-xs text-gray-400 font-mono">{e.path}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </main>
    );
  }

  // ── Danh sách lead + visitor gần đây ──
  const [leads, visitors] = await Promise.all([
    getLeadsWithStats(100),
    getRecentVisitors(100),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-2xl font-bold text-gray-800">📊 Hành trình khách hàng</h1>
          <p className="text-sm text-gray-500">
            Bấm vào một dòng để xem chi tiết khách đó đã làm gì trên web.
          </p>
        </header>

        {/* Leads — đã có SĐT thật */}
        <section>
          <h2 className="font-bold text-gray-700 mb-3">
            🎯 Lead đã để lại thông tin ({leads.length})
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-4 py-3">Tên</th>
                  <th className="px-4 py-3">SĐT</th>
                  <th className="px-4 py-3">Xe quan tâm</th>
                  <th className="px-4 py-3">Gửi lúc</th>
                  <th className="px-4 py-3 text-center">Hành động</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{l.name}</td>
                    <td className="px-4 py-3 font-mono text-[#BB162B]">{l.phone}</td>
                    <td className="px-4 py-3 text-gray-600">{l.car ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{fmt(l.created_at)}</td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {l.event_count}
                    </td>
                    <td className="px-4 py-3">
                      {l.visitor_id ? (
                        <a
                          href={`/admin?${qs}&visitor=${encodeURIComponent(l.visitor_id)}`}
                          className="text-[#BB162B] hover:underline whitespace-nowrap"
                        >
                          Xem hành trình →
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs">không có</span>
                      )}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                      Chưa có lead nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Visitors — gồm cả khách ẩn danh chưa để lại SĐT */}
        <section>
          <h2 className="font-bold text-gray-700 mb-3">
            👥 Khách truy cập gần đây ({visitors.length})
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-4 py-3">Khách</th>
                  <th className="px-4 py-3 text-center">Số hành động</th>
                  <th className="px-4 py-3">Lần đầu</th>
                  <th className="px-4 py-3">Gần nhất</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visitors.map((v) => (
                  <tr key={v.visitor_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {v.lead_phone ? (
                        <span className="font-medium text-gray-800">
                          {v.lead_name}{" "}
                          <span className="font-mono text-[#BB162B]">{v.lead_phone}</span>
                        </span>
                      ) : (
                        <span className="font-mono text-gray-400">
                          ẩn danh · {shortVid(v.visitor_id)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {v.event_count}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{fmt(v.first_seen)}</td>
                    <td className="px-4 py-3 text-gray-500">{fmt(v.last_seen)}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`/admin?${qs}&visitor=${encodeURIComponent(v.visitor_id)}`}
                        className="text-[#BB162B] hover:underline whitespace-nowrap"
                      >
                        Xem hành trình →
                      </a>
                    </td>
                  </tr>
                ))}
                {visitors.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                      Chưa có dữ liệu truy cập.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
