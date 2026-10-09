"use client";

import { useLocalMoney } from "@/lib/localMoney";

/**
 * Static mock screens for the features timeline, drawn in code in the app's
 * dark + lime style (no real user data, always matches the current app).
 */

/**
 * Real app screenshots, if present. Drop a portrait PNG (e.g. 1290×2796 from the
 * simulator) into public/screens/ and set its path here; the mock is used otherwise.
 */
export const SCREENSHOTS: Partial<Record<"today" | "logging" | "forecast" | "habit", string>> = {
  today: "/screens/today.png",
  logging: "/screens/logging.png",
  forecast: "/screens/forecast.png",
  habit: "/screens/habit.png",
};

function Phone({ children, tilt = 0, screenshot, alt = "" }: { children: React.ReactNode; tilt?: number; screenshot?: string; alt?: string }) {
  return (
    <div
      className="relative w-[250px] md:w-[270px] h-[520px] md:h-[550px] rounded-[44px] bg-surface-inverse p-[9px] ring-1 ring-edge shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]"
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden={screenshot ? undefined : true}
    >
      {screenshot ? (
        <img
          src={screenshot}
          alt={alt}
          loading="lazy"
          className="h-full w-full rounded-[35px] object-cover object-top bg-[#0D0D0D]"
        />
      ) : (
        <div className="relative h-full w-full rounded-[35px] bg-[#0D0D0D] overflow-hidden text-white px-4 pt-11 pb-4 flex flex-col">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black" />
          {children}
        </div>
      )}
    </div>
  );
}

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[7px] font-bold tracking-[2px] text-white/40 uppercase">{children}</p>
);
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl bg-white/[0.06] border border-white/10 p-3.5 ${className}`}>{children}</div>
);

export function TodayMock() {
  const { fmt } = useLocalMoney();
  const cats = [
    { name: "Food", pct: 72 },
    { name: "Transport", pct: 45 },
    { name: "Shopping", pct: 28 },
  ];
  return (
    <Phone tilt={3} screenshot={SCREENSHOTS.today} alt="Equilibrium dashboard: what's left this month">
      <p className="font-mono text-[7px] font-bold tracking-[2px] text-brand-lime">[ EVENING SUMMARY ]</p>
      <p className="font-serif text-xl mt-1 mb-4">Hello, Priya</p>
      <Card>
        <Kicker>Left this month</Kicker>
        <p className="font-serif text-3xl mt-1">{fmt(12480)}</p>
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[64%] rounded-full bg-brand-lime" />
        </div>
        <p className="mt-2 text-[9px] text-white/45">
          {fmt(22520)} spent · 12 days left
        </p>
      </Card>
      <Card className="mt-3 border-brand-lime/30 bg-brand-lime/[0.07]">
        <Kicker>You can spend today</Kicker>
        <p className="font-serif text-4xl mt-1 text-brand-lime">{fmt(840)}</p>
        <p className="mt-1 text-[9px] text-white/50">Stay under this and you finish on budget.</p>
      </Card>
      <Card className="mt-3">
        <Kicker>Categories</Kicker>
        <div className="mt-2 space-y-2">
          {cats.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-[10px]">
                <span>{c.name}</span>
                <span className="text-white/45">{c.pct}%</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-brand-lime/70" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Phone>
  );
}

export function LoggingMock() {
  const { fmt, amt } = useLocalMoney();
  const rows = [
    { icon: "fa-cart-shopping", name: "Groceries", meta: "Food · just now", amount: 250, tag: "NEW", tone: "lime" },
    { icon: "fa-mug-hot", name: "Coffee", meta: "Food", amount: 40, tag: "YESTERDAY", tone: "muted" },
    { icon: "fa-shoe-prints", name: "Sneakers", meta: "Shopping", amount: 1200, tag: "GUILTY", tone: "warn" },
  ];
  return (
    <Phone tilt={-3} screenshot={SCREENSHOTS.logging} alt="Equilibrium Log Expense screen">
      <p className="text-center font-mono text-[7px] font-bold tracking-[3px] text-brand-lime">NEW ENTRY</p>
      <p className="text-center font-serif text-base">Log Expense</p>
      <p className="mt-3 text-center font-serif text-xl leading-tight">
        What did you <i className="text-brand-lime">spend</i>?
      </p>
      <div className="mt-5 mb-2">
        <Kicker>Recently logged</Kicker>
      </div>
      <Card className="py-1">
        {rows.map((r, i) => (
          <div key={r.name} className={`flex items-center py-2.5 ${i < rows.length - 1 ? "border-b border-white/5" : ""}`}>
            <span className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center mr-2.5">
              <i className={`fa-solid ${r.icon} text-[10px] text-brand-lime`} />
            </span>
            <span className="flex-1">
              <span className="block text-[12px] font-bold">{r.name}</span>
              <span className="block text-[9px] text-white/45">{r.meta}</span>
            </span>
            <span className="text-right">
              <span className="block font-serif text-[13px]">{fmt(r.amount)}</span>
              <span
                className={`inline-block mt-0.5 rounded-full px-1.5 font-mono text-[6.5px] font-bold tracking-wider ${
                  r.tone === "lime"
                    ? "bg-brand-lime/15 text-brand-lime"
                    : r.tone === "warn"
                      ? "bg-orange-400/15 text-orange-300"
                      : "bg-white/10 text-white/60"
                }`}
              >
                {r.tag}
              </span>
            </span>
          </div>
        ))}
      </Card>
      <div className="mt-auto flex items-center rounded-full bg-white/[0.06] border border-brand-lime/40 pl-3.5 pr-1.5 py-1.5">
        <span className="flex-1 text-[10.5px] truncate">
          {amt(1200)} sneakers, guilty
        </span>
        <span className="h-7 w-7 rounded-full bg-brand-lime text-black flex items-center justify-center">
          <i className="fa-solid fa-arrow-up text-[10px]" />
        </span>
      </div>
    </Phone>
  );
}

export function ForecastMock() {
  const { fmt } = useLocalMoney();
  // simple cumulative curve: actual to day 18, projected to day 30, budget line on top
  const W = 210;
  const H = 110;
  const x = (d: number) => (d / 30) * W;
  const y = (v: number) => H - (v / 36000) * H;
  const actual = [0, 2500, 4200, 15800, 17200, 18900, 20400, 22520].map((v, i, a) => [x((i / (a.length - 1)) * 18), y(v)]);
  const proj = [
    [x(18), y(22520)],
    [x(24), y(27800)],
    [x(30), y(33400)],
  ];
  const path = (pts: number[][]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  return (
    <Phone tilt={3} screenshot={SCREENSHOTS.forecast} alt="Equilibrium spending forecast with upcoming bills">
      <div className="flex items-center justify-between">
        <p className="font-serif text-lg">Spending Forecast</p>
        <span className="rounded-full bg-brand-lime/15 px-2 py-1 font-mono text-[7px] font-bold tracking-widest text-brand-lime">
          ON TRACK
        </span>
      </div>
      <Card className="mt-3">
        <svg viewBox={`0 0 ${W} ${H + 6}`} className="w-full h-auto">
          <line x1="0" x2={W} y1={y(35000)} y2={y(35000)} stroke="rgba(255,255,255,0.35)" strokeDasharray="3 3" strokeWidth="1" />
          <text x={W} y={y(35000) - 4} textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.5)">
            Budget
          </text>
          <path d={path(actual)} fill="none" stroke="#CCFF00" strokeWidth="2.2" strokeLinejoin="round" />
          <path d={path(proj)} fill="none" stroke="#CCFF00" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx={x(18)} cy={y(22520)} r="3" fill="#CCFF00" />
        </svg>
        <p className="mt-2 text-[10px] text-white/60">
          Heading for <span className="text-white font-bold">{fmt(33400)}</span> of {fmt(35000)}
        </p>
      </Card>
      <div className="mt-4 mb-2">
        <Kicker>Upcoming bills · set aside</Kicker>
      </div>
      <Card className="py-1">
        {[
          { name: "Rent", when: "Usually around the 1st", amount: 15000, icon: "fa-house" },
          { name: "Internet", when: "Usually around the 12th", amount: 800, icon: "fa-wifi" },
        ].map((b, i) => (
          <div key={b.name} className={`flex items-center py-2.5 ${i === 0 ? "border-b border-white/5" : ""}`}>
            <span className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center mr-2.5">
              <i className={`fa-solid ${b.icon} text-[10px] text-brand-lime`} />
            </span>
            <span className="flex-1">
              <span className="block text-[12px] font-bold">{b.name}</span>
              <span className="block text-[9px] text-white/45">{b.when}</span>
            </span>
            <span className="font-serif text-[13px]">{fmt(b.amount)}</span>
          </div>
        ))}
      </Card>
      <Card className="mt-3 border-brand-lime/30 bg-brand-lime/[0.07]">
        <Kicker>Daily allowance after bills</Kicker>
        <p className="font-serif text-3xl mt-1 text-brand-lime">{fmt(1060)}</p>
        <p className="mt-1 text-[9px] text-white/50">Rent is already set aside, so this is truly yours to spend.</p>
      </Card>
    </Phone>
  );
}

export function HabitMock() {
  // October: which days were logged, and how heavy (0 = none, 1..3 = light..heavy)
  const days = [1, 2, 1, 3, 1, 0, 1, 2, 1, 1, 2, 3, 1, 1, 0, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1, 1, 2, 1, 1, 1, 1];
  const shade = (v: number) =>
    v === 0 ? "bg-white/10" : v === 1 ? "bg-brand-lime" : v === 2 ? "bg-brand-lime/60" : "bg-brand-lime/30";
  // Oct 1 2026 is a Thursday → 3 blanks in a Monday-first grid
  return (
    <Phone tilt={-3} screenshot={SCREENSHOTS.habit} alt="Equilibrium streak and daily spending calendar">
      <Card>
        <div className="flex items-center justify-between">
          <span className="font-serif text-[15px]">🔥 12-day streak</span>
          <span className="rounded-full bg-brand-lime/15 px-2 py-1 font-mono text-[7px] font-bold tracking-widest text-brand-lime">
            ✓ TODAY
          </span>
        </div>
        <p className="mt-1 text-[9px] text-white/50">Today&apos;s done. See you tomorrow.</p>
      </Card>
      <Card className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <Kicker>Daily · October</Kicker>
          <span className="text-[8px] text-white/40">light → heavy</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="text-center font-mono text-[7px] text-white/35">
              {d}
            </span>
          ))}
          {[0, 1, 2].map((b) => (
            <span key={`b${b}`} />
          ))}
          {days.map((v, i) => (
            <span
              key={i}
              className={`aspect-square rounded-full flex items-center justify-center text-[7px] ${shade(v)} ${
                v === 1 ? "text-black" : "text-white/70"
              }`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </Card>
      <Card className="mt-3 border-brand-lime/30 bg-brand-lime/[0.07]">
        <p className="text-[11px]">
          <span className="text-brand-lime">✦</span> Your <b>September Money Story</b> is ready
        </p>
        <p className="mt-1 text-[9px] text-white/50">Your wins, your leaks, and one focus for October.</p>
      </Card>
    </Phone>
  );
}
