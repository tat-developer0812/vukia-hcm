CREATE TABLE IF NOT EXISTS leads (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  phone      VARCHAR(20)   NOT NULL,
  email      VARCHAR(255),
  car        VARCHAR(100),
  note       TEXT,
  page       VARCHAR(50),
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_phone_idx ON leads (phone);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at);

-- Gắn lead với visitor_id để nối ngược hành trình hành vi với SĐT thật
ALTER TABLE leads ADD COLUMN IF NOT EXISTS visitor_id VARCHAR(40);
CREATE INDEX IF NOT EXISTS leads_visitor_id_idx ON leads (visitor_id) WHERE visitor_id IS NOT NULL;

-- Nhật ký hành vi: mỗi click/pageview là 1 dòng, gắn theo visitor_id (ẩn danh trên trình duyệt)
CREATE TABLE IF NOT EXISTS events (
  id         BIGSERIAL    PRIMARY KEY,
  visitor_id VARCHAR(40)  NOT NULL,
  name       VARCHAR(60)  NOT NULL,
  props      JSONB,
  path       VARCHAR(255),
  referrer   VARCHAR(255),
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS events_visitor_id_idx ON events (visitor_id);
CREATE INDEX IF NOT EXISTS events_created_at_idx ON events (created_at);
CREATE INDEX IF NOT EXISTS events_name_idx ON events (name);
