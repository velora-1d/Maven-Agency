import { pickLocaleText } from "@/lib/i18n";
import type { Locale, PortfolioProject } from "@/lib/types";

type PortfolioSectionProps = {
  locale: Locale;
  items: PortfolioProject[];
  labels: {
    featuredWork: string;
  };
};

export function PortfolioSection({
  locale,
  items,
  labels
}: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="section-shell">
      <div className="mb-8">
        <span className="section-kicker bg-ink text-paper">{labels.featuredWork}</span>
        <h2 className="mt-5 max-w-4xl font-[family:var(--font-display)] text-5xl uppercase leading-none sm:text-6xl">
          Case studies with editorial framing and product logic.
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="brutal-card overflow-hidden bg-white"
          >
            <div
              className="grid min-h-[220px] place-items-center border-b-[3px] border-black p-8 text-center"
              style={{
                background:
                  index % 3 === 0
                    ? "linear-gradient(135deg, #FF6B00 0%, #FFF6E8 100%)"
                    : index % 3 === 1
                      ? "linear-gradient(135deg, #98D8FF 0%, #FFFFFF 100%)"
                      : "linear-gradient(135deg, #A5FF8B 0%, #FFFFFF 100%)"
              }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em]">
                  {pickLocaleText(locale, item.category)}
                </p>
                <h3 className="mt-4 font-[family:var(--font-display)] text-4xl uppercase leading-none">
                  {pickLocaleText(locale, item.title)}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-7">{pickLocaleText(locale, item.summary)}</p>
              <p className="mt-4 rounded-2xl border-[3px] border-black bg-paper px-4 py-3 text-xs uppercase tracking-[0.2em]">
                {pickLocaleText(locale, item.highlight)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.techStack.map((stack) => (
                  <span
                    key={stack}
                    className="rounded-full border-[3px] border-black bg-white px-3 py-2 text-[11px] uppercase tracking-[0.2em]"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
