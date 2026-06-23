import { getSql } from "@/lib/db";
import { BroadcastDirectory, type MemberBroadcastRow } from "@/components/BroadcastDirectory";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BroadcastPage() {
  const sql = getSql();
  const members = await sql.query(`
    SELECT
      id,
      nation,
      crew_name,
      nickname,
      soop_id,
      is_live,
      thumbnail_image_url,
      profile_image_url,
      broadcast_title,
      viewer_count,
      job
    FROM public.member
    ORDER BY
      is_live DESC,
      viewer_count DESC NULLS LAST,
      CASE nation
        WHEN '위나라' THEN 1
        WHEN '촉나라' THEN 2
        WHEN '오나라' THEN 3
        ELSE 9
      END,
      CASE role_name
        WHEN '군주' THEN 1
        WHEN '장군' THEN 2
        ELSE 3
      END,
      nickname
  `) as MemberBroadcastRow[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 font-['Noto_Sans_KR','Malgun_Gothic',sans-serif]">
      <BroadcastDirectory initialMembers={members} />
    </div>
  );
}
