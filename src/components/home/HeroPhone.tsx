"use client";

import { useEffect, useState } from "react";
import { useLocalMoney } from "@/lib/localMoney";

/**
 * Animated hero: a phone in the app's dark + lime look that types "120 petrol, 60 lunch",
 * logs both, and updates "Left today". Loops. Shows the finished state if the visitor
 * prefers reduced motion.
 */

// Amounts are written in rupees and shown in the visitor's currency (see lib/localMoney)
const START_LEFT = 1020;

type Phase = "idle" | "typing" | "sending" | "logged";


const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function HeroPhone() {
  const { amt, fmt, region } = useLocalMoney();
  const TEXT = `${amt(120)} ${region.fuel}, ${amt(60)} lunch`;
  const BASE_ROWS = [{ icon: "fa-mug-hot", name: "Coffee", meta: "Food · 9:10 AM", amount: 40 }];
  const NEW_ROWS = [
    { icon: "fa-gas-pump", name: cap(region.fuel), meta: "Transport · just now", amount: 120 },
    { icon: "fa-utensils", name: "Lunch", meta: "Food · just now", amount: 60 },
  ];
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  // 0 → 1 while "Left today" counts down after logging
  const [progress, setProgress] = useState(0);
  const leftStart = amt(START_LEFT);
  const leftEnd = leftStart - amt(120) - amt(60);
  const leftNow = Math.round(leftStart - (leftStart - leftEnd) * progress);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // No animation: show the finished state
      timers.push(
        setTimeout(() => {
          setPhase("logged");
          setProgress(1);
        }, 0),
      );
      return () => timers.forEach(clearTimeout);
    }

    const run = async () => {
      while (!cancelled) {
        setPhase("idle");
        setTyped("");
        setProgress(0);
        await wait(1100);
        setPhase("typing");
        for (let i = 1; i <= TEXT.length && !cancelled; i++) {
          setTyped(TEXT.slice(0, i));
          await wait(i === 4 || i === 12 ? 220 : 65);
        }
        await wait(450);
        setPhase("sending");
        await wait(800);
        setTyped("");
        setPhase("logged");
        // count "Left today" down
        for (let s = 1; s <= 12 && !cancelled; s++) {
          setProgress(s / 12);
          await wait(35);
        }
        await wait(3600);
      }
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [TEXT]);

  const logged = phase === "logged";
  const rows = logged ? [...NEW_ROWS, ...BASE_ROWS] : BASE_ROWS;

  return (
    <div className="relative w-full max-w-[460px] h-[600px] md:h-[620px] flex items-center justify-center select-none" aria-hidden="true">
      {/* soft lime glow behind the phone (radial gradient: no hard edges when the hero clips it) */}
      <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(204,255,0,0.22),transparent)]" />

      {/* Phone */}
      <div className="relative w-[275px] md:w-[285px] h-[560px] md:h-[580px] rounded-[48px] bg-surface-inverse p-[10px] ring-1 ring-edge shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] rotate-[-4deg]">
        <div className="relative h-full w-full rounded-[38px] bg-[#0D0D0D] overflow-hidden text-white px-5 pt-12 pb-5 flex flex-col">
          {/* notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black" />

          <p className="text-center font-mono text-[8px] font-bold tracking-[3px] text-brand-lime">NEW ENTRY</p>
          <p className="text-center font-serif text-lg">Log Expense</p>

          <p className="mt-4 text-center font-serif text-[22px] leading-tight">
            What did you <i className="text-brand-lime">spend</i>?
          </p>

          {/* streak */}
          <div className="mt-4 rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[15px]">🔥 {logged ? 5 : 4}-day streak</span>
              <span
                className={`font-mono text-[8px] font-bold tracking-widest rounded-full px-2 py-1 transition-all duration-500 ${
                  logged ? "bg-brand-lime/15 text-brand-lime" : "bg-white/5 text-white/30"
                }`}
              >
                ✓ TODAY
              </span>
            </div>
            <div className="mt-3 flex justify-between">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
                const done = i < 4 || (i === 4 && logged);
                const today = i === 4 && !logged;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span
                      className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] transition-all duration-500 ${
                        done
                          ? "bg-brand-lime text-black"
                          : today
                            ? "border-2 border-brand-lime animate-pulse"
                            : "bg-white/10"
                      }`}
                    >
                      {done ? "✓" : ""}
                    </span>
                    <span className={`font-mono text-[7px] ${i === 4 ? "text-brand-lime" : "text-white/40"}`}>{d}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* today list */}
          <p className="mt-4 mb-2 font-mono text-[7px] font-bold tracking-[2px] text-white/40">TODAY</p>
          <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-3">
            {rows.map((r, i) => {
              const isNew = logged && i < NEW_ROWS.length;
              return (
                <div
                  key={r.name}
                  className={`flex items-center py-2.5 ${i < rows.length - 1 ? "border-b border-white/5" : ""} ${
                    isNew ? "animate-[heroRowIn_0.45s_ease-out_both]" : ""
                  }`}
                  style={isNew ? { animationDelay: `${i * 120}ms` } : undefined}
                >
                  <span className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center mr-2.5">
                    <i className={`fa-solid ${r.icon} text-[10px] text-brand-lime`} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[12px] font-bold">{r.name}</span>
                    <span className="block text-[9px] text-white/45">{r.meta}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-serif text-[14px]">{fmt(r.amount)}</span>
                    {isNew && (
                      <span className="inline-block mt-0.5 rounded-full bg-brand-lime/15 px-1.5 font-mono text-[7px] font-bold tracking-wider text-brand-lime">
                        NEW
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* composer */}
          <div className="mt-auto">
            <div
              className={`flex items-center rounded-full bg-white/[0.06] border pl-4 pr-1.5 py-1.5 transition-colors ${
                phase === "typing" || phase === "sending" ? "border-brand-lime/50" : "border-white/10"
              }`}
            >
              <span className={`flex-1 text-[12px] truncate ${typed ? "text-white" : "text-white/35"}`}>
                {typed || (phase === "sending" ? "" : "Type or tap the mic…")}
                {phase === "typing" && <span className="inline-block w-[1.5px] h-3.5 bg-brand-lime align-middle ml-0.5 animate-pulse" />}
                {phase === "sending" && <span className="text-white/60">Logging…</span>}
              </span>
              <span
                className={`h-8 w-8 rounded-full bg-brand-lime text-black flex items-center justify-center ${
                  phase === "sending" ? "animate-pulse" : ""
                }`}
              >
                <i className={`fa-solid ${typed ? "fa-arrow-up" : "fa-microphone"} text-[11px]`} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating card: left today */}
      <div className="absolute right-0 top-16 rounded-2xl bg-bg-card border border-border-subtle shadow-bento px-4 py-3 rotate-[3deg]">
        <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-text-secondary">Left today</p>
        <p className="font-serif text-2xl text-text-primary tabular-nums">{region.symbol}{leftNow.toLocaleString(region.locale)}</p>
      </div>

      {/* Floating card: logged confirmation */}
      <div
        className={`absolute left-0 bottom-28 rounded-2xl bg-surface-inverse text-white px-4 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/10 rotate-[-3deg] transition-all duration-500 ${
          logged ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <p className="text-[13px]">
          <span className="text-brand-lime">✓</span> 2 expenses logged
        </p>
        <p className="font-mono text-[9px] tracking-widest text-white/50 mt-0.5 uppercase">{region.fuel} · lunch</p>
      </div>
    </div>
  );
}
