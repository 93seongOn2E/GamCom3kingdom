"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getYoutubeEmbedUrl, teaserVideos } from "@/lib/teaser-videos";

const teaserHiddenKey = "gc-teaser-video-hidden";

export function TeaserVideoModal() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = teaserVideos[activeIndex] ?? teaserVideos[0];
  const hasMultipleVideos = teaserVideos.length > 1;

  useEffect(() => {
    if (window.localStorage.getItem(teaserHiddenKey) !== "1") {
      setOpen(true);
    }
  }, []);

  function close() {
    setOpen(false);
  }

  function closeForever() {
    window.localStorage.setItem(teaserHiddenKey, "1");
    setOpen(false);
  }

  function moveSlide(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + teaserVideos.length) % teaserVideos.length);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="teaser-modal-layer">
      <section className="teaser-modal" role="dialog" aria-modal="true" aria-labelledby="teaser-modal-title">
        <button type="button" className="teaser-modal-close" onClick={close} aria-label="티저 닫기">
          <X size={18} />
        </button>

        <div className="teaser-modal-copy">
          <p className="teaser-modal-eyebrow">티저 영상</p>
          <h2 id="teaser-modal-title">{activeVideo.title}</h2>
          <p>{activeVideo.description}</p>
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

        <div className="teaser-modal-actions">
          <Link href="/about" className="teaser-modal-primary" onClick={close}>
            <Play size={16} />
            티저영상 보기
          </Link>
          <button type="button" className="teaser-modal-secondary" onClick={closeForever}>
            다시 보지 않기
          </button>
        </div>
      </section>
    </div>
  );
}
