import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return neon(url);
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  car: string | null;
  note: string | null;
  page: string | null;
  created_at: string;
  updated_at: string;
}

export async function findLeadByPhoneOrEmail(
  phone: string,
  email?: string
): Promise<Lead | null> {
  const sql = getDb();
  if (email) {
    const rows = await sql`
      SELECT * FROM leads WHERE phone = ${phone} OR (email IS NOT NULL AND email = ${email})
      LIMIT 1
    `;
    return (rows[0] as Lead) ?? null;
  } else {
    const rows = await sql`
      SELECT * FROM leads WHERE phone = ${phone}
      LIMIT 1
    `;
    return (rows[0] as Lead) ?? null;
  }
}

export async function insertLead(data: {
  name: string;
  phone: string;
  email?: string;
  car?: string;
  note?: string;
  page?: string;
}): Promise<Lead> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO leads (name, phone, email, car, note, page)
    VALUES (${data.name}, ${data.phone}, ${data.email ?? null}, ${data.car ?? null}, ${data.note ?? null}, ${data.page ?? null})
    RETURNING *
  `;
  return rows[0] as Lead;
}

export async function touchLead(id: number): Promise<void> {
  const sql = getDb();
  await sql`UPDATE leads SET updated_at = NOW() WHERE id = ${id}`;
}
