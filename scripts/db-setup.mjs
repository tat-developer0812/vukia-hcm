// Áp dụng src/lib/schema.sql lên Neon. Idempotent (IF NOT EXISTS) → chạy lại an toàn.
// Chạy: node scripts/db-setup.mjs
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, "..", "src", "lib", "schema.sql");
const schema = readFileSync(schemaPath, "utf8");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("❌ DATABASE_URL chưa được set trong .env.local");
  process.exit(1);
}

const sql = neon(url);

// Bỏ các dòng comment '--' trước, rồi tách theo ';'
const stripped = schema
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n");

const statements = stripped
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

for (const stmt of statements) {
  const label = stmt.replace(/\s+/g, " ").slice(0, 70);
  try {
    await sql.query(stmt);
    console.log("✅", label);
  } catch (err) {
    console.error("❌", label, "\n   →", err.message);
    process.exit(1);
  }
}

console.log(`\n✔ Hoàn tất ${statements.length} statement.`);
