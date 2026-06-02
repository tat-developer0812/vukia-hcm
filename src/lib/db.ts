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
  visitor_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventRow {
  id: number;
  visitor_id: string;
  name: string;
  props: Record<string, string> | null;
  path: string | null;
  referrer: string | null;
  created_at: string;
}

// Tìm lead trong NGÀY HÔM NAY (theo Asia/Ho_Chi_Minh) match phone hoặc email.
// Khác ngày → trả null để route handler insert lead mới + gửi mail.
export async function findTodayLeadByPhoneOrEmail(
  phone: string,
  email?: string
): Promise<Lead | null> {
  const sql = getDb();
  if (email) {
    const rows = await sql`
      SELECT * FROM leads
      WHERE (phone = ${phone} OR (email IS NOT NULL AND email = ${email}))
        AND (created_at AT TIME ZONE 'Asia/Ho_Chi_Minh')::date
            = (NOW() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date
      ORDER BY id DESC
      LIMIT 1
    `;
    return (rows[0] as Lead) ?? null;
  } else {
    const rows = await sql`
      SELECT * FROM leads
      WHERE phone = ${phone}
        AND (created_at AT TIME ZONE 'Asia/Ho_Chi_Minh')::date
            = (NOW() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date
      ORDER BY id DESC
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
  visitorId?: string;
}): Promise<Lead> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO leads (name, phone, email, car, note, page, visitor_id)
    VALUES (${data.name}, ${data.phone}, ${data.email ?? null}, ${data.car ?? null}, ${data.note ?? null}, ${data.page ?? null}, ${data.visitorId ?? null})
    RETURNING *
  `;
  return rows[0] as Lead;
}

export async function touchLead(id: number): Promise<void> {
  const sql = getDb();
  await sql`UPDATE leads SET updated_at = NOW() WHERE id = ${id}`;
}

// ──────────────────────────────── EVENTS ────────────────────────────────

export async function insertEvent(data: {
  visitorId: string;
  name: string;
  props?: Record<string, string> | null;
  path?: string | null;
  referrer?: string | null;
}): Promise<void> {
  const sql = getDb();
  await sql`
    INSERT INTO events (visitor_id, name, props, path, referrer)
    VALUES (
      ${data.visitorId},
      ${data.name},
      ${data.props ? JSON.stringify(data.props) : null}::jsonb,
      ${data.path ?? null},
      ${data.referrer ?? null}
    )
  `;
}

// Toàn bộ event của 1 visitor, theo thứ tự thời gian (cho trang admin xem hành trình)
export async function getVisitorJourney(visitorId: string): Promise<EventRow[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM events
    WHERE visitor_id = ${visitorId}
    ORDER BY created_at ASC
  `;
  return rows as EventRow[];
}

export interface LeadWithStats extends Lead {
  event_count: number;
  last_seen: string | null;
}

// Danh sách lead gần đây + số event và lần hoạt động cuối (join theo visitor_id)
export async function getLeadsWithStats(limit = 100): Promise<LeadWithStats[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT
      l.*,
      COALESCE(e.cnt, 0)::int AS event_count,
      e.last_seen
    FROM leads l
    LEFT JOIN (
      SELECT visitor_id, COUNT(*) AS cnt, MAX(created_at) AS last_seen
      FROM events
      GROUP BY visitor_id
    ) e ON e.visitor_id = l.visitor_id
    ORDER BY l.created_at DESC
    LIMIT ${limit}
  `;
  return rows as LeadWithStats[];
}

export interface VisitorSummary {
  visitor_id: string;
  event_count: number;
  first_seen: string;
  last_seen: string;
  lead_name: string | null;
  lead_phone: string | null;
}

// Các visitor gần đây nhất (cả ẩn danh lẫn đã thành lead), kèm thông tin lead nếu có
export async function getRecentVisitors(limit = 100): Promise<VisitorSummary[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT
      e.visitor_id,
      COUNT(*)::int       AS event_count,
      MIN(e.created_at)   AS first_seen,
      MAX(e.created_at)   AS last_seen,
      l.name              AS lead_name,
      l.phone             AS lead_phone
    FROM events e
    LEFT JOIN LATERAL (
      SELECT name, phone FROM leads
      WHERE visitor_id = e.visitor_id
      ORDER BY id DESC LIMIT 1
    ) l ON true
    GROUP BY e.visitor_id, l.name, l.phone
    ORDER BY last_seen DESC
    LIMIT ${limit}
  `;
  return rows as VisitorSummary[];
}
