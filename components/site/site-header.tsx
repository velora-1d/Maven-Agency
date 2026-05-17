import Link from "next/link";

import { localeLabels } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/types";

type SiteHeaderProps = {
  locale: Locale;
  nav: Record<string, string>;
};

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const navItems = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}#services`, label: nav.services },
    { href: `/${locale}#portfolio`, label: nav.portfolio },
    { href: `/${locale}#testimonials`, label: nav.testimonials },
    { href: `/${locale}#team`, label: nav.team },
    { href: `/${locale}/katalog`, label: nav.catalog },
    { href: `/${locale}#contact`, label: nav.contact }
  ];

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-black bg-paper/95 backdrop-blur">
      <div className="section-shell flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:py-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-3 rounded-full border-[3px] border-black bg-signal px-5 py-3 text-ink shadow-brutalSm"
          >
            <span className="font-[family:var(--font-display)] text-3xl uppercase leading-none">
              MAVEN
            </span>
            <span className="rounded-full bg-paper px-3 py-1 text-[10px] uppercase tracking-[0.3em]">
              Forge
            </span>
          </Link>

          <div className="flex gap-2 lg:hidden">
            {Object.entries(localeLabels).map(([key, label]) => (
              <Link
                key={key}
                href={`/${key}`}
                className={cn(
                  "rounded-full border-[3px] border-black px-3 py-2 text-xs uppercase tracking-[0.2em]",
                  key === locale ? "bg-ink text-paper" : "bg-white"
                )}
              >
                {label.slice(0, 2)}
              </Link>
            ))}
          </div>
        </div>

        <nav className="hidden flex-wrap items-center justify-center gap-3 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border-[3px] border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] transition hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden gap-2 lg:flex">
          {Object.entries(localeLabels).map(([key, label]) => (
            <Link
              key={key}
              href={`/${key}`}
              className={cn(
                "rounded-full border-[3px] border-black px-3 py-2 text-xs uppercase tracking-[0.2em]",
                key === locale ? "bg-ink text-paper" : "bg-white"
              )}
            >
              {label.slice(0, 2)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
