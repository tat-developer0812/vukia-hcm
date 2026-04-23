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

CREATE UNIQUE INDEX IF NOT EXISTS leads_phone_idx ON leads (phone);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email) WHERE email IS NOT NULL;
