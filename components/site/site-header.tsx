"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/types";

type SiteHeaderProps = {
  locale: Locale;
  nav: {
    home: string;
    services: string;
    portfolio: string;
    testimonials: string;
    team: string;
    catalog: string;
    contact: string;
  };
};

const navItems = (locale: Locale, nav: SiteHeaderProps["nav"]) => [
  { label: nav.home, href: `/${locale}#hero` },
  { label: nav.services, href: `/${locale}#services` },
  { label: nav.portfolio, href: `/${locale}#portfolio` },
  { label: nav.catalog, href: `/${locale}/katalog` },
  { label: nav.contact, href: `/${locale}#contact` },
];

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Swap locale in pathname — /id/xxx → /en/xxx
  function switchedPath(newLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || `/${newLocale}`;
  }

  const otherLocale: Locale = locale === "id" ? "en" : "id";

  return (
    <nav className="sticky top-0 z-50 w-full border-b-[3px] border-true-black bg-surface">
      <div className="page-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 transition-transform hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]"
        >
          <div className="bg-true-black border-[2px] border-true-black p-1.5 inline-block neo-shadow-sm">
            <Image
              src="/logo.png"
              alt="MAVEN Forge Logo"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
          <span className="font-display text-headline-md font-black text-primary tracking-tighter hidden sm:inline-block">
            MAVEN FORGE
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems(locale, nav).map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side: Lang switcher + CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language switcher */}
          <div className="flex overflow-hidden border-[3px] border-true-black">
            <Link
              href={switchedPath("id")}
              className={`px-3 py-1.5 font-body text-label-mono uppercase transition-colors ${
                locale === "id"
                  ? "bg-true-black text-paper-white"
                  : "bg-paper-white text-true-black hover:bg-surface-container"
              }`}
            >
              ID
            </Link>
            <div className="w-[3px] bg-true-black" />
            <Link
              href={switchedPath("en")}
              className={`px-3 py-1.5 font-body text-label-mono uppercase transition-colors ${
                locale === "en"
                  ? "bg-true-black text-paper-white"
                  : "bg-paper-white text-true-black hover:bg-surface-container"
              }`}
            >
              EN
            </Link>
          </div>

          {/* CTA */}
          <Link
            href={`/${locale}#contact`}
            className="border-[3px] border-true-black bg-primary-container px-6 py-2 font-display text-headline-md uppercase text-paper-white neo-shadow neo-hover hover:bg-secondary-container transition-colors"
          >
            START A PROJECT
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile lang switcher */}
          <div className="flex overflow-hidden border-[3px] border-true-black">
            <Link
              href={switchedPath("id")}
              className={`px-2.5 py-1 font-body text-[11px] uppercase ${
                locale === "id" ? "bg-true-black text-paper-white" : "bg-paper-white text-true-black"
              }`}
            >
              ID
            </Link>
            <div className="w-[3px] bg-true-black" />
            <Link
              href={switchedPath("en")}
              className={`px-2.5 py-1 font-body text-[11px] uppercase ${
                locale === "en" ? "bg-true-black text-paper-white" : "bg-paper-white text-true-black"
              }`}
            >
              EN
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="border-[3px] border-true-black bg-paper-white p-2 neo-shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none"
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-6 bg-true-black" />
            <span className="my-1 block h-0.5 w-6 bg-true-black" />
            <span className="block h-0.5 w-6 bg-true-black" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t-[3px] border-true-black bg-surface px-gutter py-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navItems(locale, nav).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-display text-headline-lg-mobile uppercase text-on-surface hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}#contact`}
              className="mt-4 border-[3px] border-true-black bg-primary-container px-6 py-3 text-center font-display text-headline-md uppercase text-paper-white neo-shadow"
              onClick={() => setMobileOpen(false)}
            >
              START A PROJECT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
