import type { AdminSession } from "@/lib/admin-auth";

type AuditAction = "create" | "update" | "delete";

type AuditInput = {
  entityType: "castle" | "member" | "chronicle";
  entityId: string | number;
  action: AuditAction;
  actor: AdminSession;
  beforeData?: unknown;
  afterData?: unknown;
};

export async function writeAdminAuditLog(sql: any, input: AuditInput) {
  await sql`
    INSERT INTO public.admin_audit_log (
      entity_type,
      entity_id,
      action,
      actor_admin_id,
      actor_username,
      actor_display_name,
      actor_role,
      before_data,
      after_data
    )
    VALUES (
      ${input.entityType},
      ${String(input.entityId)},
      ${input.action},
      ${input.actor.adminId},
      ${input.actor.username},
      ${input.actor.displayName},
      ${input.actor.role},
      ${input.beforeData == null ? null : JSON.stringify(input.beforeData)}::jsonb,
      ${input.afterData == null ? null : JSON.stringify(input.afterData)}::jsonb
    )
  `;
}
