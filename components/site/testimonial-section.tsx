import { pickLocaleText } from "@/lib/i18n";
import type { Locale, Testimonial } from "@/lib/types";
import { AnimatedReveal } from "@/components/animated-reveal";

type TestimonialSectionProps = {
  locale: Locale;
  items: Testimonial[];
};

const QUOTE_STYLES = [
  { bg: "bg-true-black", quote: "text-paper-white", meta: "text-surface-dim", border: "border-secondary-container", accBg: "bg-secondary-container", accText: "text-true-black" },
  { bg: "bg-primary-container", quote: "text-paper-white", meta: "text-paper-white/70", border: "border-true-black", accBg: "bg-true-black", accText: "text-paper-white" },
  { bg: "bg-surface-container-lowest", quote: "text-true-black", meta: "text-on-surface-variant", border: "border-primary-container", accBg: "bg-primary-container", accText: "text-paper-white" },
];

export function TestimonialSection({ locale, items }: TestimonialSectionProps) {
  if (!items.length) return null;

  return (
    <section className="section-border bg-paper-white py-section-padding">
      <div className="page-container">
        {/* Header */}
        <AnimatedReveal direction="up" className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-display-2xl uppercase leading-none text-true-black">
            CLIENT<br />
            <span className="text-primary-container">DISPATCH.</span>
          </h2>
          <p className="max-w-sm border-l-[3px] border-secondary-container pl-6 font-body text-body-lg uppercase text-on-surface-variant">
            REAL RESULTS. REAL CLIENTS. ZERO FLUFF.
          </p>
        </AnimatedReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.slice(0, 3).map((item, i) => {
            const style = QUOTE_STYLES[i % QUOTE_STYLES.length];
            return (
              <AnimatedReveal
                key={item.id}
                direction="up"
                delay={i * 150}
                className={`relative border-[3px] border-true-black p-8 neo-shadow transition-transform duration-200 hover:-translate-y-1 hover:translate-x-1 ${style.bg} ${i === 1 ? "md:mt-8" : ""}`}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <svg key={j} className={`h-4 w-4 ${style.accText === "text-true-black" ? "text-true-black" : "text-secondary-container"}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className={`mb-6 border-l-[3px] ${style.border} pl-4 font-body text-body-lg ${style.quote}`}>
                  &ldquo;{pickLocaleText(locale, item.quote)}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className={`border-t-[3px] border-true-black pt-4 ${style.accBg} -m-8 mt-0 p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-display text-headline-md uppercase ${style.accText}`}>
                        {item.clientName}
                      </p>
                      <p className={`font-body text-label-mono uppercase ${style.accText} opacity-70`}>
                        {item.company}
                      </p>
                    </div>
                    <svg className={`h-6 w-6 ${style.accText}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
