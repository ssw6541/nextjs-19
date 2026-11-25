"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { NAV } from "./nav";

export default function Header({ userSlot }: { userSlot: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 홈 상단(히어로 위)에서는 투명한 유리, 그 외에는 불투명한 유리
  const onHero = pathname === "/" && !scrolled && !open && !hovered;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5" onMouseLeave={() => setHovered(false)}>
      <div
        className={`mx-auto max-w-7xl rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
          onHero
            ? "border-white/20 bg-white/10 text-white"
            : "border-black/5 bg-white/85 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 lg:h-[68px]">
          <Link href="/" className="group flex items-baseline gap-1" aria-label="church19 홈">
            <span className="text-xl font-bold tracking-tight">church</span>
            <span className="rounded-md bg-accent px-1.5 text-xl font-bold leading-snug text-brand-dark transition-transform group-hover:-rotate-6">
              19
            </span>
          </Link>

          <nav className="hidden h-full lg:block" onMouseEnter={() => setHovered(true)}>
            <ul className="flex h-full items-center">
              {NAV.map((n) => (
                <li key={n.label} className="group relative h-full">
                  <a href="#" className="relative flex h-full items-center px-3.5 text-[15px] font-medium xl:px-4">
                    {n.label}
                    <span className="absolute inset-x-3.5 bottom-3 h-0.5 origin-left scale-x-0 rounded bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                  <ul className="invisible absolute left-1/2 top-[calc(100%+0.5rem)] w-48 -translate-x-1/2 translate-y-2 rounded-2xl border border-black/5 bg-white p-2 text-foreground opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {n.items.map((i) => (
                      <li key={i}>
                        <a href="#" className="block rounded-xl px-4 py-2.5 text-sm transition hover:bg-muted hover:text-brand hover:pl-5">
                          {i}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">{userSlot}</div>
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
              aria-label="전체 메뉴"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`h-0.5 w-6 rounded bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 rounded bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 rounded bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="animate-pop max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-black/5 px-5 pb-6 pt-4 text-foreground lg:hidden">
            <div className="mb-4 flex">{userSlot}</div>
            {NAV.map((n) => (
              <details key={n.label} className="border-b border-black/5 py-3">
                <summary className="cursor-pointer text-base font-medium">{n.label}</summary>
                <ul className="mt-2 grid grid-cols-2 gap-1 pl-2">
                  {n.items.map((i) => (
                    <li key={i}>
                      <a href="#" className="block py-1.5 text-sm text-foreground/70">
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
