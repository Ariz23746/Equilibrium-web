"use client";

/**
 * Website analytics (PostHog, same project as the app, events tagged app=website).
 * - Page views, plus UTM / referrer capture (PostHog records utm_* automatically).
 * - track(): store clicks, "Get the app", printable downloads.
 * - playReferrer(): carries the visitor's UTM into Google Play links, so Play Console
 *   attributes installs to the campaign (e.g. utm_source=pinterest&utm_campaign=diwali_2026).
 */

// Set in .env.local (local) and in the hosting build settings (production).
// Inlined at build time. If the key is missing, analytics simply stays off.
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

type PH = { capture: (event: string, props?: Record<string, unknown>) => void };
declare global {
  interface Window {
    posthog?: PH;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORE_KEY = "eq-utm";

/** Remember the first UTM tags of this visit, so later clicks on any page still carry them. */
export function rememberUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 100);
    });
    if (Object.keys(utm).length && !sessionStorage.getItem(STORE_KEY)) {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(utm));
    }
  } catch {
    // storage blocked: attribution falls back to defaults
  }
}

function storedUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function track(event: string, props: Record<string, unknown> = {}) {
  try {
    window.posthog?.capture(event, { ...storedUtm(), page: window.location.pathname, ...props });
  } catch {
    // never let analytics break a click
  }
}

/**
 * Google Play "referrer" value. Uses the visitor's own UTM tags if they came from a
 * campaign, otherwise the website placement (e.g. utm_source=website&utm_campaign=home_hero).
 */
export function playReferrer(placement: string): string {
  const utm = storedUtm();
  const ref: Record<string, string> = utm.utm_source
    ? {
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium || "website",
        utm_campaign: utm.utm_campaign || placement,
        utm_content: placement,
      }
    : { utm_source: "website", utm_medium: "web", utm_campaign: placement };
  return new URLSearchParams(ref).toString();
}
