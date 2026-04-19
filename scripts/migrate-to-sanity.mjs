import { createClient } from "@sanity/client";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

config({ path: ".env.local" });

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

function keyify(items) {
  return items.map((item, i) => ({ ...item, _key: `${Date.now().toString(36)}-${i}` }));
}

async function migrateCars() {
  const dir = join(ROOT, "src/content/cars");
  const files = await readdir(dir);
  const carFiles = files.filter((f) => f.endsWith(".json"));

  const docs = [];
  for (let i = 0; i < carFiles.length; i++) {
    const file = carFiles[i];
    const slug = file.replace(/\.json$/, "");
    const raw = JSON.parse(await readFile(join(dir, file), "utf8"));

    docs.push({
      _id: `car-${slug}`,
      _type: "car",
      name: raw.name,
      shortName: raw.shortName,
      slug: { _type: "slug", current: slug },
      category: raw.category,
      startPrice: raw.startPrice,
      downPayment: raw.downPayment,
      image: raw.image,
      heroImage: raw.heroImage,
      description: raw.description,
      variants: keyify(
        (raw.variants ?? []).map((v) => ({ _type: "variant", name: v.name, price: v.price }))
      ),
      specs: raw.specs,
      order: (i + 1) * 10,
    });
  }

  console.log(`Uploading ${docs.length} cars…`);
  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc.shortName}`);
  }
}

async function migratePromotions() {
  const raw = JSON.parse(await readFile(join(ROOT, "src/content/promotions.json"), "utf8"));
  console.log("Uploading promotions…");
  await client.createOrReplace({
    _id: "promotions",
    _type: "promotions",
    items: raw.items ?? [],
  });
  console.log("  ✓ promotions");
}

async function migrateContact() {
  const raw = JSON.parse(await readFile(join(ROOT, "src/content/contact.json"), "utf8"));
  console.log("Uploading contact…");
  await client.createOrReplace({
    _id: "contact",
    _type: "contact",
    ...raw,
  });
  console.log("  ✓ contact");
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  await migrateCars();
  await migratePromotions();
  await migrateContact();
  console.log("\nMigration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
