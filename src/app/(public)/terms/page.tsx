import Link from "next/link";

export default function TermsPage() {
  return (
    <>

      <main className="pt-40 pb-32 max-w-3xl mx-auto px-6 md:px-12 font-sans min-h-screen">
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-white rounded-full font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-12 border border-border-subtle shadow-sm hover:text-text-primary transition-colors hover-lift"
        >
          ← Return Home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-medium text-text-primary mb-12 tracking-tight">
          Terms of Service
        </h1>

        <div className="space-y-8 text-text-secondary text-lg leading-relaxed">
          <p>By establishing a neural link with Equilibrium, you agree to the following operational protocols.</p>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">1. License &amp; Operational Scope</h2>
          <p>Equilibrium grants you a personal, non-exclusive license to use the Command Center for tracking personal expenses and financial strategy. You are responsible for maintaining the security of your neural alias and keyphrase.</p>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">2. Data Sovereignty</h2>
          <p>You maintain full ownership of your financial telemetry. We provide the tools for synchronization and forecasting, but the tactical decisions made based on this data are entirely your own.</p>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">3. Prohibited Conduct</h2>
          <p>Users are strictly prohibited from attempting to breach the Equilibrium compute nodes, reverse-engineering the synchronization engine, or utilizing the platform for any illegal financial activities.</p>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">4. Disclaimer of Liability</h2>
          <p>Equilibrium is a strategic tool, not a financial advisor. We do not guarantee the accuracy of future projections provided by the Fortune Oracle. All financial decisions should be verified against your physical banking records.</p>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">5. Operational Termination</h2>
          <p>We reserve the right to decommission any account found in violation of these protocols. Users may terminate their mission at any time by requesting account deletion.</p>

          <p className="mt-16 font-mono text-xs uppercase tracking-widest text-text-secondary">Last Calibrated: April 2026</p>
        </div>
      </main>

    </>
  );
}
