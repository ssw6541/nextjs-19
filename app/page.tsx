import Image from "next/image";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import WorshipTabs from "@/components/WorshipTabs";
import Icon from "@/components/Icon";

const QUICK = [
  { label: "유튜브", icon: "play" },
  { label: "온라인헌금", icon: "heart" },
  { label: "성경프로그램", icon: "book" },
  { label: "온라인신청", icon: "clipboard" },
  { label: "주보", icon: "file" },
  { label: "공지사항", icon: "bell" },
];

const STATS = [
  { to: 1985, label: "설립", suffix: "년" },
  { to: 12, label: "사역 부서", suffix: "개" },
  { to: 48, label: "소그룹(교구)", suffix: "개" },
  { to: 5, label: "주일 예배", suffix: "회" },
];

const MINISTRY = [
  { title: "교회소개", sub: "ABOUT", desc: "비전과 걸어온 길, 섬기는 분들", img: "/images/hero/slide-1.jpg", span: "lg:col-span-2 lg:row-span-2" },
  { title: "교육·훈련", sub: "EDUCATION", desc: "교회학교부터 장년 훈련까지", img: "/images/home/study.jpg", span: "" },
  { title: "선교", sub: "MISSION", desc: "지역과 열방을 섬깁니다", img: "/images/hero/slide-4.jpg", span: "" },
  { title: "말씀", sub: "WORD", desc: "성경과 설교, 묵상 자료", img: "/images/home/bible.jpg", span: "lg:col-span-2" },
];

const MEDIA = [
  { en: "Church TV", ko: "church19 TV", tone: "from-[#2c4a7c] to-[#101c33]" },
  { en: "Life Story", ko: "사역 스토리", tone: "from-[#c98a2b] to-[#5a3a0c]" },
  { en: "Bible", ko: "성경", tone: "from-[#2f6b5a] to-[#10302a]" },
  { en: "Praise", ko: "경배와 찬양", tone: "from-[#8a3d63] to-[#3a1428]" },
  { en: "Kids", ko: "다음세대", tone: "from-[#3e7cc9] to-[#142e55]" },
];

const STORIES = [
  { date: "2026.11.15", tag: "예배", title: "감사의 눈으로 바라보는 삶, 추수감사주일", body: "한 해 동안 인도하신 하나님께 온 성도가 함께 감사의 예배를 드렸습니다." },
  { date: "2026.11.14", tag: "교구", title: "몸과 마음으로 하나 되는 기쁨, 순장 소풍", body: "200여 명의 순장이 함께 예배하고 레크리에이션으로 하나 되었습니다." },
  { date: "2026.10.31", tag: "섬김", title: "기독교 상담의 사명을 나누는 만남", body: "지역 교회와 상담센터가 모여 기독교 상담의 방향을 함께 나누었습니다." },
];

const NOTICES = [
  { date: "10.16", title: "2026 굿윌스토어 행사 안내" },
  { date: "10.16", title: "사랑의 음악회" },
  { date: "10.14", title: "제2회 마을 페스티벌 부스 배치도 및 당일 안내" },
  { date: "10.02", title: "새가족 환영회 안내" },
];

