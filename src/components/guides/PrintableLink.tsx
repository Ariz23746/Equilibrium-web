"use client";

import { track } from "@/lib/analytics";

/** The "Free printable" card on a guide page; tracks downloads per guide. */
export default function PrintableLink({
  href,
  guide,
  children,
  className,
}: {
  href: string;
  guide: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} download className={className} onClick={() => track("printable_downloaded", { guide })}>
      {children}
    </a>
  );
}
