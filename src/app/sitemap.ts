import { MetadataRoute } from "next";
import { getCars } from "@/lib/data";

const baseUrl = "https://www.kiagovaphcm.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars();
  const carPages: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${baseUrl}/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/dang-ky-lai-thu-xe-kia`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/thu-tuc-tra-gop-xe-kia`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/lien-he-kia-ho-chi-minh`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...carPages,
  ];
}
