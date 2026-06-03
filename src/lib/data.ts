import { client } from "../sanity/client";

export interface CarVariant {
  name: string;
  price: string;
}

export interface Car {
  slug: string;
  name: string;
  shortName: string;
  startPrice: string;
  downPayment: string;
  image: string;
  heroImage: string;
  variants: CarVariant[];
  category: "suv" | "sedan" | "mpv" | "hatchback";
  description: string;
  specs: {
    engine: string;
    power: string;
    torque: string;
    transmission: string;
    seats: string;
    fuel: string;
  };
  updatedAt: string;
}

export interface Contact {
  name: string;
  fullName: string;
  address: string;
  hotline: string;
  phone: string;
  email: string;
  hours: string;
  consultant: string;
  mapEmbed: string;
}

// "1.239.000.000 đ" -> 1239000000. Trả null nếu không parse được.
export function parseVndPrice(s: string | undefined | null): number | null {
  if (!s) return null;
  const digits = s.replace(/\D/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
}

// Chuẩn hóa tên xe: bỏ khoảng trắng thừa/lặp (dữ liệu có " KIA New  Seltos").
export function cleanCarName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}

// Nhãn tháng hiện tại dạng "tháng M/YYYY" cho phần khuyến mãi (tránh hardcode lỗi thời).
export function currentMonthLabel(): string {
  const d = new Date();
  return `tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
}

// Dựng FAQ động theo dữ liệu từng xe (hiển thị + dùng cho FAQPage schema).
export function buildCarFaqs(car: Car): { q: string; a: string }[] {
  const name = cleanCarName(car.name);
  const faqs: { q: string; a: string }[] = [];

  // 1) Giá
  const prices = car.variants.map((v) => parseVndPrice(v.price)).filter((n): n is number => n !== null);
  const topVariant = car.variants.length
    ? car.variants.reduce((a, b) => ((parseVndPrice(b.price) ?? 0) > (parseVndPrice(a.price) ?? 0) ? b : a))
    : null;
  const rangeText =
    prices.length > 1 && topVariant ? ` đến ${topVariant.price} cho bản cao nhất` : "";
  faqs.push({
    q: `Giá xe ${name} bao nhiêu?`,
    a: `${name} có giá niêm yết từ ${car.startPrice}${rangeText}. Giá lăn bánh tại TP.HCM còn tùy phiên bản, mức khuyến mãi từng tháng và phí trước bạ — liên hệ KIA Gò Vấp 0931.456.204 để nhận báo giá lăn bánh chính xác.`,
  });

  // 2) Phiên bản
  if (car.variants.length) {
    faqs.push({
      q: `${name} có mấy phiên bản?`,
      a: `${name} hiện có ${car.variants.length} phiên bản: ${car.variants.map((v) => v.name).join(", ")}.`,
    });
  }

  // 3) Thông số
  const specBits: string[] = [];
  if (car.specs.seats) specBits.push(`${car.specs.seats} chỗ`);
  if (car.specs.engine) specBits.push(`động cơ ${car.specs.engine}`);
  if (car.specs.transmission) specBits.push(`hộp số ${car.specs.transmission}`);
  if (car.specs.fuel) specBits.push(`nhiên liệu ${car.specs.fuel}`);
  if (specBits.length) {
    faqs.push({
      q: `${name} có mấy chỗ ngồi và dùng động cơ gì?`,
      a: `${name} ${specBits.join(", ")}.`,
    });
  }

  // 4) Trả góp
  faqs.push({
    q: `Mua ${name} trả góp tại Gò Vấp như thế nào?`,
    a: `KIA Gò Vấp hỗ trợ trả góp tới 80% giá trị xe qua các ngân hàng liên kết${
      car.downPayment ? `, trả trước từ ${car.downPayment}` : ""
    }. Thủ tục nhanh gọn, hỗ trợ đổi xe cũ lấy xe mới ngay tại showroom 189 Nguyễn Oanh.`,
  });

  // 5) Lái thử
  faqs.push({
    q: `Lái thử ${name} ở đâu tại TP.HCM?`,
    a: `Bạn có thể đăng ký lái thử ${name} miễn phí tại showroom KIA Gò Vấp – 189 Nguyễn Oanh, Phường 10, Quận Gò Vấp. Gọi 0931.456.204 để đặt lịch hoặc yêu cầu lái thử tận nhà.`,
  });

  return faqs;
}

const CARS_QUERY = `*[_type == "car"] | order(order asc, shortName asc) {
  "slug": slug.current,
  name,
  shortName,
  startPrice,
  downPayment,
  image,
  heroImage,
  category,
  description,
  "variants": variants[]{ name, price },
  specs,
  "updatedAt": _updatedAt
}`;

const EMPTY_SPECS: Car["specs"] = {
  engine: "",
  power: "",
  torque: "",
  transmission: "",
  seats: "",
  fuel: "",
};

const PROMOTIONS_QUERY = `*[_id == "promotions"][0].items`;

const CONTACT_QUERY = `*[_id == "contact"][0]{
  name, fullName, address, hotline, phone, email, hours, consultant, mapEmbed
}`;

const CARS_OPTS = { next: { revalidate: 60, tags: ["cars"] } };
const PROMOTIONS_OPTS = { next: { revalidate: 60, tags: ["promotions"] } };
const CONTACT_OPTS = { next: { revalidate: 60, tags: ["contact"] } };

type RawCar = Omit<Car, "variants" | "specs" | "updatedAt"> & {
  variants: CarVariant[] | null;
  specs: Car["specs"] | null;
  updatedAt: string | null;
};

export async function getCars(): Promise<Car[]> {
  const cars = await client.fetch<RawCar[]>(CARS_QUERY, {}, CARS_OPTS);
  return (cars ?? []).map((c) => ({
    ...c,
    variants: c.variants ?? [],
    specs: c.specs ?? EMPTY_SPECS,
    updatedAt: c.updatedAt ?? new Date().toISOString(),
  }));
}

export async function getPromotions(): Promise<string[]> {
  const items = await client.fetch<string[] | null>(PROMOTIONS_QUERY, {}, PROMOTIONS_OPTS);
  return items ?? [];
}

export async function getContact(): Promise<Contact> {
  const data = await client.fetch<Contact | null>(CONTACT_QUERY, {}, CONTACT_OPTS);
  return (
    data ?? {
      name: "",
      fullName: "",
      address: "",
      hotline: "",
      phone: "",
      email: "",
      hours: "",
      consultant: "",
      mapEmbed: "",
    }
  );
}
