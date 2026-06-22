CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id BIGSERIAL PRIMARY KEY,
  entity_type VARCHAR(40) NOT NULL,
  entity_id TEXT NOT NULL,
  action VARCHAR(20) NOT NULL,
  actor_admin_id BIGINT,
  actor_username VARCHAR(50),
  actor_display_name VARCHAR(50),
  actor_role VARCHAR(20),
  before_data JSONB,
  after_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_audit_log_entity_idx
  ON public.admin_audit_log (entity_type, entity_id, created_at DESC);

CREATE INDEX IF NOT EXISTS admin_audit_log_actor_idx
  ON public.admin_audit_log (actor_username, created_at DESC);

CREATE INDEX IF NOT EXISTS admin_audit_log_created_at_idx
  ON public.admin_audit_log (created_at DESC);
