import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/content/guides";
import GuideBlocks from "@/components/guides/GuideBlocks";
import StoreButtons from "@/components/guides/StoreButtons";
import PrintableLink from "@/components/guides/PrintableLink";

const SITE = "https://www.hqequilibrium.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `${SITE}/guides/${guide.slug}`;
  return {
    title: `${guide.seoTitle} | Equilibrium`,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: guide.seoTitle,
      description: guide.description,
      siteName: "Equilibrium",
      images: [{ url: `${SITE}${guide.pinImage}`, width: 1000, height: 1500, alt: guide.seoTitle }],
    },
    twitter: { card: "summary_large_image", title: guide.seoTitle, description: guide.description },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const others = GUIDES.filter((g) => g.slug !== guide.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.seoTitle,
    description: guide.description,
    image: `${SITE}${guide.pinImage}`,
    dateModified: guide.updated,
    author: { "@type": "Organization", name: "Equilibrium" },
    mainEntityOfPage: `${SITE}/guides/${guide.slug}`,
  };

  return (
    <article className="pt-36 md:pt-40 pb-24 max-w-3xl mx-auto px-6 md:px-12 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link
        href="/guides"
        className="inline-block px-4 py-2 bg-bg-card rounded-full font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-10 border border-border-subtle shadow-sm hover:text-text-primary transition-colors"
      >
        ← All guides
      </Link>

      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">
        {guide.kicker} · {guide.readMinutes} min read
      </p>
      <h1 className="font-serif text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-6">{guide.title}</h1>
      <p className="text-xl text-text-secondary leading-relaxed mb-10">{guide.intro}</p>

      {/* Printable, near the top: it's what most Pinterest visitors came for */}
      <PrintableLink
        href={guide.printable.file}
        guide={guide.slug}
        className="block rounded-3xl bg-bg-card border border-border-subtle shadow-bento p-6 md:p-7 mb-14 hover-lift"
      >
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-2">
          Free printable
        </p>
        <p className="font-serif text-2xl font-medium mb-2">{guide.printable.label}</p>
        <p className="text-text-secondary">{guide.printable.blurb}</p>
        <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest">
          <i className="fa-solid fa-arrow-down mr-2"></i>Download, no sign-up
        </p>
      </PrintableLink>

      <div className="space-y-14">
        {guide.sections.map((s) => (
          <section key={s.heading} className="space-y-5">
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">{s.heading}</h2>
            <GuideBlocks blocks={s.blocks} />
          </section>
        ))}
      </div>

      {/* Gentle pointer to the app */}
      <section className="mt-20 rounded-3xl bg-surface-inverse text-white p-8 md:p-10 ring-1 ring-edge">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-lime mb-3">
          Prefer your phone to paper?
        </p>
        <h2 className="font-serif text-3xl font-medium leading-tight mb-4">
          Track this plan by just saying what you spent.
        </h2>
        <p className="text-white/75 text-lg leading-relaxed mb-8">{guide.appExample}</p>
        <StoreButtons campaign={guide.slug} tone="dark" />
        <p className="mt-5 text-sm text-white/50">Free to start. No bank login.</p>
      </section>

      {others.length > 0 && (
        <nav className="mt-20">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mb-5">More guides</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {others.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex gap-4 items-center rounded-2xl bg-bg-card border border-border-subtle shadow-bento p-3 pr-4 hover-lift h-full"
                >
                  <img
                    src={g.pinImage}
                    alt=""
                    className="w-16 aspect-[2/3] object-cover rounded-lg shrink-0"
                    loading="lazy"
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">
                      {g.kicker}
                    </span>
                    <span className="block font-serif text-lg leading-snug group-hover:text-text-secondary transition-colors">
                      {g.seoTitle}
                    </span>
                  </span>
                  <i className="fa-solid fa-arrow-right text-text-secondary group-hover:text-text-primary transition-colors"></i>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <p className="mt-16 font-mono text-xs uppercase tracking-widest text-text-secondary">
        Updated {new Date(guide.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </p>
    </article>
  );
}
