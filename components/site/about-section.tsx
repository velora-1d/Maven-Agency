import { pickLocaleText } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";

type AboutSectionProps = {
  locale: Locale;
  settings: SiteSettings;
  labels: {
    whyUs: string;
  };
};

export function AboutSection({ locale, settings, labels }: AboutSectionProps) {
  return (
    <section id="about" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="brutal-card bg-ink p-8 text-paper">
          <p className="text-xs uppercase tracking-[0.3em]">About</p>
          <h2 className="mt-4 font-[family:var(--font-display)] text-5xl uppercase leading-none sm:text-6xl">
            {pickLocaleText(locale, settings.aboutHeadline)}
          </h2>
          <p className="mt-5 text-sm leading-7 text-paper/80 sm:text-base">
            {pickLocaleText(locale, settings.aboutStory)}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border-[3px] border-paper bg-paper p-4 text-ink">
              <p className="text-xs uppercase tracking-[0.25em]">Mission</p>
              <p className="mt-3 text-sm leading-7">
                {pickLocaleText(locale, settings.mission)}
              </p>
            </div>
            <div className="rounded-[24px] border-[3px] border-paper bg-transparent p-4">
              <p className="text-xs uppercase tracking-[0.25em]">Vision</p>
              <p className="mt-3 text-sm leading-7">
                {pickLocaleText(locale, settings.vision)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-3">
            {settings.stats.map((stat) => (
              <div key={stat.value} className="brutal-card bg-white p-5">
                <p className="font-[family:var(--font-display)] text-5xl uppercase leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em]">
                  {pickLocaleText(locale, stat.label)}
                </p>
              </div>
            ))}
          </div>

          <div className="brutal-card grid-paper bg-blaze p-6 text-ink">
            <p className="text-xs uppercase tracking-[0.3em]">{labels.whyUs}</p>
            <div className="mt-6 grid gap-4">
              {settings.whyUs.map((item, index) => (
                <div key={index} className="rounded-[24px] border-[3px] border-black bg-paper p-5">
                  <p className="text-[11px] uppercase tracking-[0.25em]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-[family:var(--font-display)] text-3xl uppercase leading-none">
                    {pickLocaleText(locale, item.title)}
                  </h3>
                  <p className="mt-3 text-sm leading-7">
                    {pickLocaleText(locale, item.body)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
