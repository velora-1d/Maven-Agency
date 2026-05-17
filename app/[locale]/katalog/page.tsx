import type { Metadata } from "next";

import { CatalogExplorer } from "@/components/site/catalog-explorer";
import { assertLocale, getUiCopy } from "@/lib/i18n";
import { getPublicSiteData } from "@/lib/store";

type CatalogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: CatalogPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);

  return {
    title: locale === "id" ? "Katalog Layanan" : "Service Catalog",
    description:
      locale === "id"
        ? "Pilih paket layanan MAVEN Forge berdasarkan kategori, teknologi, dan estimasi harga."
        : "Browse MAVEN Forge packages by category, technology, and price estimate."
  };
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const data = await getPublicSiteData();
  const copy = getUiCopy(locale);

  return (
    <main>
      {/* Hero */}
      <section className="section-border bg-true-black py-section-padding">
        <div className="page-container">
          <div className="relative">
            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 border-[3px] border-secondary-container" />
            <div className="mb-6 inline-block -rotate-1 border-[3px] border-paper-white/20 px-4 py-2 font-body text-label-mono uppercase text-paper-white/60">
              {copy.nav.catalog}
            </div>
            <h1 className="mb-6 font-display text-headline-lg-mobile uppercase leading-none text-paper-white md:text-display-2xl">
              SOLUTION<br />
              <span className="text-secondary-container">CATALOG.</span>
            </h1>
            <p className="max-w-2xl border-l-[3px] border-primary-container pl-6 font-body text-body-lg uppercase text-paper-white/60">
              {locale === "id"
                ? "Paket digital yang siap dibentuk sesuai ritme bisnis Anda. Filter berdasarkan kategori, teknologi, dan harga."
                : "Digital packages ready to be forged around your business rhythm. Filter by category, technology, and price."}
            </p>
          </div>
        </div>
      </section>

      {/* Catalog content (all items, no limit) */}
      <CatalogExplorer
        locale={locale}
        items={data.catalog}
        labels={copy.labels}
        showAll
      />
    </main>
  );
}
