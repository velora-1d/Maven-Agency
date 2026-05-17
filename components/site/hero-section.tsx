import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { pickLocaleText } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";

type HeroSectionProps = {
  locale: Locale;
  settings: SiteSettings;
  labels: {
    exploreCatalog: string;
    startProject: string;
    activeNow: string;
    internalCms: string;
    analyticsMode: string;
  };
};

export function HeroSection({ locale, settings, labels }: HeroSectionProps) {
  return (
    <section className="section-shell pt-8 sm:pt-12">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="noise brutal-card grid-paper relative overflow-hidden bg-cream p-8 sm:p-10">
          <div className="absolute -left-8 top-8 h-16 w-16 rounded-full border-[3px] border-black bg-mint" />
          <span className="section-kicker relative z-10 bg-paper">
            {pickLocaleText(locale, settings.heroBadge)}
          </span>
          <h1 className="relative z-10 mt-6 max-w-4xl font-[family:var(--font-display)] text-6xl uppercase leading-[0.88] sm:text-7xl lg:text-8xl">
            {pickLocaleText(locale, settings.heroHeadline)}
          </h1>
          <p className="relative z-10 mt-5 max-w-2xl text-sm leading-7 sm:text-base">
            {pickLocaleText(locale, settings.heroSubheadline)}
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap gap-4">
            <Link
              href={settings.heroCtaHref}
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-signal px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink shadow-brutalSm"
            >
              {pickLocaleText(locale, settings.heroCtaLabel)}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/katalog`}
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-white px-6 py-3 text-sm uppercase tracking-[0.2em] shadow-brutalSm"
            >
              {labels.exploreCatalog}
            </Link>
          </div>

          <div className="marquee relative z-10 mt-10 rounded-full border-[3px] border-black bg-ink px-4 py-3 text-xs uppercase tracking-[0.3em] text-paper">
            <span>Neo-brutal interfaces • Performance-first execution • Editorial storytelling • Internal CMS • Analytics ready • </span>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="brutal-card floaty bg-signal p-6 text-ink">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em]">{labels.activeNow}</p>
                <h2 className="mt-3 font-[family:var(--font-display)] text-5xl uppercase leading-none">
                  2026 MVP
                </h2>
              </div>
              <Sparkles className="h-8 w-8" />
            </div>
            <p className="mt-4 text-sm leading-7">
              {locale === "id"
                ? "Website yang tampil berani di depan, dengan sistem CMS dan katalog yang rapi di belakang."
                : "A website that feels bold up front, with a tidy CMS and catalog system behind it."}
            </p>
          </div>

          <div className="brutal-card bg-mint p-6">
            <p className="text-xs uppercase tracking-[0.3em]">{labels.internalCms}</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border-[3px] border-black bg-white p-4">
                <p className="text-[11px] uppercase tracking-[0.25em]">Portfolio</p>
                <p className="mt-2 text-sm">CRUD project showcase and image management.</p>
              </div>
              <div className="rounded-2xl border-[3px] border-black bg-white p-4">
                <p className="text-[11px] uppercase tracking-[0.25em]">Catalog</p>
                <p className="mt-2 text-sm">Searchable service packages with tech and pricing labels.</p>
              </div>
            </div>
          </div>

          <div className="brutal-card bg-sky p-6">
            <p className="text-xs uppercase tracking-[0.3em]">{labels.analyticsMode}</p>
            <p className="mt-3 font-[family:var(--font-display)] text-4xl uppercase leading-none">
              PAGE VIEWS + SOURCES
            </p>
            <p className="mt-3 text-sm leading-7">
              {locale === "id"
                ? "Tracking ringan untuk membaca halaman teratas, visitor unik, dan sumber traffic awal."
                : "Lightweight tracking for top pages, unique visitors, and early traffic sources."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
