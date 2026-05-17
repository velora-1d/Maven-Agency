import { pickLocaleText } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";
import { AnimatedReveal } from "@/components/animated-reveal";

type ContactSectionProps = {
  locale: Locale;
  settings: SiteSettings;
};

export function ContactSection({ locale, settings }: ContactSectionProps) {
  return (
    <section id="contact" className="section-border bg-true-black py-section-padding">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

          {/* Left — headline + info */}
          <AnimatedReveal direction="right" className="md:col-span-5">
            <h2 className="mb-8 font-display text-display-2xl uppercase leading-none text-paper-white">
              {pickLocaleText(locale, settings.contactHeadline) || "LET'S BUILD SOMETHING BRUTAL."}
            </h2>

            <div className="space-y-0">
              {/* Email */}
              <div className="group flex items-center justify-between border-[3px] border-paper-white/20 bg-paper-white/5 p-6 transition-all hover:bg-primary-container hover:border-primary-container">
                <div>
                  <p className="font-body text-label-mono uppercase text-paper-white/50">EMAIL</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-display text-headline-md uppercase text-paper-white transition-colors group-hover:text-paper-white"
                  >
                    {settings.email}
                  </a>
                </div>
                <svg className="h-6 w-6 text-paper-white/30 transition-colors group-hover:text-paper-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* WhatsApp */}
              <div className="group flex items-center justify-between border-[3px] border-t-0 border-paper-white/20 bg-paper-white/5 p-6 transition-all hover:bg-secondary-container hover:border-secondary-container">
                <div>
                  <p className="font-body text-label-mono uppercase text-paper-white/50">WHATSAPP</p>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-headline-md uppercase text-paper-white"
                  >
                    {settings.whatsapp}
                  </a>
                </div>
                <svg className="h-6 w-6 text-paper-white/30 transition-colors group-hover:text-true-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>

              {/* Address */}
              {settings.address && (
                <div className="flex items-start justify-between border-[3px] border-t-0 border-paper-white/20 bg-paper-white/5 p-6">
                  <div>
                    <p className="mb-1 font-body text-label-mono uppercase text-paper-white/50">LOCATION</p>
                    <p className="font-body text-body-md uppercase text-paper-white">
                      {pickLocaleText(locale, settings.address)}
                    </p>
                  </div>
                  <svg className="mt-1 h-6 w-6 flex-shrink-0 text-paper-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>
          </AnimatedReveal>

          {/* Right — CTA big block */}
          <AnimatedReveal direction="left" delay={200} className="relative md:col-span-7">
            <div className="pointer-events-none absolute -right-4 -top-4 h-full w-full border-[3px] border-secondary-container" />
            <div className="relative z-10 flex flex-col justify-between border-[3px] border-paper-white bg-surface p-12 md:h-full">
              <div>
                <div className="mb-8 inline-block -rotate-1 border-[3px] border-true-black bg-secondary-container px-4 py-2 font-body text-label-mono uppercase text-paper-white neo-shadow-sm">
                  OPEN FOR PROJECTS
                </div>
                <h3 className="mb-6 font-display text-headline-lg-mobile uppercase text-true-black md:text-headline-lg">
                  {pickLocaleText(locale, settings.contactCopy) || "EVERY GREAT SYSTEM STARTS WITH ONE CONVERSATION. START YOURS NOW."}
                </h3>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Halo MAVEN Forge, saya ingin konsultasi proyek.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-[3px] border-true-black bg-primary-container px-8 py-4 font-display text-headline-md uppercase text-paper-white neo-shadow neo-hover transition-colors hover:bg-secondary-container hover:text-true-black"
                >
                  CHAT VIA WA
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center justify-center border-[3px] border-true-black bg-true-black px-8 py-4 font-display text-headline-md uppercase text-paper-white neo-shadow neo-hover"
                >
                  SEND EMAIL
                </a>
              </div>
            </div>
          </AnimatedReveal>

        </div>
      </div>
    </section>
  );
}
