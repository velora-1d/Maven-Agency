export type Locale = "id" | "en";

export type LocalizedText = {
  id: string;
  en: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type StatBlock = {
  value: string;
  label: LocalizedText;
};

export type WhyUsItem = {
  title: LocalizedText;
  body: LocalizedText;
};

export type ServiceItem = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  blockColor: string;
  isActive: boolean;
  sortOrder: number;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: LocalizedText;
  highlight: LocalizedText;
  image: string;
  isActive: boolean;
  sortOrder: number;
  techStack: string[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  avatar: string;
  socials: SocialLink[];
  isActive: boolean;
  sortOrder: number;
};

export type Testimonial = {
  id: string;
  clientName: string;
  company: string;
  quote: LocalizedText;
  rating: number;
  isActive: boolean;
  sortOrder: number;
};

export type CatalogItem = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  technologyLabels: string[];
  features: LocalizedText[];
  priceFrom: number | null;
  priceTo: number | null;
  priceLabel: LocalizedText;
  isPriceHidden: boolean;
  ctaUrl: string;
  isActive: boolean;
  sortOrder: number;
};

export type SiteSettings = {
  heroBadge: LocalizedText;
  heroHeadline: LocalizedText;
  heroSubheadline: LocalizedText;
  heroCtaLabel: LocalizedText;
  heroCtaHref: string;
  heroImage1: string;
  heroImage2: string;
  aboutHeadline: LocalizedText;
  aboutStory: LocalizedText;
  mission: LocalizedText;
  vision: LocalizedText;
  stats: StatBlock[];
  whyUs: WhyUsItem[];
  contactHeadline: LocalizedText;
  contactCopy: LocalizedText;
  whatsapp: string;
  phone: string;
  email: string;
  address: LocalizedText;
  socials: SocialLink[];
};

export type PageView = {
  id: string;
  path: string;
  locale: Locale;
  referrer: string;
  visitorId: string;
  visitedAt: string;
};

export type DashboardMetrics = {
  totalViews: number;
  uniqueVisitors: number;
  topPages: Array<{ path: string; total: number }>;
  topReferrers: Array<{ referrer: string; total: number }>;
  activeCounts: Array<{ label: string; total: number }>;
};

export type PublicSiteData = {
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  team: TeamMember[];
  testimonials: Testimonial[];
  catalog: CatalogItem[];
  settings: SiteSettings;
};

export type AdminResourceKey =
  | "services"
  | "portfolio"
  | "team"
  | "testimonials"
  | "catalog";
