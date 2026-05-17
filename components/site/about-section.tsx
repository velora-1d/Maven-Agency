import { pickLocaleText } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";
import { AnimatedReveal } from "@/components/animated-reveal";
import { AnimatedCounter } from "@/components/animated-counter";

type AboutSectionProps = {
  locale: Locale;
  settings: SiteSettings;
  labels: { whyUs: string };
};

export function AboutSection({ locale, settings, labels }: AboutSectionProps) {
  return (
    <>
      {/* ── Stats / About Block ── */}
      <section id="about" className="section-border relative bg-paper-white">
        <div className="page-container py-section-padding">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

            {/* Left — story */}
            <AnimatedReveal direction="up" className="relative">
              <div className="pointer-events-none absolute -left-6 -top-6 z-0 h-24 w-24 border-[3px] border-true-black border-b-0 border-r-0" />
              <h2 className="relative z-10 mb-8 font-display text-headline-lg-mobile uppercase text-true-black md:text-headline-lg">
                WE BUILD <br />
                <span className="inline-block bg-true-black px-4 text-paper-white">
                  {pickLocaleText(locale, settings.aboutHeadline)}
                </span>
              </h2>
              <p className="mb-6 font-body text-body-lg text-on-surface-variant">
                {pickLocaleText(locale, settings.aboutStory)}
              </p>
            </AnimatedReveal>

            {/* Right — stat bento */}
            <div className="grid grid-cols-2 gap-6">
              {settings.stats.slice(0, 2).map((stat, i) => (
                <AnimatedReveal
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 150}
                  key={i}
                  className={`group relative overflow-hidden border-[3px] border-true-black p-8 neo-shadow ${
                    i % 2 === 0 ? "bg-surface-container" : "translate-y-8 bg-true-black"
                  }`}
                >
                  <div className={`absolute right-4 top-4 border-[3px] px-2 font-body text-label-mono ${
                    i % 2 === 0
                      ? "border-true-black bg-paper-white text-true-black"
                      : "border-paper-white bg-primary-container text-paper-white"
                  }`}>
                    IDX_0{i + 1}
                  </div>
                  <div className={`mb-4 font-display text-display-2xl leading-none transition-colors group-hover:text-secondary-container ${
                    i % 2 === 0 ? "text-primary-container" : "text-paper-white"
                  }`}>
                    <AnimatedCounter text={stat.value} />
                  </div>
                  <div className={`font-display text-headline-md uppercase ${
                    i % 2 === 0 ? "text-true-black" : "text-paper-white"
                  }`}>
                    {pickLocaleText(locale, stat.label)}
                  </div>
                </AnimatedReveal>
              ))}

              {settings.stats[2] && (
                <AnimatedReveal direction="up" delay={300} className="col-span-2 mt-8 flex items-end justify-between border-[3px] border-true-black bg-primary-container p-8 neo-shadow">
                  <div>
                    <div className="font-display text-headline-md uppercase text-paper-white">
                      {pickLocaleText(locale, settings.stats[2].label)}
                    </div>
                    <div className="font-display text-display-2xl leading-none text-true-black">
                      <AnimatedCounter text={settings.stats[2].value} />
                    </div>
                  </div>
                  <svg className="mb-4 h-20 w-20 text-true-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </AnimatedReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why MAVEN (editorial) ── */}
      <section className="section-border bg-surface-container-high py-section-padding">
        <div className="page-container">
          <div className="mb-16 flex flex-col items-end justify-between border-b-[3px] border-true-black pb-8 md:flex-row">
            <h2 className="m-0 font-display text-display-2xl uppercase leading-none text-true-black">
              {labels.whyUs.split(" ")[0]} {labels.whyUs.split(" ").slice(1).join(" ")}
            </h2>
            <div className="mt-6 border-[3px] border-true-black bg-secondary-container px-4 py-2 font-body text-label-mono uppercase text-paper-white neo-shadow md:mt-0">
              THE DIFFERENCE IS BRUTAL
            </div>
          </div>

          <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
            {/* Col 1 */}
            <AnimatedReveal direction="up" className="md:col-span-4 md:border-r-[3px] md:border-true-black md:pr-gutter">
              <div className="relative mb-8 border-[3px] border-true-black bg-paper-white p-6 neo-shadow">
                <div className="absolute -right-4 -top-4 border-[3px] border-true-black bg-primary-container px-3 py-1 font-display text-headline-md text-paper-white">
                  01
                </div>
                <h3 className="mb-4 font-display text-headline-md uppercase text-true-black">
                  NO NOISE.
                </h3>
                <p className="font-body text-body-md text-on-surface-variant">
                  {settings.whyUs[0]
                    ? pickLocaleText(locale, settings.whyUs[0].body)
                    : "We strip away the unnecessary. In a digital landscape cluttered with fluffy animations and generic templates, a stark, uncompromising design is the ultimate flex."}
                </p>
              </div>
              <div className="w-full border-[3px] border-true-black bg-paper-white p-6 neo-shadow flex flex-col items-center justify-center">
                <svg className="w-full h-auto max-h-[300px] text-true-black" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Grid */}
                  <defs>
                    <pattern id="brutalGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
                    </pattern>
                  </defs>
                  <rect width="400" height="320" fill="url(#brutalGrid)" />

                  {/* Brutalist Building Structure */}
                  {/* Main Tower */}
                  <rect x="70" y="30" width="260" height="290" fill="#F4F4F4" stroke="currentColor" strokeWidth="4" />
                  
                  {/* Concrete Pillar lines & sections */}
                  <rect x="92" y="50" width="46" height="270" fill="#E5E5E5" stroke="currentColor" strokeWidth="3" />
                  <rect x="156" y="50" width="88" height="270" fill="#E5E5E5" stroke="currentColor" strokeWidth="3" />
                  <rect x="262" y="50" width="46" height="270" fill="#E5E5E5" stroke="currentColor" strokeWidth="3" />

                  {/* Windows / Void Slots (Repetitive brutalist geometry) */}
                  <g fill="#1A1A1A">
                    {/* Left Pillar Slots */}
                    <rect x="103" y="70" width="24" height="36" />
                    <rect x="103" y="126" width="24" height="36" />
                    <rect x="103" y="182" width="24" height="36" />
                    <rect x="103" y="238" width="24" height="36" />

                    {/* Center Pillar Slots */}
                    <rect x="172" y="70" width="56" height="36" />
                    <rect x="172" y="126" width="56" height="36" />
                    <rect x="172" y="182" width="56" height="36" />
                    <rect x="172" y="238" width="56" height="36" />

                    {/* Right Pillar Slots */}
                    <rect x="273" y="70" width="24" height="36" />
                    <rect x="273" y="126" width="24" height="36" />
                    <rect x="273" y="182" width="24" height="36" />
                    <rect x="273" y="238" width="24" height="36" />
                  </g>

                  {/* Cantilever / Overhang Element (Classic Brutalism) */}
                  <rect x="40" y="116" width="320" height="42" fill="#D4D4D4" stroke="currentColor" strokeWidth="4" />
                  <text x="56" y="143" fontFamily="monospace" fontSize="18" fontWeight="bold" fill="#1A1A1A" letterSpacing="6">MAVEN // ARCHITECTURE</text>

                  {/* Ground Line */}
                  <line x1="20" y1="318" x2="380" y2="318" stroke="currentColor" strokeWidth="6" />
                </svg>
              </div>
            </AnimatedReveal>

            {/* Col 2 */}
            <AnimatedReveal direction="up" delay={200} className="md:col-span-8">
              <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2">
                {/* Mission */}
                <div className="relative border-[3px] border-true-black bg-true-black p-8 neo-shadow">
                  <div className="absolute -left-4 -top-4 border-[3px] border-true-black bg-secondary-container px-3 py-1 font-display text-headline-md text-paper-white">
                    02
                  </div>
                  <h3 className="mb-4 mt-4 font-display text-headline-md uppercase text-paper-white">
                    HIGH CONTRAST.
                  </h3>
                  <p className="font-body text-body-md text-paper-white/80">
                    {settings.whyUs[1]
                      ? pickLocaleText(locale, settings.whyUs[1].body)
                      : "Your brand needs to punch through the screen. We utilize stark palettes, massive typography, and thick borders to ensure your message is impossible to ignore."}
                  </p>
                </div>
                {/* Vision */}
                <div className="relative border-[3px] border-true-black bg-surface-container p-8 neo-shadow">
                  <div className="absolute -right-4 -top-4 border-[3px] border-true-black bg-paper-white px-3 py-1 font-display text-headline-md text-true-black">
                    03
                  </div>
                  <h3 className="mb-4 mt-4 font-display text-headline-md uppercase text-true-black">
                    ENGINEERED.
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant">
                    {settings.whyUs[2]
                      ? pickLocaleText(locale, settings.whyUs[2].body)
                      : "Beneath the aggressive exterior lies military-grade code. Fast, accessible, and structured to scale indefinitely."}
                  </p>
                </div>
              </div>

              {/* Mission & Vision blocks */}
              <div className="mt-gutter grid grid-cols-1 gap-gutter sm:grid-cols-2">
                <div className="group relative overflow-hidden border-[3px] border-true-black bg-primary-container p-8 neo-shadow transition-transform duration-300 hover:-translate-y-2">
                  <span className="absolute right-4 top-4 font-display text-headline-lg text-true-black opacity-20 transition-opacity group-hover:opacity-100">
                    M
                  </span>
                  <h3 className="mb-4 font-display text-headline-md uppercase text-paper-white relative z-10">
                    THE MISSION
                  </h3>
                  <p className="border-l-4 border-paper-white pl-4 font-body text-body-md font-bold uppercase text-paper-white relative z-10">
                    {pickLocaleText(locale, settings.mission)}
                  </p>
                </div>
                <div className="group relative overflow-hidden border-[3px] border-true-black bg-secondary-container p-8 neo-shadow transition-transform duration-300 hover:-translate-y-2 sm:mt-12">
                  <span className="absolute right-4 top-4 font-display text-headline-lg text-true-black opacity-20 transition-opacity group-hover:opacity-100">
                    V
                  </span>
                  <h3 className="mb-4 font-display text-headline-md uppercase text-true-black relative z-10">
                    THE VISION
                  </h3>
                  <p className="inline-block border-[3px] border-true-black bg-surface px-4 py-2 font-body text-body-md font-bold uppercase text-true-black relative z-10">
                    {pickLocaleText(locale, settings.vision)}
                  </p>
                </div>
              </div>

              {/* CTA bar */}
              <div className="mt-gutter flex flex-col items-center justify-between border-[3px] border-true-black bg-primary-container p-8 neo-shadow sm:flex-row">
                <h3 className="mb-4 font-display text-headline-md uppercase text-paper-white sm:mb-0">
                  READY TO DROP THE HAMMER?
                </h3>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border-[3px] border-paper-white bg-true-black px-8 py-3 font-display text-headline-md uppercase text-paper-white neo-hover transition-colors hover:bg-secondary-container hover:border-true-black hover:text-true-black"
                >
                  INITIATE
                </a>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>
    </>
  );
}
