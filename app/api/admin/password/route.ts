import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-request";
import { hashPassword, verifyPassword } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

type AdminPasswordRow = {
  id: number;
  password_hash: string;
};

function unauthorized() {
  return NextResponse.json({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
}

export async function PATCH(request: Request) {
  const session = getAdminSessionFromRequest(request);

  if (!session) {
    return unauthorized();
  }

  try {
    const body = await request.json() as {
      currentPassword?: unknown;
      newPassword?: unknown;
    };

    const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
    const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "현재 비밀번호와 새 비밀번호를 입력해주세요." }, { status: 400 });
    }

    if (newPassword.length < 4) {
      return NextResponse.json({ message: "새 비밀번호는 4자 이상으로 입력해주세요." }, { status: 400 });
    }

    const sql = getSql();
    const rows = await sql`
      SELECT id, password_hash
      FROM public.admin
      WHERE id = ${session.adminId}
        AND username = ${session.username}
        AND is_active = TRUE
      LIMIT 1
    ` as AdminPasswordRow[];

    const admin = rows[0];

    if (!admin || !verifyPassword(currentPassword, admin.password_hash)) {
      return NextResponse.json({ message: "현재 비밀번호가 올바르지 않습니다." }, { status: 400 });
    }

    await sql`
      UPDATE public.admin
      SET password_hash = ${hashPassword(newPassword)},
          updated_at = now()
      WHERE id = ${admin.id}
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to change admin password", error);
    return NextResponse.json({ message: "비밀번호를 변경하지 못했습니다." }, { status: 500 });
  }
}
