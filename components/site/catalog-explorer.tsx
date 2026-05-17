import Link from "next/link";

import { pickLocaleText } from "@/lib/i18n";
import type { CatalogItem, Locale } from "@/lib/types";
import { AnimatedReveal } from "@/components/animated-reveal";

type CatalogExplorerProps = {
  locale: Locale;
  items: CatalogItem[];
  labels: {
    exploreCatalog: string;
    hiddenPrice: string;
    noData: string;
  };
  showAll?: boolean;
};

const CATALOG_ACCENTS = [
  { badge: "bg-primary-container text-paper-white", border: "border-primary-container", icon: "bg-primary-container" },
  { badge: "bg-secondary-container text-true-black", border: "border-secondary-container", icon: "bg-secondary-container" },
  { badge: "bg-true-black text-paper-white", border: "border-true-black", icon: "bg-true-black" },
];

function formatPrice(item: CatalogItem, hiddenLabel: string, locale: Locale) {
  if (item.isPriceHidden) return hiddenLabel;
  if (item.priceLabel?.id || item.priceLabel?.en) return pickLocaleText(locale, item.priceLabel);
  if (item.priceFrom) {
    const from = item.priceFrom.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
    if (item.priceTo) {
      const to = item.priceTo.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
      return `${from} – ${to}`;
    }
    return `From ${from}`;
  }
  return hiddenLabel;
}

export function CatalogExplorer({ locale, items, labels, showAll = false }: CatalogExplorerProps) {
  const preview = showAll ? items : items.slice(0, 3);

  return (
    <section id="catalog" className="section-border bg-surface py-section-padding">
      <div className="page-container">
        {/* Header */}
        <AnimatedReveal direction="up" className="mb-16 grid grid-cols-1 gap-12 border-b-[3px] border-true-black pb-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="font-display text-display-2xl uppercase leading-none text-true-black">
              SOLUTION<br />
              <span className="text-primary-container">CATALOG.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-between gap-6 md:col-span-6 md:flex-row md:items-end">
            <p className="max-w-xs font-body text-body-lg uppercase text-on-surface-variant">
              PRE-CONFIGURED PACKAGES. BATTLE-TESTED SOLUTIONS. PLUG &amp; FORGE.
            </p>
            <Link
              href={`/${locale}/katalog`}
              className="inline-flex items-center gap-2 whitespace-nowrap border-[3px] border-true-black bg-true-black px-6 py-3 font-display text-headline-md uppercase text-paper-white neo-shadow neo-hover transition-colors hover:bg-secondary-container hover:text-true-black"
            >
              {labels.exploreCatalog}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {preview.length === 0 ? (
            <p className="col-span-3 py-16 text-center font-body text-body-lg uppercase text-on-surface-variant">
              {labels.noData}
            </p>
          ) : (
            preview.map((item, i) => {
              const accent = CATALOG_ACCENTS[i % CATALOG_ACCENTS.length];
              return (
                <AnimatedReveal
                  key={item.id}
                  direction="up"
                  delay={i * 150}
                  className={`group relative border-[3px] border-true-black bg-paper-white neo-shadow transition-transform duration-200 hover:-translate-y-1 hover:translate-x-1 ${i === 1 ? "md:mt-8" : ""}`}
                >
                  {/* Top accent bar */}
                  <div className={`h-2 w-full ${accent.icon}`} />

                  <div className="p-8">
                    {/* Category badge */}
                    <div className={`mb-4 inline-block border-[3px] border-true-black px-3 py-1 font-body text-label-mono uppercase neo-shadow-sm ${accent.badge}`}>
                      {pickLocaleText(locale, item.category)}
                    </div>

                    {/* Name */}
                    <h3 className="mb-4 font-display text-headline-md uppercase text-true-black">
                      {pickLocaleText(locale, item.name)}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 border-l-[3px] border-true-black pl-4 font-body text-body-md text-on-surface-variant">
                      {pickLocaleText(locale, item.description)}
                    </p>

                    {/* Tech tags */}
                    {item.technologyLabels.length > 0 && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {item.technologyLabels.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="border-[3px] border-true-black bg-surface-container px-3 py-1 font-body text-label-mono uppercase text-true-black"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Features (first 3) */}
                    {item.features.length > 0 && (
                      <ul className="mb-6 space-y-2">
                        {item.features.slice(0, 3).map((feat, j) => (
                          <li key={j} className="flex items-start gap-2 font-body text-body-md text-on-surface">
                            <svg className="mt-1 h-4 w-4 flex-shrink-0 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            {pickLocaleText(locale, feat)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Price & CTA footer */}
                  <div className="border-t-[3px] border-true-black bg-surface-container p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-body text-label-mono uppercase text-on-surface-variant">
                          STARTING FROM
                        </p>
                        <p className={`font-display text-headline-md uppercase ${accent.badge.split(" ")[0] === "bg-paper-white" ? "text-primary-container" : "text-primary-container"}`}>
                          {formatPrice(item, labels.hiddenPrice, locale)}
                        </p>
                      </div>
                      {item.ctaUrl ? (
                        <Link
                          href={item.ctaUrl}
                          className={`border-[3px] border-true-black px-4 py-2 font-display text-label-mono uppercase neo-shadow-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none ${accent.badge}`}
                        >
                          INQUIRE
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </AnimatedReveal>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
