import Link from "next/link";
import GetAppButton from "./GetAppButton";
import ThemeToggle from "./ThemeToggle";

const linkClass =
  "font-mono text-sm font-bold text-text-secondary hover:text-text-primary transition-colors tracking-widest uppercase";

/** Lime "New" pill with a pulsing dot, next to Guides. Remove once Guides is no longer new. */
function NewBadge({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`relative inline-flex items-center rounded-full bg-brand-lime text-on-lime ring-1 ring-text-primary/10 leading-none tracking-wider ${
        small ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]"
      }`}
    >
      <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lime opacity-90"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-text-primary"></span>
      </span>
      New
    </span>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-bg-main/80 backdrop-blur-xl border-b border-border-subtle transition-all">
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex justify-between items-center h-20 md:h-24 gap-3">
        <Link href="/" className="flex items-center gap-3 md:gap-4 group shrink-0">
          <img
            src="/assets/logo.png"
            alt="Equilibrium logo"
            className="h-9 md:h-10 w-auto rounded-xl group-hover:opacity-80 transition-opacity ring-1 ring-edge"
          />
          {/* Wordmark hidden on phones so the theme switch, Guides and Get app fit */}
          <div className="hidden min-[520px]:block font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-text-secondary transition-colors">
            Equilibrium.
          </div>
        </Link>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle className="h-9 w-9" />
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border-subtle bg-bg-card px-3 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest shadow-sm"
          >
            Guides
            <NewBadge small />
          </Link>
          <GetAppButton className="px-4 py-2.5 text-[11px]" label="Get app" />
        </div>

        {/* Desktop */}
        <ul className="hidden md:flex gap-9 items-center">
          <li>
            <Link className={linkClass} href="/#features">
              Features
            </Link>
          </li>
          <li>
            <Link className={`${linkClass} inline-flex items-center gap-2`} href="/guides">
              Guides
              <NewBadge />
            </Link>
          </li>
          <li>
            <Link className={linkClass} href="/#contact">
              Contact
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <GetAppButton className="px-6 py-3.5" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
