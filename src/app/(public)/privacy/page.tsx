import Link from "next/link";

export default function PrivacyPage() {
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
          Privacy Protocols
        </h1>

        <div className="space-y-8 text-text-secondary text-lg leading-relaxed">
          <p>Your financial data is your sovereignty. This policy outlines how Equilibrium handles your tactical financial data and identity information.</p>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">1. Data Collection &amp; Synchronization</h2>
          <p>Equilibrium collects the following information to synchronize your financial command center:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li><strong className="text-text-primary font-medium">Identity Data</strong>: Neural Alias (username), Email, and Profile Avatar.</li>
            <li><strong className="text-text-primary font-medium">Financial Telemetry</strong>: Expense logs, monthly budget limits, and sector allocations.</li>
            <li><strong className="text-text-primary font-medium">Technical Metadata</strong>: Device push tokens for operational alerts.</li>
          </ul>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">2. Data Utilization</h2>
          <p>Your data is processed strictly for the following operational requirements:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li><strong className="text-text-primary font-medium">The Fortune Oracle</strong>: Calculating future burn rates and surplus projections.</li>
            <li><strong className="text-text-primary font-medium">The Summit</strong>: Determining your standing in the global Vanguard standings.</li>
            <li><strong className="text-text-primary font-medium">Synchronization</strong>: Ensuring your data is available across your authenticated nodes.</li>
          </ul>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">3. Third-Party Integrations</h2>
          <p>We utilize audited third-party partners for specific infrastructure nodes:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li><strong className="text-text-primary font-medium">Media Storage</strong>: Avatars are processed via Cloudinary.</li>
            <li><strong className="text-text-primary font-medium">Compute Nodes</strong>: Core databases are hosted on secured AWS Lightsail instances.</li>
          </ul>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">4. Security Protocols</h2>
          <p>All data uplinks are protected by industry-standard SSL encryption and token-based authentication (JWT). We do not sell your financial telemetry to advertisers or external entities.</p>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">5. Data Erasure</h2>
          <p>
            Users maintain full sovereignty over their data. You may request full account decommissioning and data erasure
            at any time directly within the app or through our dedicated{" "}
            <Link href="/delete-account" className="text-text-primary underline hover:text-black font-medium">
              Account Deletion Node
            </Link>.
          </p>

          <p className="mt-16 font-mono text-xs uppercase tracking-widest text-text-secondary">Last Calibrated: April 2026</p>
        </div>
      </main>

    </>
  );
}
