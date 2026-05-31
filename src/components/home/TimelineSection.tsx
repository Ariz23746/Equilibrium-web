"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
            A unified financial journey.
          </h2>
          <p className="font-sans text-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to master your wealth, seamlessly connected along one path.
          </p>
        </div>

        {/* The Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Dynamic SVG Winding Path */}
          <svg className="absolute top-0 left-0 w-full h-full z-0 hidden sm:block pointer-events-none">
            <path ref={pathRef} fill="none" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
          </svg>

          <div className="space-y-12 md:space-y-24 relative z-10">
            {/* Branch 1 */}
            <div className="relative flex flex-col md:flex-row w-full items-center group bg-white md:bg-transparent rounded-3xl md:rounded-none shadow-bento md:shadow-none p-8 md:p-0">
              <div className="timeline-node hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-[4px] border-text-primary rounded-full z-10 items-center justify-center shadow-lg transition-transform group-hover:scale-150 duration-500"></div>
              <div className="w-full md:w-1/2 md:pr-16 lg:pr-24 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                <div className="font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
                  Panoramic View
                </div>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-6">
                  Absolute Clarity.
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed text-lg mb-0">
                  See your safe-to-spend allocation at a glance with our signature Zen-ring. No overwhelming spreadsheets, just the essential truth.
                </p>
              </div>
              <div className="w-full md:w-1/2 md:pr-8 lg:pr-16 flex justify-center md:justify-end mt-12 md:mt-0 relative z-10">
                <img
                  alt="Dashboard"
                  className="w-[90%] max-w-[360px] h-auto object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-4 mask-bottom-fade scale-100 md:scale-[1.15] translate-x-12 md:translate-x-40 origin-bottom"
                  src="/assets/hero_image.png"
                />
              </div>
            </div>

            {/* Branch 2 */}
            <div className="relative flex flex-col md:flex-row w-full items-center group bg-white md:bg-transparent rounded-3xl md:rounded-none shadow-bento md:shadow-none p-8 md:p-0">
              <div className="timeline-node hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-[4px] border-text-primary rounded-full z-10 items-center justify-center shadow-lg transition-transform group-hover:scale-150 duration-500"></div>
              <div className="w-full md:w-1/2 md:pl-8 lg:pl-16 flex justify-center md:justify-start order-2 md:order-1 mt-12 md:mt-0 relative z-10">
                <img
                  alt="Voice Logging"
                  className="w-[90%] max-w-[360px] h-auto object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-4 mask-bottom-fade scale-100 md:scale-[1.15] translate-x-12 md:translate-x-16 -rotate-[16deg] origin-bottom"
                  src="/assets/Ai Voice.png"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-16 lg:pl-24 flex flex-col items-center md:items-start text-center md:text-left relative z-10 order-1 md:order-2">
                <div className="font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
                  Voice AI
                </div>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-6">
                  Frictionless.
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed text-lg mb-0">
                  Speak naturally. We handle amounts, merchants, and categories instantly. Zero manual entry required.
                </p>
              </div>
            </div>

            {/* Branch 3 */}
            <div className="relative flex flex-col md:flex-row w-full items-center group bg-white md:bg-transparent rounded-3xl md:rounded-none shadow-bento md:shadow-none p-8 md:p-0">
              <div className="timeline-node hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-[4px] border-text-primary rounded-full z-10 items-center justify-center shadow-lg transition-transform group-hover:scale-150 duration-500"></div>
              <div className="w-full md:w-1/2 md:pr-16 lg:pr-24 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                <div className="font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
                  Oracle
                </div>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-6">
                  See the future.
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed text-lg mb-0">
                  Anticipate tomorrow's landscape. We project future balances so you're always positioned for success.
                </p>
              </div>
              <div className="w-full md:w-1/2 md:pr-8 lg:pr-16 flex justify-center md:justify-end mt-12 md:mt-0 relative z-10">
                <img
                  alt="Predictive Forecasting"
                  className="w-[90%] max-w-[360px] h-auto object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-4 mask-bottom-fade scale-100 md:scale-[1.15] translate-x-12 md:translate-x-40 origin-bottom"
                  src="/assets/fortune.png"
                />
              </div>
            </div>

            {/* Branch 4 */}
            <div className="relative flex flex-col md:flex-row w-full items-center group bg-white md:bg-transparent rounded-3xl md:rounded-none shadow-bento md:shadow-none p-8 md:p-0">
              <div className="timeline-node hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-[4px] border-text-primary rounded-full z-10 items-center justify-center shadow-lg transition-transform group-hover:scale-150 duration-500"></div>
              <div className="w-full md:w-1/2 md:pl-8 lg:pl-16 flex justify-center md:justify-start order-2 md:order-1 mt-12 md:mt-0 relative z-10">
                <img
                  alt="Summit"
                  className="w-[90%] max-w-[360px] h-auto object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-4 mask-bottom-fade scale-[1.2] md:scale-[1.3] translate-x-12 md:-translate-x-4 -rotate-[8deg] origin-bottom"
                  src="/assets/summit.png"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-16 lg:pl-24 flex flex-col items-center md:items-start text-center md:text-left relative z-10 order-1 md:order-2">
                <div className="font-mono text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
                  Community
                </div>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-6">
                  Make saving rewarding.
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed text-lg mb-0">
                  Ascend 'The Summit'. Compare your discipline globally and turn saving into a highly motivating shared achievement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