function SectionTitle({ en, ko, desc, light = false }: { en: string; ko: string; desc?: string; light?: boolean }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-accent">
        <span className="h-px w-8 bg-accent" />
        {en}
      </p>
      <h2 className={`text-3xl font-bold leading-tight tracking-tight sm:text-5xl ${light ? "text-white" : "text-brand-dark"}`}>{ko}</h2>
      {desc && <p className={`mt-4 text-lg ${light ? "text-white/65" : "text-foreground/60"}`}>{desc}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />

      {/* 퀵메뉴 : 히어로 위에 떠 있는 유리 바 */}
      <section id="content" className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:-mt-16">
        <Reveal>
          <div className="grid grid-cols-3 gap-1 rounded-[28px] border border-white/60 bg-white/90 p-2 shadow-[0_20px_60px_rgba(12,21,38,0.18)] backdrop-blur-xl sm:grid-cols-6">
            {QUICK.map((q) => (
              <a
                key={q.label}
                href="#"
                className="group flex flex-col items-center gap-2.5 rounded-2xl px-2 py-5 text-sm font-medium transition hover:bg-brand hover:text-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-brand transition group-hover:-translate-y-1 group-hover:rotate-6 group-hover:bg-accent group-hover:text-brand-dark">
                  <Icon name={q.icon} />
                </span>
                {q.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 말씀 / 예배 */}
      <section className="mx-auto max-w-7xl px-5 py-28">
        <Reveal>
          <SectionTitle en="WORSHIP" ko="이번 주, 함께 예배해요" desc="말씀을 다시 듣고, 예배 시간을 한눈에 확인하세요." />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <TiltCard max={3} className="group relative flex min-h-[420px] overflow-hidden rounded-[28px] bg-brand-dark text-white">
              <Image
                src="/images/home/study.jpg"
                alt=""
                fill
                sizes="(min-width:1024px) 55vw, 100vw"
                className="object-cover opacity-70 transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/10" />
              <div className="relative mt-auto w-full p-8 sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs tracking-widest backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-[pulse-ring_1.6s_ease-out_infinite] rounded-full bg-accent" />
                    <span className="relative h-2 w-2 rounded-full bg-accent" />
                  </span>
                  SUNDAY SERMON
                </span>
                <h3 className="mt-4 text-3xl font-bold sm:text-4xl">합리주의의 함정</h3>
                <p className="mt-2 text-white/70">담임목사 · 2026.11.22</p>
                <button className="group/btn mt-7 inline-flex items-center gap-3 rounded-full bg-accent py-2.5 pl-6 pr-2.5 text-sm font-bold text-brand-dark">
                  설교 듣기
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark text-white transition-transform group-hover/btn:scale-110">
                    <Icon name="play" size={18} />
                  </span>
                </button>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal delay={120}>
            <WorshipTabs />
          </Reveal>
        </div>
      </section>

      {/* 숫자로 보는 church19 */}
      <section className="relative overflow-hidden bg-brand-dark py-24 text-white">
        <div className="animate-float absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="animate-float absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[#3e7cc9]/25 blur-3xl [animation-delay:-6s]" />
        <div className="relative mx-auto max-w-7xl px-5">
          <Reveal>
            <SectionTitle light en="church19 IN NUMBERS" ko="함께 걸어온 시간과 공동체" />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10">
                  <p className="text-4xl font-bold text-accent sm:text-6xl">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 text-white/65">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 사역 안내 : 벤토 그리드 */}
      <section className="mx-auto max-w-7xl px-5 py-28">
        <Reveal>
          <SectionTitle en="MINISTRY" ko="사람을 살리고, 키우고, 세우는 공동체" desc="궁금한 사역을 눌러 자세히 살펴보세요." />
        </Reveal>
        <div className="grid auto-rows-[240px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MINISTRY.map((m, i) => (
            <Reveal key={m.title} delay={i * 90} className={`${m.span} h-full`}>
              <TiltCard className="group h-full overflow-hidden rounded-[28px] bg-brand-dark text-white">
                <a href="#" className="block h-full">
                  <Image
                    src={m.img}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="rounded-[28px] object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
                    <div>
                      <p className="text-[11px] tracking-[0.3em] text-accent">{m.sub}</p>
                      <h3 className="mt-1 text-2xl font-bold">{m.title}</h3>
                      <p className="mt-1 max-w-[16rem] text-sm text-white/70 opacity-0 transition duration-500 group-hover:opacity-100">
                        {m.desc}
                      </p>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 -rotate-45 items-center justify-center rounded-full bg-white text-brand-dark transition duration-500 group-hover:rotate-0 group-hover:bg-accent">
                      <Icon name="arrow" size={20} />
                    </span>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 미디어 : 가로 스크롤 */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <SectionTitle en="MEDIA" ko="언제 어디서나 만나요" />
          </Reveal>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] [&::-webkit-scrollbar]:hidden">
          {MEDIA.map((m) => (
            <a
              key={m.en}
              href="#"
              className={`group relative flex aspect-[4/5] w-64 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[28px] bg-gradient-to-br ${m.tone} p-6 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:w-72`}
            >
              <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur transition group-hover:scale-125 group-hover:bg-white group-hover:text-brand-dark">
                <Icon name="play" size={20} />
              </span>
              <span className="text-xs tracking-widest text-white/70">{m.en}</span>
              <span className="mt-1 text-2xl font-bold">{m.ko}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 스토리 + 공지 */}
      <section className="mx-auto max-w-7xl px-5 py-28">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <Reveal>
              <SectionTitle en="STORY" ko="사역 스토리" />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-3">
              {STORIES.map((s, i) => (
                <Reveal key={s.title} delay={i * 100}>
                  <article className="group h-full cursor-pointer rounded-[28px] border border-black/5 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_24px_60px_rgba(12,21,38,0.14)]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-brand">{s.tag}</span>
                      <span className="text-foreground/40">{s.date}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold leading-snug transition-colors group-hover:text-brand">{s.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground/60">{s.body}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand">
                      자세히 보기
                      <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1.5" />
                    </span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <SectionTitle en="NOTICE" ko="공지사항" />
            </Reveal>
            <Reveal delay={100}>
              <ul className="rounded-[28px] border border-black/5 bg-white p-2">
                {NOTICES.map((n) => (
                  <li key={n.title}>
                    <a href="#" className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition hover:bg-muted">
                      <span className="w-12 shrink-0 text-sm font-bold tabular-nums text-accent">{n.date}</span>
                      <span className="flex-1 text-sm font-medium leading-snug">{n.title}</span>
                      <Icon name="arrow" size={16} className="-translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 마퀴 */}
      <section aria-hidden className="overflow-hidden border-y border-black/10 bg-white py-8">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-6xl font-bold uppercase tracking-tight text-brand sm:text-8xl">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12">
              {["Welcome Home", "Worship", "Community", "Mission", "Hope"].map((w, i) => (
                <span key={w} className={i % 2 ? "text-outline" : ""}>
                  {w} <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-24">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-brand p-10 text-white sm:p-16">
            <div className="animate-float absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs tracking-[0.3em] text-accent">JOIN US</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
                church19의
                <br />
                새 가족이 되어주세요
              </h2>
              <p className="mt-5 text-lg text-white/70">회원가입 후 프로필을 만들고 교회 소식과 신청 서비스를 이용해 보세요.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/signup" className="group inline-flex items-center gap-3 rounded-full bg-accent py-3 pl-7 pr-3 font-bold text-brand-dark">
                  회원가입
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark text-white transition-transform group-hover:translate-x-1">
                    <Icon name="arrow" size={16} />
                  </span>
                </a>
                <a href="#" className="rounded-full border border-white/30 px-7 py-3 font-medium transition hover:bg-white hover:text-brand-dark">
                  예배 안내
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
