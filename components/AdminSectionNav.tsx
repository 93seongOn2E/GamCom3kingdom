"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin/map", label: "영토" },
  { href: "/admin/factions", label: "세력" },
  { href: "/admin/chronicle", label: "연대기" },
  { href: "/admin/password", label: "비밀번호 변경" }
];

export function AdminSectionNav({ role }: { role?: string }) {
  const pathname = usePathname();
  const visibleItems = role === "master" ? items : items.filter((item) => item.href !== "/admin/map");

  return (
    <nav className="mb-5 flex flex-wrap gap-2">
      {visibleItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              active
                ? "bg-[var(--accent)] text-[#1a130d]"
                : "border border-[var(--border)] bg-white/5 text-[#dbc292] hover:bg-white/10"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
