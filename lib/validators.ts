import { z } from "zod";

export const localizedTextSchema = z.object({
  id: z.string().min(1),
  en: z.string().min(1)
});

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url()
});

export const statBlockSchema = z.object({
  value: z.string().min(1),
  label: localizedTextSchema
});

export const whyUsItemSchema = z.object({
  title: localizedTextSchema,
  body: localizedTextSchema
});

export const serviceSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title: localizedTextSchema,
  description: localizedTextSchema,
  icon: z.string().min(1),
  blockColor: z.string().min(1),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export const portfolioSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title: localizedTextSchema,
  summary: localizedTextSchema,
  category: localizedTextSchema,
  highlight: localizedTextSchema,
  image: z.string(),
  techStack: z.array(z.string().min(1)).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export const teamSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  role: localizedTextSchema,
  bio: localizedTextSchema,
  avatar: z.string(),
  socials: z.array(socialLinkSchema).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export const testimonialSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().min(1),
  company: z.string().min(1),
  quote: localizedTextSchema,
  rating: z.number().int().min(1).max(5).default(5),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export const catalogSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  name: localizedTextSchema,
  description: localizedTextSchema,
  category: localizedTextSchema,
  technologyLabels: z.array(z.string().min(1)).default([]),
  features: z.array(localizedTextSchema).default([]),
  priceFrom: z.number().nullable(),
  priceTo: z.number().nullable(),
  priceLabel: localizedTextSchema,
  isPriceHidden: z.boolean().default(false),
  ctaUrl: z.string().url(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export const settingsSchema = z.object({
  heroBadge: localizedTextSchema,
  heroHeadline: localizedTextSchema,
  heroSubheadline: localizedTextSchema,
  heroCtaLabel: localizedTextSchema,
  heroCtaHref: z.string().min(1),
  heroImage1: z.string().optional(),
  heroImage2: z.string().optional(),
  aboutHeadline: localizedTextSchema,
  aboutStory: localizedTextSchema,
  mission: localizedTextSchema,
  vision: localizedTextSchema,
  stats: z.array(statBlockSchema).min(1),
  whyUs: z.array(whyUsItemSchema).min(1),
  contactHeadline: localizedTextSchema,
  contactCopy: localizedTextSchema,
  whatsapp: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  address: localizedTextSchema,
  socials: z.array(socialLinkSchema).default([])
});

export const resourceSchemas = {
  services: serviceSchema,
  portfolio: portfolioSchema,
  team: teamSchema,
  testimonials: testimonialSchema,
  catalog: catalogSchema
} as const;
