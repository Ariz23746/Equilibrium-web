import Link from "next/link";
import { GUIDES } from "@/content/guides";

export default function GuidesStrip() {
  return (
    <section className="py-28 md:py-32 bg-bg-card border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">
              Free printables
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">Budget guides you can use today.</h2>
          </div>
          <Link
            href="/guides"
            className="font-mono text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
          >
            All guides →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex gap-5 items-center rounded-3xl bg-bg-main border border-border-subtle p-4 pr-6 hover-lift"
            >
              <img src={g.pinImage} alt="" className="w-20 aspect-[2/3] object-cover rounded-xl shrink-0" loading="lazy" />
              <span className="min-w-0">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">
                  {g.kicker}
                </span>
                <span className="block font-serif text-xl leading-snug group-hover:text-text-secondary transition-colors">
                  {g.seoTitle}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
