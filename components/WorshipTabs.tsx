"use client";

import { useState } from "react";
import Icon from "./Icon";

const TABS = [
  {
    name: "주일예배",
    desc: "온 가족이 함께 드리는 한 주의 첫 예배",
    times: ["1부 오전 7:00", "2부 오전 9:00", "3부 오전 11:00", "4부 오후 2:00"],
    place: "대예배당",
  },
  {
    name: "수요예배",
    desc: "말씀과 기도로 한 주의 중심을 잡는 시간",
    times: ["수요일 오후 7:30"],
    place: "대예배당",
  },
  {
    name: "금요기도폭풍",
    desc: "찬양과 뜨거운 기도로 드리는 집회",
    times: ["금요일 오후 9:00"],
    place: "비전홀",
  },
  {
    name: "새벽기도회",
    desc: "하루를 여는 고요한 기도의 시간",
    times: ["월–토 오전 5:30"],
    place: "소예배당",
  },
];

export default function WorshipTabs() {
  const [i, setI] = useState(0);
  const t = TABS[i];

  return (
    <div className="flex h-full flex-col rounded-[28px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <div role="tablist" className="relative flex gap-1 rounded-full bg-muted p-1">
        {TABS.map((tab, idx) => (
          <button
            key={tab.name}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setI(idx)}
            className={`relative z-10 flex-1 rounded-full px-2 py-2.5 text-xs font-medium transition-colors sm:text-sm ${
              idx === i ? "text-white" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {tab.name}
          </button>
        ))}
        <span
          aria-hidden
          className="absolute bottom-1 left-1 top-1 rounded-full bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: "calc((100% - 0.5rem) / 4)", transform: `translateX(${i * 100}%)` }}
        />
      </div>

      <div key={i} className="animate-pop mt-8 flex-1">
        <h3 className="text-3xl font-bold text-brand-dark">{t.name}</h3>
        <p className="mt-2 text-foreground/60">{t.desc}</p>
        <ul className="mt-6 space-y-3">
          {t.times.map((time) => (
            <li key={time} className="flex items-center gap-3 rounded-2xl bg-muted px-5 py-4">
              <Icon name="clock" size={18} className="text-accent" />
              <span className="font-medium">{time}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex items-center gap-2 text-sm text-foreground/60">
          <Icon name="pin" size={16} /> {t.place}
        </p>
      </div>
    </div>
  );
}
