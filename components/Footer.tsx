import { NAV } from "./nav";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="text-4xl font-bold tracking-tight text-white">
              church<span className="text-accent">19</span>
            </p>
            <p className="mt-4 text-sm leading-7">
              (우) 00000 대한민국 어느 도시 샘플로 12길 19
              <br />
              TEL : 000-000-0000 &nbsp; FAX : 000-000-0001
              <br />
              E-mail : hello@church19.example
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {NAV.slice(0, 4).map((n) => (
              <div key={n.label}>
                <p className="mb-3 text-sm font-medium text-white">{n.label}</p>
                <ul className="space-y-1.5 text-sm">
                  {n.items.slice(0, 4).map((i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-white">
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-xs">
          Copyright © 2026 church19. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
