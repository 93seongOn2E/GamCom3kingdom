import { TeaserVideoSlider } from "@/components/TeaserVideoSlider";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 font-['Noto_Sans_KR','Malgun_Gothic',sans-serif]">
      <section className="pixel-frame overflow-hidden p-5 md:p-7">
        <TeaserVideoSlider />
      </section>
    </div>
  );
}
