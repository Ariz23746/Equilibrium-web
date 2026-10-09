import StoreButtons from "@/components/guides/StoreButtons";
import HeroPhone from "@/components/home/HeroPhone";
import LocalExample from "@/components/home/LocalExample";

export default function HeroSection() {
  return (
    <header className="relative w-full pt-28 md:pt-28 pb-8 overflow-hidden flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 gap-10 lg:gap-16">
      <div className="flex-1 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-card rounded-full font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-8 border border-border-subtle shadow-sm">
          <span className="h-2 w-2 rounded-full bg-brand-lime ring-1 ring-text-primary/20"></span>
          Expense tracker &amp; budget planner
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5rem] font-medium text-text-primary leading-[1.05] tracking-tight mb-6 max-w-3xl">
          Track spending <br className="hidden sm:block" />
          by just <i>saying it.</i>
        </h1>

        <p className="font-sans text-lg md:text-xl text-text-secondary max-w-lg mb-8 leading-relaxed">
          Type or say <LocalExample /> and both are logged and sorted. See what you can spend today, and
          where your month is heading.
        </p>

        <div id="download" className="scroll-mt-32">
          <StoreButtons campaign="home_hero" />
        </div>

        <p className="mt-5 font-mono text-xs font-bold uppercase tracking-widest text-text-secondary">
          Free to start · No bank login
        </p>
      </div>

      <div className="w-full lg:w-auto lg:shrink-0 relative flex justify-center items-center">
        <HeroPhone />
      </div>
    </header>
  );
}
