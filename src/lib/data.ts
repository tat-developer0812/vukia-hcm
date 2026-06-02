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
