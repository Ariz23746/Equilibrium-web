import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-bg-main border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-serif text-2xl font-medium text-text-primary">Equilibrium.</div>
        <div className="flex gap-8 flex-wrap justify-center md:justify-end">
          <Link
            className="font-mono text-xs font-bold tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
            href="/privacy"
          >
            Privacy
          </Link>
          <Link
            className="font-mono text-xs font-bold tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
            href="/terms"
          >
            Terms
          </Link>
          <Link
            className="font-mono text-xs font-bold tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
            href="/delete-account"
          >
            Data Deletion
          </Link>
          <a
            className="font-mono text-xs font-bold tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
            href="mailto:hq.equilibrium.ai@gmail.com"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
