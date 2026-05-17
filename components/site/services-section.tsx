import { pickLocaleText } from "@/lib/i18n";
import type { Locale, ServiceItem } from "@/lib/types";
import { AnimatedReveal } from "@/components/animated-reveal";

const SERVICE_STYLES = [
  {
    bg: "bg-primary-container",
    labelBg: "bg-true-black",
    labelText: "text-paper-white",
    labelBorder: "border-true-black shadow-[4px_4px_0px_0px_theme(colors.paper-white)]",
    numText: "text-true-black opacity-30",
    titleText: "text-paper-white",
    bodyText: "text-paper-white border-l-[3px] border-true-black",
    tagBg: "bg-true-black text-paper-white border-true-black",
    shadow: "bg-true-black",
    statusLabel: "Sys.Active",
  },
  {
    bg: "bg-secondary-container",
    labelBg: "bg-paper-white",
    labelText: "text-true-black",
    labelBorder: "border-true-black shadow-[4px_4px_0px_0px_theme(colors.true-black)]",
    numText: "text-paper-white opacity-40",
    titleText: "text-true-black",
    bodyText: "text-true-black border-l-[3px] border-paper-white",
    tagBg: "bg-paper-white text-true-black border-true-black",
    shadow: "bg-true-black",
    statusLabel: "Comm.Link",
  },
  {
    bg: "bg-surface-container-lowest",
    labelBg: "bg-primary-container",
    labelText: "text-paper-white",
    labelBorder: "border-true-black shadow-[4px_4px_0px_0px_theme(colors.true-black)]",
    numText: "text-surface-dim",
    titleText: "text-true-black",
    bodyText: "text-true-black border-l-[3px] border-secondary-container",
    tagBg: "bg-secondary-container text-true-black border-true-black",
    shadow: "bg-true-black",
    statusLabel: "Handheld.OS",
  },
  {
    bg: "bg-true-black",
    labelBg: "bg-surface-container-lowest",
    labelText: "text-true-black",
    labelBorder: "border-true-black shadow-[4px_4px_0px_0px_theme(colors.primary-container)]",
    numText: "text-inverse-surface",
    titleText: "text-paper-white",
    bodyText: "text-surface-dim border-l-[3px] border-primary-container",
    tagBg: "bg-surface-container-lowest text-true-black border-true-black",
    shadow: "bg-secondary-container",
    statusLabel: "Core.Net",
  },
];

export function ServicesSection({
  locale,
  items,
}: {
  locale: Locale;
  items: ServiceItem[];
  labels: { noData: string };
}) {
  return (
    <section id="services" className="section-border bg-surface">
      <div className="page-container py-section-padding">
        {/* Header */}
        <AnimatedReveal direction="up" className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div>
            <h2 className="font-display text-display-2xl uppercase leading-[0.85] text-true-black tracking-tight">
              CAPABILITIES<br />
              <span className="text-primary-container">MATRIX.</span>
            </h2>
          </div>
          <div className="relative max-w-md border-[3px] border-true-black bg-surface-container-lowest p-6">
            <div className="absolute right-0 top-0 h-4 w-4 border-b-[3px] border-l-[3px] border-true-black bg-secondary-container" />
            <p className="font-body text-body-md uppercase text-on-surface">
              WE ENGINEER DIGITAL SYSTEMS DESIGNED FOR EXTREME PERFORMANCE. NO FLUFF. PURE LEVERAGE.
            </p>
          </div>
        </AnimatedReveal>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {items.map((item, i) => {
            const style = SERVICE_STYLES[i % SERVICE_STYLES.length];
            return (
              <AnimatedReveal key={item.id} direction="up" delay={i * 150} className="group relative h-full">
                {/* Hard shadow offset layer */}
                <div className={`absolute inset-0 translate-x-[6px] translate-y-[6px] ${style.shadow}`} />
                <article className={`relative z-10 flex h-full flex-col border-[3px] border-true-black p-8 transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 sm:p-12 ${style.bg}`}>
                  <div className="mb-16 flex items-start justify-between">
                    <div className={`-ml-4 -mt-4 border-[3px] px-3 py-1 font-body text-label-mono uppercase tracking-wider ${style.labelBg} ${style.labelText} ${style.labelBorder}`}>
                      {style.statusLabel}
                    </div>
                    <span className={`font-display text-display-2xl leading-none ${style.numText}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className={`mb-4 font-display text-headline-lg uppercase leading-none ${style.titleText}`}>
                      {pickLocaleText(locale, item.title)}
                    </h3>
                    <p className={`mb-6 pl-4 font-body text-body-lg uppercase ${style.bodyText}`}>
                      {pickLocaleText(locale, item.description)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(item.icon ? [item.icon] : []).map((tag) => (
                        <span key={tag} className={`border-[3px] px-3 py-1 font-body text-label-mono uppercase ${style.tagBg}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
