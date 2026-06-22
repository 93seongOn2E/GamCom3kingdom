import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminPasswordForm } from "@/components/AdminPasswordForm";
import { AdminSectionNav } from "@/components/AdminSectionNav";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";

export default async function AdminPasswordPage() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4">
        <div className="mb-2 text-xs font-bold tracking-[0.24em] text-[var(--accent)]">ADMIN</div>
        <div>
          <h1 className="text-2xl font-black text-[#f3e7d0]">비밀번호 변경</h1>
          <p className="mt-1 text-sm text-[#aa9a82]">
            현재 로그인한 관리자 계정의 비밀번호를 변경합니다.
          </p>
        </div>
      </div>
      <AdminSectionNav role={session.role} />
      <AdminPasswordForm />
    </div>
  );
}
