import { AboutSection } from "@/components/site/about-section";
import { CatalogExplorer } from "@/components/site/catalog-explorer";
import { ContactSection } from "@/components/site/contact-section";
import { HeroSection } from "@/components/site/hero-section";
import { PortfolioSection } from "@/components/site/portfolio-section";
import { ServicesSection } from "@/components/site/services-section";
import { TeamSection } from "@/components/site/team-section";
import { TestimonialSection } from "@/components/site/testimonial-section";
import { assertLocale, getUiCopy } from "@/lib/i18n";
import { getPublicSiteData } from "@/lib/store";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const copy = getUiCopy(locale);
  const data = await getPublicSiteData();

  return (
    <main>
      <HeroSection locale={locale} settings={data.settings} labels={copy.labels} />
      <AboutSection locale={locale} settings={data.settings} labels={copy.labels} />
      <ServicesSection locale={locale} items={data.services} labels={copy.labels} />
      <PortfolioSection locale={locale} items={data.portfolio} labels={copy.labels} />
      <CatalogExplorer locale={locale} items={data.catalog} labels={copy.labels} />
      <TestimonialSection locale={locale} items={data.testimonials} />
      <TeamSection locale={locale} items={data.team} />
      <ContactSection locale={locale} settings={data.settings} />
    </main>
  );
}
