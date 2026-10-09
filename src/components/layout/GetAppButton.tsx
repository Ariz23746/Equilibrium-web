"use client";

import Link from "next/link";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/content/guides";
import { playReferrer, track } from "@/lib/analytics";

/**
 * One "Get the app" button that sends iPhone users to the App Store and Android users to
 * Google Play. On desktop it scrolls to the store buttons in the home page hero.
 */
export default function GetAppButton({ className = "", label = "Get the app" }: { className?: string; label?: string }) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent || "";
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    track("get_app_clicked", { platform: isIOS ? "ios" : isAndroid ? "android" : "desktop" });
    if (isIOS || isAndroid) {
      e.preventDefault();
      const play = `${PLAY_STORE_URL}&referrer=${encodeURIComponent(playReferrer("nav_get_app"))}`;
      window.location.href = isIOS ? APP_STORE_URL : play;
    }
  };
  return (
    <Link
      href="/#download"
      onClick={onClick}
      className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-full bg-brand-lime text-on-lime font-mono text-xs font-bold uppercase tracking-widest shadow-sm hover-lift ${className}`}
    >
      <i className="fa-solid fa-arrow-down text-[11px]"></i>
      {label}
    </Link>
  );
}
