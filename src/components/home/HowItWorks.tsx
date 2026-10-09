const STEPS = [
  {
    n: "1",
    title: "Say it or type it",
    body: "“250 groceries, 40 coffee, 600 electricity.” One line, as many expenses as you like. Say “yesterday” to log a past day.",
  },
  {
    n: "2",
    title: "It's sorted for you",
    body: "Amounts, shops and categories are picked out automatically. No forms, no dropdowns, no spreadsheet.",
  },
  {
    n: "3",
    title: "Know where you stand",
    body: "See what's left this month, what you can spend today, and whether you'll finish the month on budget.",
  },
];

export default function HowItWorks() {
  return (
    <section className="pt-28 md:pt-36 max-w-7xl mx-auto px-6 md:px-12 w-full">
      <div className="text-center mb-14">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">How it works</p>
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">Logging takes seconds.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-3xl bg-bg-card border border-border-subtle shadow-bento p-8">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-lime font-serif text-xl text-on-lime mb-6">
              {s.n}
            </span>
            <h3 className="font-serif text-2xl font-medium mb-3">{s.title}</h3>
            <p className="text-text-secondary leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
