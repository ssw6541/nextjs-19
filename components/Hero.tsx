"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Icon from "./Icon";

const SLIDES = [
  {
    src: "/images/hero/slide-1.jpg",
    eyebrow: "WELCOME TO church19",
    title: "당신을 환영합니다",
    desc: "하나님의 사랑 안에서 함께 예배하고 서로 돌보는 공동체",
    cta: "예배 안내",
  },
  {
    src: "/images/hero/slide-2.jpg",
    eyebrow: "WORSHIP",
    title: "함께 모여\n예배하는 기쁨",
    desc: "주일예배 · 수요예배 · 금요기도폭풍집회 · 새벽기도회",
    cta: "예배 시간 보기",
  },
  {
    src: "/images/hero/slide-3.jpg",
    eyebrow: "WORD OF LIFE",
    title: "말씀으로 세워지는\n삶의 변화",
    desc: "성경 안에서 길을 찾고 제자로 자라가는 훈련",
    cta: "교육·훈련 보기",
  },
  {
    src: "/images/hero/slide-4.jpg",
    eyebrow: "MISSION & HOPE",
    title: "세상 속으로\n소망을 전하다",
    desc: "지역과 열방을 섬기며 복음을 나누는 선교 공동체",
    cta: "선교 소식",
  },
];

const DELAY = 6500;

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 }, [
    Autoplay({ delay: DELAY, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative h-svh min-h-[600px] w-full overflow-hidden bg-brand-dark"
      aria-roledescription="carousel"
      aria-label="church19 메인 슬라이드"
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.src}
                className="relative h-full min-w-0 flex-[0_0_100%]"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${SLIDES.length}`}
              >
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                  style={active ? { animation: `kenburns ${DELAY + 2000}ms ease-out forwards` } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/30" />

                <div className="absolute inset-0 flex items-center">
                  <div className="mx-auto w-full max-w-7xl px-6 pt-10">
                    {/* active 가 바뀔 때마다 key 로 애니메이션을 다시 재생 */}
                    <div key={active ? `on-${index}` : `off-${i}`} className={active ? "" : "opacity-0"}>
                      <p
                        className={`mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-[0.25em] text-accent backdrop-blur ${active ? "fade-up" : ""}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {s.eyebrow}
                      </p>
                      <h1
                        className={`whitespace-pre-line text-[2.6rem] font-bold leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-8xl ${active ? "fade-up" : ""}`}
                        style={{ animationDelay: "120ms" }}
                      >
                        {s.title}
                      </h1>
                      <p
                        className={`mt-6 max-w-xl text-base text-white/80 sm:text-lg ${active ? "fade-up" : ""}`}
                        style={{ animationDelay: "260ms" }}
                      >
                        {s.desc}
                      </p>
                      <a
                        href="#"
                        className={`group mt-9 inline-flex items-center gap-3 rounded-full bg-accent py-3 pl-7 pr-3 text-sm font-bold text-brand-dark transition hover:brightness-110 ${active ? "fade-up" : ""}`}
                        style={{ animationDelay: "400ms" }}
                      >
                        {s.cta}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark text-white transition-transform group-hover:translate-x-1">
                          <Icon name="arrow" size={16} />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-24 sm:pb-28">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="pointer-events-auto flex items-center gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`${i + 1}번 슬라이드로 이동`}
                aria-current={i === index}
                onClick={() => emblaApi?.scrollTo(i)}
                className="relative h-1 w-10 overflow-hidden rounded bg-white/30 transition-[width] hover:bg-white/50 sm:w-16"
              >
                {i === index && (
                  <span
                    key={index}
                    className="absolute inset-0 origin-left bg-white"
                    style={{ animation: `progress ${DELAY}ms linear forwards` }}
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-white" />}
              </button>
            ))}
            <span className="ml-2 text-sm tabular-nums text-white/80">
              {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>
          <div className="pointer-events-auto hidden gap-2 sm:flex">
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                aria-label={dir === "prev" ? "이전 슬라이드" : "다음 슬라이드"}
                onClick={() => (dir === "prev" ? emblaApi?.scrollPrev() : emblaApi?.scrollNext())}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-brand-dark"
              >
                <Icon name="arrow" size={18} className={dir === "prev" ? "rotate-180" : ""} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 스크롤 안내 */}
      <a
        href="#content"
        aria-label="아래로 스크롤"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] tracking-[0.3em] text-white/70 sm:flex"
      >
        SCROLL
        <Icon name="down" size={18} className="animate-[bounce-y_1.6s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
