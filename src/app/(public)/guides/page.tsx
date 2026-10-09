import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/content/guides";

export const metadata: Metadata = {
  title: "Budget Guides & Free Printables | Equilibrium",
  description:
    "Simple, practical money guides with free printable planners: festive budgets, no-spend challenges and more.",
  alternates: { canonical: "https://www.hqequilibrium.com/guides" },
};

export default function GuidesIndex() {
  return (
    <section className="pt-36 md:pt-40 pb-24 max-w-5xl mx-auto px-6 md:px-12 w-full">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">Guides</p>
      <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-5">
        Budget guides &amp; free printables
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl leading-relaxed mb-14">
        Short, practical plans you can use today. Every guide comes with a printable you can download without signing up.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group rounded-3xl bg-bg-card border border-border-subtle shadow-bento overflow-hidden hover-lift flex flex-col"
          >
            <img src={g.pinImage} alt={g.seoTitle} className="w-full aspect-[2/3] object-cover" loading="lazy" />
            <div className="p-5">
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-2">
                {g.kicker}
              </p>
              <p className="font-serif text-xl font-medium leading-snug group-hover:text-text-secondary transition-colors">
                {g.seoTitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
