"use client";

import Script from "next/script";
import { useEffect } from "react";
import { POSTHOG_HOST, POSTHOG_KEY, rememberUtm } from "@/lib/analytics";

/**
 * Loads PostHog with the official snippet (no npm package needed).
 * - capture_pageview "history_change": counts page views, including in-site navigation
 * - person_profiles "identified_only": anonymous visitors only, cheapest event type
 * - every event is tagged app=website so it never mixes with the mobile app's numbers
 */
export default function Analytics() {
  useEffect(() => {
    rememberUtm();
  }, []);

  // No tracking from npm run dev, or when the key isn't configured
  if (process.env.NODE_ENV !== "production" || !POSTHOG_KEY) return null;

  const init = `
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister identify reset get_distinct_id get_session_id set_config opt_in_capturing opt_out_capturing has_opted_out_capturing".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init(${JSON.stringify(POSTHOG_KEY)}, {
  api_host: ${JSON.stringify(POSTHOG_HOST)},
  person_profiles: "identified_only",
  capture_pageview: "history_change",
  capture_pageleave: true,
  autocapture: false,
  disable_session_recording: true,
});
posthog.register({ app: "website" });
`;
  return <Script id="posthog" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: init }} />;
}
