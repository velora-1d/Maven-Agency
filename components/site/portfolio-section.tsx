import Image from "next/image";
import { pickLocaleText } from "@/lib/i18n";
import type { Locale, PortfolioProject } from "@/lib/types";
import { AnimatedReveal } from "@/components/animated-reveal";

type PortfolioSectionProps = {
  locale: Locale;
  items: PortfolioProject[];
  labels: { featuredWork: string; noData: string };
};

const CARD_STYLES = [
  { bg: "bg-paper-white", accent: "bg-primary-container text-paper-white", num: "text-surface-dim" },
  { bg: "bg-true-black", accent: "bg-secondary-container text-true-black", num: "text-inverse-surface" },
  { bg: "bg-surface-container", accent: "bg-primary-container text-paper-white", num: "text-surface-dim" },
];

export function PortfolioSection({ locale, items, labels }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="section-border bg-surface-container-high">
      <div className="page-container py-section-padding">
        {/* Header */}
        <AnimatedReveal direction="up" className="mb-16 flex flex-col justify-between gap-6 border-b-[3px] border-true-black pb-12 md:flex-row md:items-end">
          <h2 className="font-display text-display-2xl uppercase leading-none text-true-black">
            {labels.featuredWork}
          </h2>
          <div className="flex items-center gap-4">
            <div className="border-[3px] border-true-black bg-secondary-container px-4 py-2 font-body text-label-mono uppercase text-paper-white neo-shadow">
              {items.length} PROJECTS
            </div>
          </div>
        </AnimatedReveal>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {items.slice(0, 3).map((project, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            return (
              <AnimatedReveal
                key={project.id}
                direction="up"
                delay={i * 150}
                className={`group relative overflow-hidden border-[3px] border-true-black neo-shadow transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1 ${style.bg} ${
                  i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5 md:mt-12" : "md:col-span-12"
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden border-b-[3px] border-true-black ${i === 2 ? "h-96" : "h-72"}`}>
                  <Image
                    src={
                      project.image ||
                      `https://images.unsplash.com/photo-${i === 0 ? "1481487196290-c152efe083f5" : i === 1 ? "1563986768609-322da13575f3" : "1467232004584-a241de8bcf5d"}?w=900&q=80`
                    }
                    alt={pickLocaleText(locale, project.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-true-black/20 transition-opacity duration-300 group-hover:opacity-0" />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between p-8 md:flex-row md:items-end">
                  <div>
                    <div className={`mb-4 inline-block border-[3px] border-true-black px-3 py-1 font-body text-label-mono uppercase neo-shadow-sm ${style.accent}`}>
                      {pickLocaleText(locale, project.category)}
                    </div>
                    <h3 className={`mb-2 font-display text-headline-md uppercase ${i === 1 ? "text-paper-white" : "text-true-black"}`}>
                      {pickLocaleText(locale, project.title)}
                    </h3>
                    <p className={`font-body text-body-md ${i === 1 ? "text-paper-white/80" : "text-on-surface-variant"}`}>
                      {pickLocaleText(locale, project.summary)}
                    </p>
                  </div>
                  <span className={`mt-6 font-display text-display-2xl leading-none ${style.num} md:mt-0`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Tech tags */}
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 border-t-[3px] border-true-black px-8 pb-6 pt-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`border-[3px] border-true-black px-3 py-1 font-body text-label-mono uppercase ${
                          i === 1
                            ? "bg-inverse-surface text-paper-white"
                            : "bg-paper-white text-true-black"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
