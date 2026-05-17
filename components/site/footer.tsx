import Link from "next/link";
import Image from "next/image";

import { pickLocaleText } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";

type FooterProps = {
  locale: Locale;
  settings?: SiteSettings;
};

const SITEMAP = [
  { id: "home", label: { id: "Beranda", en: "Home" }, href: "#hero" },
  { id: "services", label: { id: "Layanan", en: "Services" }, href: "#services" },
  { id: "portfolio", label: { id: "Portofolio", en: "Portfolio" }, href: "#portfolio" },
  { id: "catalog", label: { id: "Katalog", en: "Catalog" }, href: "/katalog" },
  { id: "team", label: { id: "Tim", en: "Team" }, href: "#team" },
  { id: "contact", label: { id: "Kontak", en: "Contact" }, href: "#contact" },
];

export function Footer({ locale, settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-[3px] border-true-black bg-deep-black">
      {/* Main footer area */}
      <div className="page-container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="mb-6 inline-block border-[3px] border-paper-white/20 px-4 py-2 font-body text-label-mono uppercase text-paper-white/50">
              ESTABLISHED 2024
            </div>
            <div className="mb-6">
              <div className="bg-true-black border-[3px] border-paper-white/20 p-2 inline-block neo-shadow-sm">
                <Image
                  src="/logo.png"
                  alt="MAVEN Forge Logo"
                  width={160}
                  height={42}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
            </div>
            <h2 className="mb-6 font-display text-display-2xl uppercase leading-none text-paper-white">
              MAVEN<br />FORGE.
            </h2>
            <p className="mb-8 border-l-[3px] border-primary-container pl-6 font-body text-body-md uppercase text-paper-white/60">
              {locale === "id"
                ? "Agency digital neo-brutal untuk website, e-commerce, mobile app, dan AI automation."
                : "Neo-brutal digital agency for websites, e-commerce, mobile apps, and AI automation."}
            </p>

            {/* Socials */}
            {settings?.socials && settings.socials.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {settings.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-[3px] border-paper-white/20 bg-paper-white/5 px-4 py-2 font-body text-label-mono uppercase text-paper-white/60 transition-all hover:border-secondary-container hover:bg-secondary-container hover:text-true-black"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sitemap */}
          <div className="md:col-span-3">
            <h3 className="mb-6 border-b-[3px] border-paper-white/20 pb-3 font-body text-label-mono uppercase text-paper-white/50">
              SITEMAP
            </h3>
            <ul className="space-y-4">
              {SITEMAP.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="font-display text-headline-md uppercase text-paper-white/80 transition-all hover:text-secondary-container hover:translate-x-1 inline-block"
                  >
                    {pickLocaleText(locale, item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-4">
            <h3 className="mb-6 border-b-[3px] border-paper-white/20 pb-3 font-body text-label-mono uppercase text-paper-white/50">
              CONTACT
            </h3>
            <div className="space-y-4">
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="block border-[3px] border-paper-white/10 bg-paper-white/5 p-4 transition-all hover:border-primary-container hover:bg-primary-container"
                >
                  <p className="font-body text-label-mono uppercase text-paper-white/50">EMAIL</p>
                  <p className="font-display text-headline-md uppercase text-paper-white">{settings.email}</p>
                </a>
              )}
              {settings?.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-[3px] border-paper-white/10 bg-paper-white/5 p-4 transition-all hover:border-secondary-container hover:bg-secondary-container"
                >
                  <p className="font-body text-label-mono uppercase text-paper-white/50">WHATSAPP</p>
                  <p className="font-display text-headline-md uppercase text-paper-white">{settings.whatsapp}</p>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-[3px] border-paper-white/10">
        <div className="page-container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="font-body text-label-mono uppercase text-paper-white/40">
            &copy; {year} MAVEN FORGE. ALL SYSTEMS OPERATIONAL.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-body text-label-mono uppercase text-paper-white/40">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
