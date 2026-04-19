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
  specs
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

const FETCH_OPTS = { next: { revalidate: 60 } } as const;

type RawCar = Omit<Car, "variants" | "specs"> & {
  variants: CarVariant[] | null;
  specs: Car["specs"] | null;
};

export async function getCars(): Promise<Car[]> {
  const cars = await client.fetch<RawCar[]>(CARS_QUERY, {}, FETCH_OPTS);
  return (cars ?? []).map((c) => ({
    ...c,
    variants: c.variants ?? [],
    specs: c.specs ?? EMPTY_SPECS,
  }));
}

export async function getPromotions(): Promise<string[]> {
  const items = await client.fetch<string[] | null>(PROMOTIONS_QUERY, {}, FETCH_OPTS);
  return items ?? [];
}

export async function getContact(): Promise<Contact> {
  const data = await client.fetch<Contact | null>(CONTACT_QUERY, {}, FETCH_OPTS);
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
