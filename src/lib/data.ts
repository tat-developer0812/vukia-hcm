import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

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
}

const reader = createReader(process.cwd(), config);

export async function getCars(): Promise<Car[]> {
  const entries = await reader.collections.cars.all();
  return entries.map((entry) => ({
    slug: entry.slug,
    name: entry.entry.name,
    shortName: entry.entry.shortName,
    startPrice: entry.entry.startPrice,
    downPayment: entry.entry.downPayment,
    image: entry.entry.image,
    heroImage: entry.entry.heroImage,
    category: entry.entry.category as Car["category"],
    description: entry.entry.description,
    variants: entry.entry.variants as CarVariant[],
    specs: entry.entry.specs,
  }));
}

export async function getPromotions(): Promise<string[]> {
  const data = await reader.singletons.promotions.read();
  return [...(data?.items ?? [])];
}

export async function getContact() {
  const data = await reader.singletons.contact.read();
  return data ?? {
    name: "",
    fullName: "",
    address: "",
    hotline: "",
    phone: "",
    email: "",
    hours: "",
    consultant: "",
    mapEmbed: "",
  };
}
