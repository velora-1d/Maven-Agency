import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const services = pgTable("services", {
  id: varchar("id", { length: 191 }).primaryKey(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionId: text("description_id").notNull(),
  descriptionEn: text("description_en").notNull(),
  icon: varchar("icon", { length: 40 }).notNull(),
  blockColor: varchar("block_color", { length: 40 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true)
});

export const portfolioProjects = pgTable("portfolio_projects", {
  id: varchar("id", { length: 191 }).primaryKey(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  summaryId: text("summary_id").notNull(),
  summaryEn: text("summary_en").notNull(),
  categoryId: text("category_id").notNull(),
  categoryEn: text("category_en").notNull(),
  highlightId: text("highlight_id").notNull(),
  highlightEn: text("highlight_en").notNull(),
  image: text("image").notNull(),
  techStack: jsonb("tech_stack").$type<string[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true)
});

export const portfolioImages = pgTable("portfolio_images", {
  id: varchar("id", { length: 191 }).primaryKey(),
  projectId: varchar("project_id", { length: 191 }).notNull(),
  url: text("url").notNull(),
  altText: text("alt_text").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0)
});

export const teamMembers = pgTable("team_members", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  roleId: text("role_id").notNull(),
  roleEn: text("role_en").notNull(),
  bioId: text("bio_id").notNull(),
  bioEn: text("bio_en").notNull(),
  avatar: text("avatar").notNull(),
  socials: jsonb("socials")
    .$type<Array<{ label: string; url: string }>>()
    .notNull()
    .default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true)
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id", { length: 191 }).primaryKey(),
  clientName: varchar("client_name", { length: 191 }).notNull(),
  company: varchar("company", { length: 191 }).notNull(),
  quoteId: text("quote_id").notNull(),
  quoteEn: text("quote_en").notNull(),
  rating: integer("rating").notNull().default(5),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true)
});

export const catalogItems = pgTable("catalog_items", {
  id: varchar("id", { length: 191 }).primaryKey(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
  nameId: text("name_id").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionId: text("description_id").notNull(),
  descriptionEn: text("description_en").notNull(),
  categoryId: text("category_id").notNull(),
  categoryEn: text("category_en").notNull(),
  priceFrom: integer("price_from"),
  priceTo: integer("price_to"),
  priceLabelId: text("price_label_id").notNull(),
  priceLabelEn: text("price_label_en").notNull(),
  isPriceHidden: boolean("is_price_hidden").notNull().default(false),
  ctaUrl: text("cta_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true)
});

export const catalogItemFeatures = pgTable("catalog_item_features", {
  id: varchar("id", { length: 191 }).primaryKey(),
  itemId: varchar("item_id", { length: 191 }).notNull(),
  featureId: text("feature_id").notNull(),
  featureEn: text("feature_en").notNull(),
  sortOrder: integer("sort_order").notNull().default(0)
});

export const catalogItemTechnologies = pgTable("catalog_item_technologies", {
  id: varchar("id", { length: 191 }).primaryKey(),
  itemId: varchar("item_id", { length: 191 }).notNull(),
  label: varchar("label", { length: 191 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0)
});

export const siteSettings = pgTable("site_settings", {
  id: varchar("id", { length: 191 }).primaryKey(),
  heroBadgeId: text("hero_badge_id").notNull(),
  heroBadgeEn: text("hero_badge_en").notNull(),
  heroHeadlineId: text("hero_headline_id").notNull(),
  heroHeadlineEn: text("hero_headline_en").notNull(),
  heroSubheadlineId: text("hero_subheadline_id").notNull(),
  heroSubheadlineEn: text("hero_subheadline_en").notNull(),
  heroCtaLabelId: text("hero_cta_label_id").notNull(),
  heroCtaLabelEn: text("hero_cta_label_en").notNull(),
  heroCtaHref: text("hero_cta_href").notNull(),
  aboutHeadlineId: text("about_headline_id").notNull(),
  aboutHeadlineEn: text("about_headline_en").notNull(),
  aboutStoryId: text("about_story_id").notNull(),
  aboutStoryEn: text("about_story_en").notNull(),
  missionId: text("mission_id").notNull(),
  missionEn: text("mission_en").notNull(),
  visionId: text("vision_id").notNull(),
  visionEn: text("vision_en").notNull(),
  stats: jsonb("stats").notNull(),
  whyUs: jsonb("why_us").notNull(),
  contactHeadlineId: text("contact_headline_id").notNull(),
  contactHeadlineEn: text("contact_headline_en").notNull(),
  contactCopyId: text("contact_copy_id").notNull(),
  contactCopyEn: text("contact_copy_en").notNull(),
  whatsapp: text("whatsapp").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  addressId: text("address_id").notNull(),
  addressEn: text("address_en").notNull(),
  socials: jsonb("socials").notNull()
});

export const pageViews = pgTable("page_views", {
  id: varchar("id", { length: 191 }).primaryKey(),
  path: text("path").notNull(),
  locale: varchar("locale", { length: 10 }).notNull(),
  referrer: text("referrer").notNull().default("direct"),
  visitorId: varchar("visitor_id", { length: 191 }).notNull(),
  visitedAt: timestamp("visited_at").defaultNow().notNull()
});
