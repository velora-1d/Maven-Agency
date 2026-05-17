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
    <main className="section-shell">
      <section className="noise brutal-card relative overflow-hidden bg-ink px-6 py-10 text-paper">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-[3px] border-black bg-mint" />
        <span className="section-kicker relative z-10 bg-paper text-ink">
          {copy.nav.catalog}
        </span>
        <h1 className="relative z-10 mt-6 max-w-4xl font-[family:var(--font-display)] text-6xl uppercase leading-[0.9] sm:text-7xl">
          {locale === "id"
            ? "Paket digital yang siap dibentuk sesuai ritme bisnis Anda."
            : "Digital packages ready to be forged around your business rhythm."}
        </h1>
        <p className="relative z-10 mt-4 max-w-2xl text-sm text-paper/80 sm:text-base">
          {locale === "id"
            ? "Filter berdasarkan kategori, teknologi, dan harga untuk menemukan paket yang paling mendekati target Anda."
            : "Filter by category, technology, and price to find the package closest to your target."}
        </p>
      </section>

      <div className="mt-12">
        <CatalogExplorer locale={locale} items={data.catalog} labels={copy.labels} />
      </div>
    </main>
  );
}
