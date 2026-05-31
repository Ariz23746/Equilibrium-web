import Link from "next/link";

export default function DeleteAccountPage() {
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
          Account Decommissioning
        </h1>

        <div className="space-y-8 text-text-secondary text-lg leading-relaxed">
          <p>You maintain full sovereignty over your data. In accordance with the &quot;Right to be Forgotten,&quot; Equilibrium provides two secure protocols for the permanent erasure of your identity and tactical financial data.</p>

          <div className="bg-white border border-border-subtle p-8 rounded-3xl shadow-bento mt-12 mb-8">
            <h3 className="font-serif text-xl font-medium text-text-primary mb-4">Protocol 01: In-App Deletion (Recommended)</h3>
            <p className="mb-4 text-text-secondary">For immediate, self-service data erasure:</p>
            <ol className="list-decimal pl-5 space-y-3 text-text-secondary">
              <li>Open the <strong className="text-text-primary font-medium">Equilibrium</strong> app on your device.</li>
              <li>Navigate to the <strong className="text-text-primary font-medium">Command Center</strong> (Profile Screen).</li>
              <li>Scroll to the bottom and select <strong className="text-text-primary font-medium">&quot;Purge Identity &amp; Tactical Data&quot;</strong>.</li>
              <li>Confirm the purge on the tactical alert modal.</li>
            </ol>
            <p className="mt-6 text-sm text-text-secondary/70 italic">*This will immediately wipe your user profile, expenses, and budgets from our production systems.</p>
          </div>

          <div className="bg-white border border-border-subtle p-8 rounded-3xl shadow-bento mb-12">
            <h3 className="font-serif text-xl font-medium text-text-primary mb-4">Protocol 02: Manual Deletion Request</h3>
            <p className="mb-4 text-text-secondary">If you no longer have the app installed, you may request manual deletion by contacting our support uplink:</p>
            <p className="mb-4"><strong className="text-text-primary font-medium">Email:</strong> <a href="mailto:hq.equilibrium.ai@gmail.com" className="text-text-primary underline">hq.equilibrium.ai@gmail.com</a></p>
            <p className="text-text-secondary">Please include your registered email address and neural alias (username). Requests are typically processed within 48-72 operational hours.</p>
          </div>

          <h2 className="font-serif text-2xl font-medium text-text-primary mt-12 mb-6">What data is deleted?</h2>
          <p>When you decommission your account, the following data is permanently purged from our neural network:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4 text-text-secondary">
            <li>Full Identity Profile (Email, Username, Avatar)</li>
            <li>All Transactional Telemetry (Expenses &amp; Categories)</li>
            <li>Financial Calibration Data (Budgets &amp; Limits)</li>
            <li>Push Notification Uplink Tokens</li>
          </ul>

          <p className="mt-16 font-mono text-xs uppercase tracking-widest text-text-secondary">Last Calibrated: April 2026</p>
        </div>
      </main>

    </>
  );
}
