import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { pickLocaleText } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";

type ContactSectionProps = {
  locale: Locale;
  settings: SiteSettings;
  labels: {
    startProject: string;
  };
};

export function ContactSection({
  locale,
  settings,
  labels
}: ContactSectionProps) {
  return (
    <section id="contact" className="section-shell">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="brutal-card bg-signal p-8 text-ink">
          <span className="section-kicker bg-paper">Contact</span>
          <h2 className="mt-5 max-w-3xl font-[family:var(--font-display)] text-6xl uppercase leading-[0.9]">
            {pickLocaleText(locale, settings.contactHeadline)}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7">
            {pickLocaleText(locale, settings.contactCopy)}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-paper shadow-brutalSm"
            >
              {labels.startProject}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center rounded-full border-[3px] border-black bg-paper px-6 py-3 text-sm uppercase tracking-[0.2em] shadow-brutalSm"
            >
              {settings.email}
            </a>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="brutal-card bg-white p-6">
            <p className="text-xs uppercase tracking-[0.3em]">WhatsApp</p>
            <p className="mt-3 font-[family:var(--font-display)] text-3xl uppercase leading-none">
              {settings.whatsapp}
            </p>
          </div>
          <div className="brutal-card bg-mint p-6">
            <p className="text-xs uppercase tracking-[0.3em]">Phone</p>
            <p className="mt-3 font-[family:var(--font-display)] text-3xl uppercase leading-none">
              {settings.phone}
            </p>
          </div>
          <div className="brutal-card bg-sky p-6">
            <p className="text-xs uppercase tracking-[0.3em]">Address</p>
            <p className="mt-3 text-sm leading-7">
              {pickLocaleText(locale, settings.address)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {settings.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border-[3px] border-black bg-paper px-3 py-2 text-[11px] uppercase tracking-[0.2em]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
