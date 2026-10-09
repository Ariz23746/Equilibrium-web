import { APP_STORE_URL, PLAY_STORE_URL } from "@/content/guides";

/** App Store / Google Play buttons. `campaign` tags Play installs so we can see which guide brought them. */
/**
 * `tone="dark"` is for use on a black background: both buttons in the app's lime,
 * so the box looks like the app itself.
 */
export default function StoreButtons({ campaign, tone = "light" }: { campaign: string; tone?: "light" | "dark" }) {
  const onDark = tone === "dark";
  const lime = "bg-brand-lime text-on-lime";
  const playUrl = `${PLAY_STORE_URL}&referrer=${encodeURIComponent(
    `utm_source=website&utm_medium=guide&utm_campaign=${campaign}`,
  )}`;
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${onDark ? lime : "bg-text-primary text-bg-main"} px-6 py-3.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover-lift shadow-button`}
      >
        <i className="fa-brands fa-apple text-[18px]"></i>
        App Store
      </a>
      <a
        href={playUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${onDark ? lime : "bg-bg-card text-text-primary border border-border-subtle"} px-6 py-3.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover-lift shadow-sm`}
      >
        <i className="fa-brands fa-google-play text-[16px]"></i>
        Google Play
      </a>
    </div>
  );
}
