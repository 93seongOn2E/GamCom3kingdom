"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getYoutubeEmbedUrl, teaserVideos } from "@/lib/teaser-videos";

export function TeaserVideoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = teaserVideos[activeIndex] ?? teaserVideos[0];
  const hasMultipleVideos = teaserVideos.length > 1;

  function moveSlide(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + teaserVideos.length) % teaserVideos.length);
  }

  return (
    <div className="teaser-page-slider">
      <div className="mb-5">
        <p className="text-xs font-black tracking-[0.24em] text-[var(--accent)]">티저 영상</p>
        <h1 className="mt-2 text-2xl font-black text-[#f3e7d0] md:text-3xl">{activeVideo.title}</h1>
        <p className="mt-2 text-sm font-medium leading-6 text-[#aa9a82]">{activeVideo.description}</p>
      </div>

      <div className="teaser-modal-video">
        <iframe
          key={activeVideo.id}
          src={getYoutubeEmbedUrl(activeVideo.id)}
          title={activeVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        {hasMultipleVideos ? (
          <>
            <button type="button" className="teaser-slide-button left" onClick={() => moveSlide(-1)} aria-label="이전 티저 영상">
              <ChevronLeft size={22} />
            </button>
            <button type="button" className="teaser-slide-button right" onClick={() => moveSlide(1)} aria-label="다음 티저 영상">
              <ChevronRight size={22} />
            </button>
          </>
        ) : null}
      </div>

      {hasMultipleVideos ? (
        <div className="teaser-slide-dots" aria-label="티저 영상 목록">
          {teaserVideos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              className={index === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`${index + 1}번째 티저 영상 보기`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
