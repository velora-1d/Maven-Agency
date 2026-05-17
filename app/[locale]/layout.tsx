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

  const title = isId 
    ? "MAVEN Forge — Jasa Pembuatan Website, Mobile App & AI Automation" 
    : "MAVEN Forge — Premium Web Development, Mobile Apps & AI Automation";
    
  const description = isId
    ? "MAVEN Forge adalah digital agency berkinerja tinggi yang berspesialisasi dalam pembuatan website custom, toko online e-commerce cepat, aplikasi mobile iOS/Android, serta integrasi AI automation untuk mempercepat operasional bisnis Anda."
    : "MAVEN Forge is a high-performance digital agency specializing in custom web development, blazing-fast e-commerce storefronts, iOS/Android mobile apps, and AI automation workflows to scale your business operations.";

  return {
    title,
    description,
    keywords: isId 
      ? ["jasa pembuatan website", "digital agency jakarta", "mobile app development", "AI automation indonesia", "web developer jakarta", "e-commerce development"]
      : ["web development agency", "mobile app developer", "AI automation agency", "custom software development", "e-commerce developer"],
    openGraph: {
      title,
      description,
      url: "https://maven.ve-lora.my.id",
      siteName: "MAVEN Forge",
      images: [
        {
          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
          width: 1200,
          height: 630,
          alt: "MAVEN Forge Digital Agency"
        }
      ],
      locale: isId ? "id_ID" : "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"]
    },
    metadataBase: new URL("https://maven.ve-lora.my.id")
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

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "MAVEN Forge",
    "url": "https://maven.ve-lora.my.id",
    "logo": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    "description": data.settings.heroSubheadline ? (locale === "id" ? data.settings.heroSubheadline.id : data.settings.heroSubheadline.en) : "Digital agency untuk website, e-commerce, mobile app, dan AI automation.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    },
    "telephone": data.settings.whatsapp || "+62 812-3456-7890",
    "email": data.settings.email || "hello@mavenforge.dev",
    "priceRange": "$$",
    "sameAs": data.settings.socials?.map(s => s.url) || [
      "https://instagram.com",
      "https://linkedin.com",
      "https://behance.net"
    ]
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }} />
      <PageViewTracker locale={locale} />
      <SiteHeader locale={locale} nav={copy.nav} />
      {children}
      <Footer locale={locale} settings={data.settings} />
    </div>
  );
}
