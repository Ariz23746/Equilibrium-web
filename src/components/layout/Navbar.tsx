import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-bg-main/80 backdrop-blur-xl border-b border-border-subtle transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-24">
        <Link href="/" className="flex items-center gap-4 group">
          <img
            src="/assets/logo.png"
            alt="Equilibrium Logo"
            className="h-10 w-auto rounded-xl group-hover:opacity-80 transition-opacity"
          />
          <div className="font-serif text-3xl font-medium tracking-tight group-hover:text-text-secondary transition-colors">
            Equilibrium.
          </div>
        </Link>
        <ul className="hidden md:flex gap-10 items-center">
          <li>
            <Link
              className="font-mono text-sm font-bold text-text-secondary hover:text-text-primary transition-colors tracking-widest uppercase"
              href="/#features"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              className="font-mono text-sm font-bold text-text-secondary hover:text-text-primary transition-colors tracking-widest uppercase"
              href="/#contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
