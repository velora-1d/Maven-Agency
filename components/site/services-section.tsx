import { pickLocaleText } from "@/lib/i18n";
import type { Locale, ServiceItem } from "@/lib/types";

export function ServicesSection({
  locale,
  items
}: {
  locale: Locale;
  items: ServiceItem[];
  labels: {
    noData: string;
  };
}) {
  return (
    <section id="services" className="section-shell">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="section-kicker">Services</span>
          <h2 className="mt-5 font-[family:var(--font-display)] text-5xl uppercase leading-none sm:text-6xl">
            Build Loud. Ship Sharp.
          </h2>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="brutal-card p-6"
            style={{ backgroundColor: item.blockColor }}
          >
            <p className="text-xs uppercase tracking-[0.3em]">{item.icon}</p>
            <h3 className="mt-3 font-[family:var(--font-display)] text-4xl uppercase leading-none">
              {pickLocaleText(locale, item.title)}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7">
              {pickLocaleText(locale, item.description)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
