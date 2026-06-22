"use client";

import { FormEvent, useState } from "react";

export function AdminPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(typeof data.message === "string" ? data.message : "비밀번호를 변경하지 못했습니다.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("비밀번호를 변경했습니다.");
    } catch {
      setMessage("비밀번호 변경 요청에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="pixel-frame mx-auto grid w-full max-w-xl gap-4 p-6 md:p-8">
      <label className="grid gap-2 text-sm font-bold text-[#f3e7d0]">
        현재 비밀번호
        <input
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className="h-11 rounded-lg border border-[var(--border)] bg-black/50 px-3 text-[#f3e7d0] outline-none"
          autoComplete="current-password"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-[#f3e7d0]">
        새 비밀번호
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          className="h-11 rounded-lg border border-[var(--border)] bg-black/50 px-3 text-[#f3e7d0] outline-none"
          autoComplete="new-password"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-[#f3e7d0]">
        새 비밀번호 확인
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="h-11 rounded-lg border border-[var(--border)] bg-black/50 px-3 text-[#f3e7d0] outline-none"
          autoComplete="new-password"
          required
        />
      </label>

      {message ? <p className="text-sm font-bold text-[#ffcf9d]">{message}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="admin-btn-save h-11 rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "변경 중..." : "비밀번호 변경"}
      </button>
    </form>
  );
}
