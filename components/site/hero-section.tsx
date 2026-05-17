import Link from "next/link";

import { pickLocaleText } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";
import { AnimatedReveal } from "@/components/animated-reveal";

type HeroSectionProps = {
  locale: Locale;
  settings: SiteSettings;
  labels: {
    exploreCatalog: string;
    startProject: string;
  };
};

export function HeroSection({ locale, settings, labels }: HeroSectionProps) {
  return (
    <section id="hero" className="section-border bg-surface-container overflow-hidden">
      <div className="page-container py-section-padding md:py-24">
        <div className="grid grid-cols-1 items-center gap-gutter md:grid-cols-12">

          {/* ── Text block ── */}
          <AnimatedReveal direction="up" className="relative z-10 md:col-span-7">
            {/* Badge chip */}
            <div className="mb-8 inline-block -rotate-2 border-[3px] border-true-black bg-secondary-container px-4 py-1 neo-shadow-sm">
              <span className="font-body text-label-mono uppercase text-paper-white">
                {pickLocaleText(locale, settings.heroBadge)}
              </span>
            </div>

            <h1 className="mb-6 font-display text-display-2xl uppercase leading-none text-true-black">
              {pickLocaleText(locale, settings.heroHeadline).split("\n").map((line, i) =>
                i === 0 ? (
                  <span key={i}>
                    {line.includes("Digital") ? (
                      <>
                        {line.split("Digital")[0]}
                        <span className="text-primary-container">Digital</span>
                        {line.split("Digital")[1]}
                      </>
                    ) : line}
                    <br />
                  </span>
                ) : (
                  <span key={i}>{line}</span>
                )
              )}
            </h1>

            <p className="mb-10 max-w-xl border-l-[3px] border-secondary-container pl-6 font-body text-body-lg text-on-surface-variant">
              {pickLocaleText(locale, settings.heroSubheadline)}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center justify-center gap-2 border-[3px] border-true-black bg-true-black px-8 py-4 font-display text-headline-md uppercase text-paper-white neo-shadow neo-hover hover:bg-secondary-container transition-colors"
              >
                START A PROJECT
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/katalog`}
                className="inline-flex items-center justify-center border-[3px] border-true-black bg-paper-white px-8 py-4 font-display text-headline-md uppercase text-true-black neo-shadow neo-hover transition-colors hover:bg-surface-container"
              >
                {labels.exploreCatalog}
              </Link>
            </div>

            {/* Scrolling ticker */}
            <div className="marquee-wrap mt-10 border-[3px] border-true-black bg-true-black px-4 py-3 font-body text-label-mono uppercase tracking-[0.3em] text-paper-white">
              <span className="marquee-inner">
                Neo-brutal interfaces&nbsp;•&nbsp;Performance-first execution&nbsp;•&nbsp;Editorial storytelling&nbsp;•&nbsp;AI Automation&nbsp;•&nbsp;E-Commerce&nbsp;•&nbsp;Mobile App&nbsp;•&nbsp;Web Development&nbsp;•&nbsp;
              </span>
            </div>
          </AnimatedReveal>

          {/* ── Asymmetric image grid ── */}
          <AnimatedReveal direction="left" delay={200} className="relative mt-12 h-[480px] md:col-span-5 md:mt-0">
            {/* Image 1 — top right */}
            <div className="absolute right-0 top-0 z-10 h-[60%] w-[80%] overflow-hidden border-[3px] border-true-black bg-paper-white neo-shadow">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Industrial Tech"
                className="h-full w-full object-cover grayscale contrast-125"
              />
            </div>
            {/* Image 2 — bottom left */}
            <div className="absolute bottom-0 left-0 z-20 h-[55%] w-[70%] overflow-hidden border-[3px] border-true-black bg-primary-container neo-shadow">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
                alt="Machine Logic"
                className="h-full w-full object-cover mix-blend-multiply"
              />
              <div className="absolute bottom-0 left-0 w-full border-t-[3px] border-true-black bg-true-black p-3">
                <span className="font-body text-label-mono uppercase text-paper-white">
                  SYSTEM_ACTIVE // 01
                </span>
              </div>
            </div>
          </AnimatedReveal>

        </div>
      </div>
    </section>
  );
}
