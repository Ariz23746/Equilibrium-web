import Link from "next/link";

/** Shared layout for Privacy / Terms: plain headings, readable text. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="pt-40 pb-32 max-w-3xl mx-auto px-6 md:px-12 font-sans min-h-screen">
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-bg-card rounded-full font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-12 border border-border-subtle shadow-sm hover:text-text-primary transition-colors hover-lift"
      >
        ← Home
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl font-medium text-text-primary mb-4 tracking-tight">{title}</h1>
      <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-12">Last updated: {updated}</p>
      <div className="space-y-6 text-text-secondary text-lg leading-relaxed [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-text-primary [&_h2]:mt-12 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-text-primary [&_strong]:font-semibold [&_a]:text-text-primary [&_a]:underline">
        {children}
      </div>
    </main>
  );
}
