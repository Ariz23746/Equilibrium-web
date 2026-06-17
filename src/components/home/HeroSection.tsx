export default function HeroSection() {
  return (
    <header className="relative pt-32 md:pt-40 overflow-hidden flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 gap-12 lg:gap-0">
      <div className="flex-1 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
        <div className="inline-block px-4 py-2 bg-white rounded-full font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-8 border border-border-subtle shadow-sm">
          The Financial Antidote
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5rem] font-medium text-text-primary leading-[1.05] tracking-tight mb-6 max-w-3xl">
          Tranquility in every transaction.
        </h1>

        <p className="font-sans text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
          Absolute financial clarity without the noise. Transform your wealth management into a seamless, mindful
          journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
          <a
            href="https://apps.apple.com/us/app/equilibrium-budget-coach/id6778774923"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-text-primary text-white px-8 py-4 rounded-full font-mono text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover-lift shadow-button"
          >
            <i className="fa-brands fa-apple text-[22px]"></i>
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.arizkhan.equilibrium"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-text-primary border border-border-subtle px-8 py-4 rounded-full font-mono text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover-lift shadow-sm"
          >
            <i className="fa-brands fa-google-play text-[20px]"></i>
            Google Play
          </a>
        </div>
      </div>

      <div className="flex-1 w-full relative flex justify-center lg:justify-end items-center mt-12 lg:mt-0">
        <img
          alt="Equilibrium App Concept"
          className="relative z-10 w-full max-w-[550px] h-auto object-contain drop-shadow-2xl translate-x-4 md:translate-x-12 lg:-translate-y-8"
          src="/assets/screen.png"
        />
      </div>
    </header>
  );
}
