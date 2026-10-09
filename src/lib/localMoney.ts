"use client";

import { useSyncExternalStore } from "react";

/**
 * Shows example amounts in the visitor's own currency on the marketing mocks.
 * Amounts are written in rupees and scaled by a rough *price-level* factor (not the exchange
 * rate: lunch is ₹60 in India but ~$12 in the US), then rounded to friendly numbers. Server render (and unknown regions) use the default below.
 */

export type MoneyRegion = {
  code: "INR" | "PHP" | "USD" | "EUR" | "GBP";
  symbol: string;
  locale: string;
  /** Multiply a rupee amount by this to get a realistic local price */
  rate: number;
  /** Local word for vehicle fuel */
  fuel: string;
};

const REGIONS: Record<MoneyRegion["code"], MoneyRegion> = {
  INR: { code: "INR", symbol: "₹", locale: "en-IN", rate: 1, fuel: "petrol" },
  PHP: { code: "PHP", symbol: "₱", locale: "en-PH", rate: 2.5, fuel: "gas" },
  USD: { code: "USD", symbol: "$", locale: "en-US", rate: 0.2, fuel: "gas" },
  EUR: { code: "EUR", symbol: "€", locale: "de-DE", rate: 0.2, fuel: "petrol" },
  GBP: { code: "GBP", symbol: "£", locale: "en-GB", rate: 0.17, fuel: "petrol" },
};

const DEFAULT = REGIONS.INR;

function detect(): MoneyRegion {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (/Kolkata|Calcutta/.test(tz)) return REGIONS.INR;
    if (/Manila/.test(tz)) return REGIONS.PHP;
    if (/London|Dublin/.test(tz)) return REGIONS.GBP;
    if (tz.startsWith("Europe/")) return REGIONS.EUR;
    if (tz.startsWith("America/")) return REGIONS.USD;
    return REGIONS.USD;
  } catch {
    return DEFAULT;
  }
}

let cached: MoneyRegion | null = null;
const subscribe = () => () => {};
const getSnapshot = () => (cached ??= detect());
const getServerSnapshot = () => DEFAULT;

/** Round to numbers people actually type: 5, 12, 40, 150, 1,200… */
function friendly(n: number) {
  if (n < 20) return Math.max(1, Math.round(n));
  if (n < 200) return Math.round(n / 5) * 5;
  if (n < 2000) return Math.round(n / 10) * 10;
  return Math.round(n / 100) * 100;
}

export function useLocalMoney() {
  const r = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const amt = (inr: number) => (r.code === "INR" ? inr : friendly(inr * r.rate));
  const fmt = (inr: number) => `${r.symbol}${amt(inr).toLocaleString(r.locale)}`;
  return { region: r, amt, fmt };
}
