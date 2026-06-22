import { getSql } from "@/lib/db";
import { MultiViewBuilder, type MultiViewMemberRow } from "@/components/MultiViewBuilder";

export default async function MultiViewPage() {
  const sql = getSql();
  const members = await sql.query(`
    SELECT
      id,
      nation,
      crew_name,
      nickname,
      soop_id,
      profile_image_url
    FROM public.member
    WHERE soop_id IS NOT NULL
      AND soop_id <> ''
    ORDER BY
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
  `) as MultiViewMemberRow[];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-36 pt-10 font-['Noto_Sans_KR','Malgun_Gothic',sans-serif]">
      <MultiViewBuilder initialMembers={members} />
    </div>
  );
}
