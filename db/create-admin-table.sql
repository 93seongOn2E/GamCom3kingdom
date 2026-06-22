CREATE TABLE IF NOT EXISTS public.admin (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  display_name VARCHAR(50),
  role VARCHAR(20) NOT NULL DEFAULT 'sub_manager',
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin
  ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'sub_manager';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'admin_role_check'
  ) THEN
    ALTER TABLE public.admin
      ADD CONSTRAINT admin_role_check
      CHECK (role IN ('master', 'manager', 'sub_manager'));
  END IF;
END $$;
