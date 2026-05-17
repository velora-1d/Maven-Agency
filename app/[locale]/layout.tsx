import type { Metadata } from "next";

import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { Footer } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/site-header";
import { assertLocale, getUiCopy, locales } from "@/lib/i18n";
import { getPublicSiteData } from "@/lib/store";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const isId = locale === "id";

  return {
    title: isId ? "Forge Masa Depan Digital Anda" : "Forge Your Digital Future",
    description: isId
      ? "Agency digital neo-brutal untuk website, e-commerce, mobile app, dan AI automation."
      : "A neo-brutal digital agency for websites, e-commerce, mobile apps, and AI automation."
  };
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const copy = getUiCopy(locale);
  const data = await getPublicSiteData();

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <PageViewTracker locale={locale} />
      <SiteHeader locale={locale} nav={copy.nav} />
      {children}
      <Footer locale={locale} settings={data.settings} />
    </div>
  );
}
