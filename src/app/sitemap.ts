import { MetadataRoute } from "next";
import { getCars } from "@/lib/data";

const baseUrl = "https://www.kiagovaphcm.com";

const STATIC_LAST_MODIFIED = {
  home: "2026-05-19",
  baoduong: "2026-04-15",
  gioithieu: "2026-01-10",
  laithu: "2026-04-15",
  tragop: "2026-04-15",
  carnivalArticle: "2026-05-19",
  sportageArticle: "2026-06-12",
  lienhe: "2026-01-10",
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars();
  const carPages: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${baseUrl}/${car.slug}`,
    lastModified: new Date(car.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(STATIC_LAST_MODIFIED.home), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/bao-duong-xe-kia-go-vap`, lastModified: new Date(STATIC_LAST_MODIFIED.baoduong), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/gioi-thieu-kia-go-vap`, lastModified: new Date(STATIC_LAST_MODIFIED.gioithieu), changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/dang-ky-lai-thu-xe-kia`, lastModified: new Date(STATIC_LAST_MODIFIED.laithu), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/thu-tuc-tra-gop-xe-kia`, lastModified: new Date(STATIC_LAST_MODIFIED.tragop), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/kia-sportage-2026-lai-thu-go-vap`, lastModified: new Date(STATIC_LAST_MODIFIED.sportageArticle), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/kia-carnival-2026-lai-thu-go-vap`, lastModified: new Date(STATIC_LAST_MODIFIED.carnivalArticle), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/lien-he-kia-ho-chi-minh`, lastModified: new Date(STATIC_LAST_MODIFIED.lienhe), changeFrequency: "monthly", priority: 0.6 },
    ...carPages,
  ];
}
