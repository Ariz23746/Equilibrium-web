const POINTS = [
  {
    icon: "fa-building-columns",
    title: "No bank login",
    body: "You never connect a bank account or share card details. You decide what gets logged.",
  },
  {
    icon: "fa-lock",
    title: "Your data stays yours",
    body: "Your expenses are never sold or shared with advertisers. Delete your account and data any time.",
  },
  {
    icon: "fa-user",
    title: "Built by one person",
    body: "Equilibrium is made by a solo developer who reads every message and ships updates every few weeks.",
  },
];

const FAQ = [
  {
    q: "Is it free?",
    a: "Yes, you can log expenses, set budgets and try AI logging for free (10 AI logs a month). Equilibrium Pro adds unlimited AI logs, your exact daily allowance, the month-end forecast and deeper insights.",
  },
  {
    q: "Do I have to connect my bank?",
    a: "No. Equilibrium never asks for bank or card access. You log spending by typing or speaking, which also keeps you more aware of where your money goes.",
  },
  {
    q: "Which languages does it understand?",
    a: "Type in your own language, including Hinglish (“das rupiya chai”). Voice logging works best in English. The app's screens are in English.",
  },
  {
    q: "Which currencies are supported?",
    a: "Rupees, pesos, dollars, euros, pounds and many more. Pick yours when you set up your budget.",
  },
  {
    q: "Is it on iPhone and Android?",
    a: "Yes, Equilibrium is on the App Store and Google Play. Sign in with Apple or Google.",
  },
];

export default function TrustSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="py-28 md:py-32 max-w-7xl mx-auto px-6 md:px-12 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="grid gap-6 md:grid-cols-3 mb-24">
        {POINTS.map((p) => (
          <div key={p.title} className="rounded-3xl bg-surface-inverse text-white p-8 ring-1 ring-edge">
            <i className={`fa-solid ${p.icon} text-brand-lime text-xl mb-6 block`}></i>
            <h3 className="font-serif text-2xl font-medium mb-3">{p.title}</h3>
            <p className="text-white/70 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-center mb-10">Questions</h2>
        <div className="divide-y divide-border-subtle border-y border-border-subtle">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl">
                {f.q}
                <i className="fa-solid fa-plus text-sm text-text-secondary transition-transform group-open:rotate-45"></i>
              </summary>
              <p className="mt-3 text-text-secondary text-lg leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
