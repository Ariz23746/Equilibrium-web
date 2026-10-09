"use client";

import { useEffect, useRef } from "react";
import { TodayMock, LoggingMock, ForecastMock, HabitMock } from "./FeatureMocks";

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const nodes = container.querySelectorAll(".timeline-node");

    function drawCurvyTimeline() {
      if (!container || !path || nodes.length === 0 || window.innerWidth < 640) return;

      const containerRect = container.getBoundingClientRect();
      let d = "";

      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        if (index === 0) {
          d += `M ${x} 0 L ${x} ${y} `;
        } else {
          const prevNode = nodes[index - 1];
          const prevRect = prevNode.getBoundingClientRect();
          const prevX = prevRect.left - containerRect.left + prevRect.width / 2;
          const prevY = prevRect.top - containerRect.top + prevRect.height / 2;

          const HANDLE_Y = 120;
          const dx = index % 2 === 1 ? 120 : -120;

          const cp1x = prevX + dx;
          const cp1y = prevY + HANDLE_Y;

          const cp2x = x + dx;
          const cp2y = y - HANDLE_Y;

          d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y} `;
        }

        if (index === nodes.length - 1) {
          d += `L ${x} ${container.offsetHeight} `;
        }
      });

      path.setAttribute("d", d);

      const length = path.getTotalLength();
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();
      path.style.transition = "stroke-dashoffset 0.1s ease-out";

      updateScroll();
    }

    function updateScroll() {
      if (!path || !container || window.innerWidth < 640) return;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollStart = rect.top - viewportHeight + 300;
      const scrollEnd = rect.bottom - viewportHeight / 2;

      let progress = -scrollStart / (scrollEnd - scrollStart);
      progress = Math.max(0, Math.min(1, progress));

      const length = path.getTotalLength();
      path.style.strokeDashoffset = (length * (1 - progress)).toString();
    }

    window.addEventListener("resize", drawCurvyTimeline);
    window.addEventListener("scroll", updateScroll);
    window.addEventListener("load", drawCurvyTimeline);

    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        drawCurvyTimeline();
      });
      resizeObserver.observe(container);
    }

    // Draw initially
    setTimeout(drawCurvyTimeline, 200);

    return () => {
      window.removeEventListener("resize", drawCurvyTimeline);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("load", drawCurvyTimeline);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-32 bg-bg-main relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-32 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-4">
            Everything your budget needs.
          </h2>
          <p className="font-sans text-lg text-text-secondary max-w-2xl mx-auto">
            From the moment you spend to the end of the month, in one simple app.
          </p>
        </div>

        {/* The Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Dynamic SVG Winding Path */}
          <svg className="absolute top-0 left-0 w-full h-full z-0 hidden sm:block pointer-events-none text-text-primary">
            <path ref={pathRef} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>

          <div className="space-y-12 md:space-y-24 relative z-10">
            {/* Branch 1 */}
            <div className="relative flex flex-col md:flex-row w-full items-center group bg-bg-card md:bg-transparent rounded-3xl md:rounded-none shadow-bento md:shadow-none p-8 md:p-0">
              <div className="timeline-node hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-bg-card border-[4px] border-text-primary rounded-full z-10 items-center justify-center shadow-lg transition-transform group-hover:scale-150 duration-500"></div>
              <div className="w-full md:w-1/2 md:pr-16 lg:pr-24 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                <div className="font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
                  Today
                </div>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-6">
                  Know what you can spend today.
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed text-lg mb-0">
                  Open the app and see what&apos;s left this month and what you can spend today without going over. One number, every morning.
                </p>
              </div>
              <div className="w-full md:w-1/2 md:pr-8 lg:pr-16 flex justify-center md:justify-end mt-12 md:mt-0 relative z-10">
                <div className="transition-transform duration-700 ease-out group-hover:-translate-y-3">
                  <TodayMock />
                </div>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="relative flex flex-col md:flex-row w-full items-center group bg-bg-card md:bg-transparent rounded-3xl md:rounded-none shadow-bento md:shadow-none p-8 md:p-0">
              <div className="timeline-node hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-bg-card border-[4px] border-text-primary rounded-full z-10 items-center justify-center shadow-lg transition-transform group-hover:scale-150 duration-500"></div>
              <div className="w-full md:w-1/2 md:pl-8 lg:pl-16 flex justify-center md:justify-start order-2 md:order-1 mt-12 md:mt-0 relative z-10">
                <div className="transition-transform duration-700 ease-out group-hover:-translate-y-3">
                  <LoggingMock />
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-16 lg:pl-24 flex flex-col items-center md:items-start text-center md:text-left relative z-10 order-1 md:order-2">
                <div className="font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
                  Logging
                </div>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-6">
                  Say it, or type it.
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed text-lg mb-0">
                  Log several expenses in one line, past days with &ldquo;yesterday&rdquo;, and impulse buys with &ldquo;guilty&rdquo;. Amounts, shops and categories are filled in for you.
                </p>
              </div>
            </div>

            {/* Branch 3 */}
            <div className="relative flex flex-col md:flex-row w-full items-center group bg-bg-card md:bg-transparent rounded-3xl md:rounded-none shadow-bento md:shadow-none p-8 md:p-0">
              <div className="timeline-node hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-bg-card border-[4px] border-text-primary rounded-full z-10 items-center justify-center shadow-lg transition-transform group-hover:scale-150 duration-500"></div>
              <div className="w-full md:w-1/2 md:pr-16 lg:pr-24 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                <div className="font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
                  Forecast
                </div>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-6">
                  See your month-end early.
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed text-lg mb-0">
                  Your spending pace is projected to the end of the month, with regular bills like rent set aside before they&apos;re due. Spot trouble weeks early, not on the 30th.
                </p>
              </div>
              <div className="w-full md:w-1/2 md:pr-8 lg:pr-16 flex justify-center md:justify-end mt-12 md:mt-0 relative z-10">
                <div className="transition-transform duration-700 ease-out group-hover:-translate-y-3">
                  <ForecastMock />
                </div>
              </div>
            </div>

            {/* Branch 4 */}
            <div className="relative flex flex-col md:flex-row w-full items-center group bg-bg-card md:bg-transparent rounded-3xl md:rounded-none shadow-bento md:shadow-none p-8 md:p-0">
              <div className="timeline-node hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-bg-card border-[4px] border-text-primary rounded-full z-10 items-center justify-center shadow-lg transition-transform group-hover:scale-150 duration-500"></div>
              <div className="w-full md:w-1/2 md:pl-8 lg:pl-16 flex justify-center md:justify-start order-2 md:order-1 mt-12 md:mt-0 relative z-10">
                <div className="transition-transform duration-700 ease-out group-hover:-translate-y-3">
                  <HabitMock />
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-16 lg:pl-24 flex flex-col items-center md:items-start text-center md:text-left relative z-10 order-1 md:order-2">
                <div className="font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
                  Habit
                </div>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-6">
                  Make it a habit.
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed text-lg mb-0">
                  A daily streak, a calendar of your light and heavy days, a gentle evening reminder, and a monthly Money Story. Plus a leaderboard if you like a little competition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
