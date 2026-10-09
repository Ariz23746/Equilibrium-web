"use client";

import { useSyncExternalStore } from "react";

/**
 * Light/dark switch. Until the visitor clicks, the site follows their system setting.
 * A click flips whatever they're currently seeing and remembers it (localStorage +
 * <html data-theme>). The inline script in app/layout.tsx applies it before first paint.
 */

const KEY = "eq-theme";
const MQ = "(prefers-color-scheme: dark)";

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
};

/** What the visitor is seeing right now */
const isDarkNow = () => {
  const forced = document.documentElement.getAttribute("data-theme");
  if (forced === "dark") return true;
  if (forced === "light") return false;
  return window.matchMedia(MQ).matches;
};

function setTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // storage blocked (private mode): the choice just won't be remembered
  }
  listeners.forEach((l) => l());
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDarkNow, () => false);
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-text-secondary hover:text-text-primary shadow-sm transition-colors cursor-pointer ${className}`}
    >
      <i className={`fa-solid ${dark ? "fa-sun" : "fa-moon"} text-[14px]`} aria-hidden="true"></i>
    </button>
  );
}
