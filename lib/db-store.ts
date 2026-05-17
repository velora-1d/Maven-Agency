import "server-only";

import { randomUUID } from "node:crypto";

import { hashSync } from "bcryptjs";
import { and, asc, desc, eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import {
  seedCatalog,
  seedPageViews,
  seedPortfolio,
  seedServices,
  seedSettings,
  seedTeam,
  seedTestimonials
} from "@/lib/seed";
import type {
  AdminResourceKey,
  CatalogItem,
  DashboardMetrics,
  PageView,
  PortfolioProject,
  PublicSiteData,
  ServiceItem,
  SiteSettings,
  TeamMember,
  Testimonial
} from "@/lib/types";
import {
  catalogItemFeatures,
  catalogItemTechnologies,
  catalogItems,
  pageViews,
  portfolioProjects,
  services,
  siteSettings,
  teamMembers,
  testimonials,
  users
} from "@/drizzle/schema";

type CatalogFeatureRow = typeof catalogItemFeatures.$inferSelect;
type CatalogTechnologyRow = typeof catalogItemTechnologies.$inferSelect;

declare global {
  var __mavenDbSeedPromise: Promise<void> | undefined;
}

function getDatabase() {
  const db = getDb();

  if (!db) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return db;
}

function toServiceItem(row: typeof services.$inferSelect): ServiceItem {
  return {
    id: row.id,
    slug: row.slug,
    title: {
      id: row.titleId,
      en: row.titleEn
    },
    description: {
      id: row.descriptionId,
      en: row.descriptionEn
    },
    icon: row.icon,
    blockColor: row.blockColor,
    isActive: row.isActive,
    sortOrder: row.sortOrder
  };
}

function toPortfolioItem(row: typeof portfolioProjects.$inferSelect): PortfolioProject {
  return {
    id: row.id,
    slug: row.slug,
    title: {
      id: row.titleId,
      en: row.titleEn
    },
    summary: {
      id: row.summaryId,
      en: row.summaryEn
    },
    category: {
      id: row.categoryId,
      en: row.categoryEn
    },
    highlight: {
      id: row.highlightId,
      en: row.highlightEn
    },
    image: row.image,
    techStack: row.techStack ?? [],
    isActive: row.isActive,
    sortOrder: row.sortOrder
  };
}

function toTeamMember(row: typeof teamMembers.$inferSelect): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: {
      id: row.roleId,
      en: row.roleEn
    },
    bio: {
      id: row.bioId,
      en: row.bioEn
    },
    avatar: row.avatar,
    socials: row.socials ?? [],
    isActive: row.isActive,
    sortOrder: row.sortOrder
  };
}

function toTestimonial(row: typeof testimonials.$inferSelect): Testimonial {
  return {
    id: row.id,
    clientName: row.clientName,
    company: row.company,
    quote: {
      id: row.quoteId,
      en: row.quoteEn
    },
    rating: row.rating,
    isActive: row.isActive,
    sortOrder: row.sortOrder
  };
}

function buildCatalogItems(
  itemRows: Array<typeof catalogItems.$inferSelect>,
  featureRows: CatalogFeatureRow[],
  technologyRows: CatalogTechnologyRow[]
): CatalogItem[] {
  return itemRows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: {
      id: row.nameId,
      en: row.nameEn
    },
    description: {
      id: row.descriptionId,
      en: row.descriptionEn
    },
    category: {
      id: row.categoryId,
      en: row.categoryEn
    },
    technologyLabels: technologyRows
      .filter((entry) => entry.itemId === row.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((entry) => entry.label),
    features: featureRows
      .filter((entry) => entry.itemId === row.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((entry) => ({
        id: entry.featureId,
        en: entry.featureEn
      })),
    priceFrom: row.priceFrom,
    priceTo: row.priceTo,
    priceLabel: {
      id: row.priceLabelId,
      en: row.priceLabelEn
    },
    isPriceHidden: row.isPriceHidden,
    ctaUrl: row.ctaUrl,
    isActive: row.isActive,
    sortOrder: row.sortOrder
  }));
}

function toSettings(row: typeof siteSettings.$inferSelect): SiteSettings {
  return {
    heroBadge: {
      id: row.heroBadgeId,
      en: row.heroBadgeEn
    },
    heroHeadline: {
      id: row.heroHeadlineId,
      en: row.heroHeadlineEn
    },
    heroSubheadline: {
      id: row.heroSubheadlineId,
      en: row.heroSubheadlineEn
    },
    heroCtaLabel: {
      id: row.heroCtaLabelId,
      en: row.heroCtaLabelEn
    },
    heroCtaHref: row.heroCtaHref,
    aboutHeadline: {
      id: row.aboutHeadlineId,
      en: row.aboutHeadlineEn
    },
    aboutStory: {
      id: row.aboutStoryId,
      en: row.aboutStoryEn
    },
    mission: {
      id: row.missionId,
      en: row.missionEn
    },
    vision: {
      id: row.visionId,
      en: row.visionEn
    },
    stats: row.stats as SiteSettings["stats"],
    whyUs: row.whyUs as SiteSettings["whyUs"],
    contactHeadline: {
      id: row.contactHeadlineId,
      en: row.contactHeadlineEn
    },
    contactCopy: {
      id: row.contactCopyId,
      en: row.contactCopyEn
    },
    whatsapp: row.whatsapp,
    phone: row.phone,
    email: row.email,
    address: {
      id: row.addressId,
      en: row.addressEn
    },
    socials: row.socials as SiteSettings["socials"]
  };
}

async function seedCatalogTables(items: CatalogItem[]) {
  const db = getDatabase();

  await db.insert(catalogItems).values(
    items.map((item) => ({
      id: item.id,
      slug: item.slug,
      nameId: item.name.id,
      nameEn: item.name.en,
      descriptionId: item.description.id,
      descriptionEn: item.description.en,
      categoryId: item.category.id,
      categoryEn: item.category.en,
      priceFrom: item.priceFrom,
      priceTo: item.priceTo,
      priceLabelId: item.priceLabel.id,
      priceLabelEn: item.priceLabel.en,
      isPriceHidden: item.isPriceHidden,
      ctaUrl: item.ctaUrl,
      sortOrder: item.sortOrder,
      isActive: item.isActive
    }))
  );

  const featureValues = items.flatMap((item) =>
    item.features.map((feature, index) => ({
      id: `${item.id}-feature-${index + 1}`,
      itemId: item.id,
      featureId: feature.id,
      featureEn: feature.en,
      sortOrder: index + 1
    }))
  );

  const technologyValues = items.flatMap((item) =>
    item.technologyLabels.map((label, index) => ({
      id: `${item.id}-tech-${index + 1}`,
      itemId: item.id,
      label,
      sortOrder: index + 1
    }))
  );

  if (featureValues.length) {
    await db.insert(catalogItemFeatures).values(featureValues);
  }

  if (technologyValues.length) {
    await db.insert(catalogItemTechnologies).values(technologyValues);
  }
}

export async function ensureDatabaseSeeded() {
  if (global.__mavenDbSeedPromise) {
    return global.__mavenDbSeedPromise;
  }

  global.__mavenDbSeedPromise = (async () => {
    const db = getDatabase();
    const existingService = await db.query.services.findFirst();

    if (!existingService) {
      await db.insert(services).values(
        seedServices.map((item) => ({
          id: item.id,
          slug: item.slug,
          titleId: item.title.id,
          titleEn: item.title.en,
          descriptionId: item.description.id,
          descriptionEn: item.description.en,
          icon: item.icon,
          blockColor: item.blockColor,
          sortOrder: item.sortOrder,
          isActive: item.isActive
        }))
      );
    }

    const existingPortfolio = await db.query.portfolioProjects.findFirst();
    if (!existingPortfolio) {
      await db.insert(portfolioProjects).values(
        seedPortfolio.map((item) => ({
          id: item.id,
          slug: item.slug,
          titleId: item.title.id,
          titleEn: item.title.en,
          summaryId: item.summary.id,
          summaryEn: item.summary.en,
          categoryId: item.category.id,
          categoryEn: item.category.en,
          highlightId: item.highlight.id,
          highlightEn: item.highlight.en,
          image: item.image,
          techStack: item.techStack,
          sortOrder: item.sortOrder,
          isActive: item.isActive
        }))
      );
    }

    const existingTeam = await db.query.teamMembers.findFirst();
    if (!existingTeam) {
      await db.insert(teamMembers).values(
        seedTeam.map((item) => ({
          id: item.id,
          name: item.name,
          roleId: item.role.id,
          roleEn: item.role.en,
          bioId: item.bio.id,
          bioEn: item.bio.en,
          avatar: item.avatar,
          socials: item.socials,
          sortOrder: item.sortOrder,
          isActive: item.isActive
        }))
      );
    }

    const existingTestimonial = await db.query.testimonials.findFirst();
    if (!existingTestimonial) {
      await db.insert(testimonials).values(
        seedTestimonials.map((item) => ({
          id: item.id,
          clientName: item.clientName,
          company: item.company,
          quoteId: item.quote.id,
          quoteEn: item.quote.en,
          rating: item.rating,
          sortOrder: item.sortOrder,
          isActive: item.isActive
        }))
      );
    }

    const existingCatalog = await db.query.catalogItems.findFirst();
    if (!existingCatalog) {
      await seedCatalogTables(seedCatalog);
    }

    const existingSettings = await db.query.siteSettings.findFirst();
    if (!existingSettings) {
      await db.insert(siteSettings).values({
        id: "global",
        heroBadgeId: seedSettings.heroBadge.id,
        heroBadgeEn: seedSettings.heroBadge.en,
        heroHeadlineId: seedSettings.heroHeadline.id,
        heroHeadlineEn: seedSettings.heroHeadline.en,
        heroSubheadlineId: seedSettings.heroSubheadline.id,
        heroSubheadlineEn: seedSettings.heroSubheadline.en,
        heroCtaLabelId: seedSettings.heroCtaLabel.id,
        heroCtaLabelEn: seedSettings.heroCtaLabel.en,
        heroCtaHref: seedSettings.heroCtaHref,
        aboutHeadlineId: seedSettings.aboutHeadline.id,
        aboutHeadlineEn: seedSettings.aboutHeadline.en,
        aboutStoryId: seedSettings.aboutStory.id,
        aboutStoryEn: seedSettings.aboutStory.en,
        missionId: seedSettings.mission.id,
        missionEn: seedSettings.mission.en,
        visionId: seedSettings.vision.id,
        visionEn: seedSettings.vision.en,
        stats: seedSettings.stats,
        whyUs: seedSettings.whyUs,
        contactHeadlineId: seedSettings.contactHeadline.id,
        contactHeadlineEn: seedSettings.contactHeadline.en,
        contactCopyId: seedSettings.contactCopy.id,
        contactCopyEn: seedSettings.contactCopy.en,
        whatsapp: seedSettings.whatsapp,
        phone: seedSettings.phone,
        email: seedSettings.email,
        addressId: seedSettings.address.id,
        addressEn: seedSettings.address.en,
        socials: seedSettings.socials
      });
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, process.env.ADMIN_EMAIL ?? "admin@mavenforge.com")
    });
    if (!existingUser) {
      await db.insert(users).values({
        id: "internal-admin",
        email: process.env.ADMIN_EMAIL ?? "admin@mavenforge.com",
        passwordHash: hashSync(process.env.ADMIN_PASSWORD ?? "forge-admin", 10),
        role: "admin"
      });
    }

    const existingPageView = await db.query.pageViews.findFirst();
    if (!existingPageView) {
      await db.insert(pageViews).values(
        seedPageViews.map((view) => ({
          id: view.id,
          path: view.path,
          locale: view.locale,
          referrer: view.referrer,
          visitorId: view.visitorId,
          visitedAt: new Date(view.visitedAt)
        }))
      );
    }
  })();

  try {
    await global.__mavenDbSeedPromise;
  } catch (error) {
    global.__mavenDbSeedPromise = undefined;
    throw error;
  }
}

export async function findAdminUserByEmail(email: string) {
  await ensureDatabaseSeeded();
  const db = getDatabase();
  return db.query.users.findFirst({
    where: eq(users.email, email)
  });
}

export async function getPublicSiteDataFromDb(): Promise<PublicSiteData> {
  await ensureDatabaseSeeded();
  const db = getDatabase();

  const [serviceRows, portfolioRows, teamRows, testimonialRows, catalogRows, featureRows, techRows, settingsRow] =
    await Promise.all([
      db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.sortOrder)),
      db
        .select()
        .from(portfolioProjects)
        .where(eq(portfolioProjects.isActive, true))
        .orderBy(asc(portfolioProjects.sortOrder)),
      db.select().from(teamMembers).where(eq(teamMembers.isActive, true)).orderBy(asc(teamMembers.sortOrder)),
      db
        .select()
        .from(testimonials)
        .where(eq(testimonials.isActive, true))
        .orderBy(asc(testimonials.sortOrder)),
      db.select().from(catalogItems).where(eq(catalogItems.isActive, true)).orderBy(asc(catalogItems.sortOrder)),
      db.select().from(catalogItemFeatures).orderBy(asc(catalogItemFeatures.sortOrder)),
      db.select().from(catalogItemTechnologies).orderBy(asc(catalogItemTechnologies.sortOrder)),
      db.query.siteSettings.findFirst({
        where: eq(siteSettings.id, "global")
      })
    ]);

  return {
    services: serviceRows.map(toServiceItem),
    portfolio: portfolioRows.map(toPortfolioItem),
    team: teamRows.map(toTeamMember),
    testimonials: testimonialRows.map(toTestimonial),
    catalog: buildCatalogItems(catalogRows, featureRows, techRows),
    settings: settingsRow ? toSettings(settingsRow) : seedSettings
  };
}

export async function listResourceFromDb(resource: AdminResourceKey) {
  await ensureDatabaseSeeded();
  const db = getDatabase();

  switch (resource) {
    case "services":
      return db.select().from(services).orderBy(asc(services.sortOrder)).then((rows) => rows.map(toServiceItem));
    case "portfolio":
      return db
        .select()
        .from(portfolioProjects)
        .orderBy(asc(portfolioProjects.sortOrder))
        .then((rows) => rows.map(toPortfolioItem));
    case "team":
      return db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder)).then((rows) => rows.map(toTeamMember));
    case "testimonials":
      return db
        .select()
        .from(testimonials)
        .orderBy(asc(testimonials.sortOrder))
        .then((rows) => rows.map(toTestimonial));
    case "catalog": {
      const [itemRows, featureRows, techRows] = await Promise.all([
        db.select().from(catalogItems).orderBy(asc(catalogItems.sortOrder)),
        db.select().from(catalogItemFeatures).orderBy(asc(catalogItemFeatures.sortOrder)),
        db.select().from(catalogItemTechnologies).orderBy(asc(catalogItemTechnologies.sortOrder))
      ]);
      return buildCatalogItems(itemRows, featureRows, techRows);
    }
  }
}

export async function getSettingsFromDb() {
  await ensureDatabaseSeeded();
  const db = getDatabase();
  const row = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.id, "global")
  });
  return row ? toSettings(row) : seedSettings;
}

export async function saveSettingsToDb(settingsValue: SiteSettings) {
  await ensureDatabaseSeeded();
  const db = getDatabase();

  await db
    .update(siteSettings)
    .set({
      heroBadgeId: settingsValue.heroBadge.id,
      heroBadgeEn: settingsValue.heroBadge.en,
      heroHeadlineId: settingsValue.heroHeadline.id,
      heroHeadlineEn: settingsValue.heroHeadline.en,
      heroSubheadlineId: settingsValue.heroSubheadline.id,
      heroSubheadlineEn: settingsValue.heroSubheadline.en,
      heroCtaLabelId: settingsValue.heroCtaLabel.id,
      heroCtaLabelEn: settingsValue.heroCtaLabel.en,
      heroCtaHref: settingsValue.heroCtaHref,
      aboutHeadlineId: settingsValue.aboutHeadline.id,
      aboutHeadlineEn: settingsValue.aboutHeadline.en,
      aboutStoryId: settingsValue.aboutStory.id,
      aboutStoryEn: settingsValue.aboutStory.en,
      missionId: settingsValue.mission.id,
      missionEn: settingsValue.mission.en,
      visionId: settingsValue.vision.id,
      visionEn: settingsValue.vision.en,
      stats: settingsValue.stats,
      whyUs: settingsValue.whyUs,
      contactHeadlineId: settingsValue.contactHeadline.id,
      contactHeadlineEn: settingsValue.contactHeadline.en,
      contactCopyId: settingsValue.contactCopy.id,
      contactCopyEn: settingsValue.contactCopy.en,
      whatsapp: settingsValue.whatsapp,
      phone: settingsValue.phone,
      email: settingsValue.email,
      addressId: settingsValue.address.id,
      addressEn: settingsValue.address.en,
      socials: settingsValue.socials
    })
    .where(eq(siteSettings.id, "global"));

  return getSettingsFromDb();
}

export async function createResourceItemInDb(
  resource: AdminResourceKey,
  item: Omit<ServiceItem | PortfolioProject | TeamMember | Testimonial | CatalogItem, "id"> & {
    id?: string;
  }
) {
  await ensureDatabaseSeeded();
  const db = getDatabase();
  const id = item.id || randomUUID();

  switch (resource) {
    case "services": {
      const value = item as Omit<ServiceItem, "id">;
      await db.insert(services).values({
        id,
        slug: value.slug,
        titleId: value.title.id,
        titleEn: value.title.en,
        descriptionId: value.description.id,
        descriptionEn: value.description.en,
        icon: value.icon,
        blockColor: value.blockColor,
        sortOrder: value.sortOrder,
        isActive: value.isActive
      });
      return { id, ...value };
    }
    case "portfolio": {
      const value = item as Omit<PortfolioProject, "id">;
      await db.insert(portfolioProjects).values({
        id,
        slug: value.slug,
        titleId: value.title.id,
        titleEn: value.title.en,
        summaryId: value.summary.id,
        summaryEn: value.summary.en,
        categoryId: value.category.id,
        categoryEn: value.category.en,
        highlightId: value.highlight.id,
        highlightEn: value.highlight.en,
        image: value.image,
        techStack: value.techStack,
        sortOrder: value.sortOrder,
        isActive: value.isActive
      });
      return { id, ...value };
    }
    case "team": {
      const value = item as Omit<TeamMember, "id">;
      await db.insert(teamMembers).values({
        id,
        name: value.name,
        roleId: value.role.id,
        roleEn: value.role.en,
        bioId: value.bio.id,
        bioEn: value.bio.en,
        avatar: value.avatar,
        socials: value.socials,
        sortOrder: value.sortOrder,
        isActive: value.isActive
      });
      return { id, ...value };
    }
    case "testimonials": {
      const value = item as Omit<Testimonial, "id">;
      await db.insert(testimonials).values({
        id,
        clientName: value.clientName,
        company: value.company,
        quoteId: value.quote.id,
        quoteEn: value.quote.en,
        rating: value.rating,
        sortOrder: value.sortOrder,
        isActive: value.isActive
      });
      return { id, ...value };
    }
    case "catalog": {
      const value = item as Omit<CatalogItem, "id">;
      await db.insert(catalogItems).values({
        id,
        slug: value.slug,
        nameId: value.name.id,
        nameEn: value.name.en,
        descriptionId: value.description.id,
        descriptionEn: value.description.en,
        categoryId: value.category.id,
        categoryEn: value.category.en,
        priceFrom: value.priceFrom,
        priceTo: value.priceTo,
        priceLabelId: value.priceLabel.id,
        priceLabelEn: value.priceLabel.en,
        isPriceHidden: value.isPriceHidden,
        ctaUrl: value.ctaUrl,
        sortOrder: value.sortOrder,
        isActive: value.isActive
      });

      if (value.features.length) {
        await db.insert(catalogItemFeatures).values(
          value.features.map((feature, index) => ({
            id: `${id}-feature-${index + 1}`,
            itemId: id,
            featureId: feature.id,
            featureEn: feature.en,
            sortOrder: index + 1
          }))
        );
      }

      if (value.technologyLabels.length) {
        await db.insert(catalogItemTechnologies).values(
          value.technologyLabels.map((label, index) => ({
            id: `${id}-tech-${index + 1}`,
            itemId: id,
            label,
            sortOrder: index + 1
          }))
        );
      }

      return { id, ...value };
    }
  }
}

export async function updateResourceItemInDb(
  resource: AdminResourceKey,
  id: string,
  item: Omit<ServiceItem | PortfolioProject | TeamMember | Testimonial | CatalogItem, "id"> & {
    id?: string;
  }
) {
  await ensureDatabaseSeeded();
  const db = getDatabase();

  switch (resource) {
    case "services": {
      const value = item as Omit<ServiceItem, "id">;
      await db
        .update(services)
        .set({
          slug: value.slug,
          titleId: value.title.id,
          titleEn: value.title.en,
          descriptionId: value.description.id,
          descriptionEn: value.description.en,
          icon: value.icon,
          blockColor: value.blockColor,
          sortOrder: value.sortOrder,
          isActive: value.isActive
        })
        .where(eq(services.id, id));
      return { id, ...value };
    }
    case "portfolio": {
      const value = item as Omit<PortfolioProject, "id">;
      await db
        .update(portfolioProjects)
        .set({
          slug: value.slug,
          titleId: value.title.id,
          titleEn: value.title.en,
          summaryId: value.summary.id,
          summaryEn: value.summary.en,
          categoryId: value.category.id,
          categoryEn: value.category.en,
          highlightId: value.highlight.id,
          highlightEn: value.highlight.en,
          image: value.image,
          techStack: value.techStack,
          sortOrder: value.sortOrder,
          isActive: value.isActive
        })
        .where(eq(portfolioProjects.id, id));
      return { id, ...value };
    }
    case "team": {
      const value = item as Omit<TeamMember, "id">;
      await db
        .update(teamMembers)
        .set({
          name: value.name,
          roleId: value.role.id,
          roleEn: value.role.en,
          bioId: value.bio.id,
          bioEn: value.bio.en,
          avatar: value.avatar,
          socials: value.socials,
          sortOrder: value.sortOrder,
          isActive: value.isActive
        })
        .where(eq(teamMembers.id, id));
      return { id, ...value };
    }
    case "testimonials": {
      const value = item as Omit<Testimonial, "id">;
      await db
        .update(testimonials)
        .set({
          clientName: value.clientName,
          company: value.company,
          quoteId: value.quote.id,
          quoteEn: value.quote.en,
          rating: value.rating,
          sortOrder: value.sortOrder,
          isActive: value.isActive
        })
        .where(eq(testimonials.id, id));
      return { id, ...value };
    }
    case "catalog": {
      const value = item as Omit<CatalogItem, "id">;
      await db
        .update(catalogItems)
        .set({
          slug: value.slug,
          nameId: value.name.id,
          nameEn: value.name.en,
          descriptionId: value.description.id,
          descriptionEn: value.description.en,
          categoryId: value.category.id,
          categoryEn: value.category.en,
          priceFrom: value.priceFrom,
          priceTo: value.priceTo,
          priceLabelId: value.priceLabel.id,
          priceLabelEn: value.priceLabel.en,
          isPriceHidden: value.isPriceHidden,
          ctaUrl: value.ctaUrl,
          sortOrder: value.sortOrder,
          isActive: value.isActive
        })
        .where(eq(catalogItems.id, id));

      await db.delete(catalogItemFeatures).where(eq(catalogItemFeatures.itemId, id));
      await db.delete(catalogItemTechnologies).where(eq(catalogItemTechnologies.itemId, id));

      if (value.features.length) {
        await db.insert(catalogItemFeatures).values(
          value.features.map((feature, index) => ({
            id: `${id}-feature-${index + 1}`,
            itemId: id,
            featureId: feature.id,
            featureEn: feature.en,
            sortOrder: index + 1
          }))
        );
      }

      if (value.technologyLabels.length) {
        await db.insert(catalogItemTechnologies).values(
          value.technologyLabels.map((label, index) => ({
            id: `${id}-tech-${index + 1}`,
            itemId: id,
            label,
            sortOrder: index + 1
          }))
        );
      }

      return { id, ...value };
    }
  }
}

export async function deleteResourceItemFromDb(resource: AdminResourceKey, id: string) {
  await ensureDatabaseSeeded();
  const db = getDatabase();

  switch (resource) {
    case "services":
      await db.delete(services).where(eq(services.id, id));
      break;
    case "portfolio":
      await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
      break;
    case "team":
      await db.delete(teamMembers).where(eq(teamMembers.id, id));
      break;
    case "testimonials":
      await db.delete(testimonials).where(eq(testimonials.id, id));
      break;
    case "catalog":
      await db.delete(catalogItemFeatures).where(eq(catalogItemFeatures.itemId, id));
      await db.delete(catalogItemTechnologies).where(eq(catalogItemTechnologies.itemId, id));
      await db.delete(catalogItems).where(eq(catalogItems.id, id));
      break;
  }

  return { ok: true };
}

export async function recordPageViewInDb(view: Omit<PageView, "id" | "visitedAt">) {
  await ensureDatabaseSeeded();
  const db = getDatabase();
  await db.insert(pageViews).values({
    id: randomUUID(),
    path: view.path,
    locale: view.locale,
    referrer: view.referrer,
    visitorId: view.visitorId,
    visitedAt: new Date()
  });
}

export async function getDashboardMetricsFromDb(): Promise<DashboardMetrics> {
  await ensureDatabaseSeeded();
  const db = getDatabase();

  const [views, serviceRows, portfolioRows, teamRows, testimonialRows, catalogRows] =
    await Promise.all([
      db.select().from(pageViews).orderBy(desc(pageViews.visitedAt)),
      db.select().from(services),
      db.select().from(portfolioProjects),
      db.select().from(teamMembers),
      db.select().from(testimonials),
      db.select().from(catalogItems)
    ]);

  const pageMap = new Map<string, number>();
  const referrerMap = new Map<string, number>();

  for (const view of views) {
    pageMap.set(view.path, (pageMap.get(view.path) ?? 0) + 1);
    const normalizedReferrer = view.referrer || "direct";
    referrerMap.set(normalizedReferrer, (referrerMap.get(normalizedReferrer) ?? 0) + 1);
  }

  return {
    totalViews: views.length,
    uniqueVisitors: new Set(views.map((view) => view.visitorId)).size,
    topPages: [...pageMap.entries()]
      .map(([path, total]) => ({ path, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5),
    topReferrers: [...referrerMap.entries()]
      .map(([referrer, total]) => ({ referrer, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5),
    activeCounts: [
      { label: "Services", total: serviceRows.filter((item) => item.isActive).length },
      { label: "Portfolio", total: portfolioRows.filter((item) => item.isActive).length },
      { label: "Team", total: teamRows.filter((item) => item.isActive).length },
      { label: "Testimonials", total: testimonialRows.filter((item) => item.isActive).length },
      { label: "Catalog", total: catalogRows.filter((item) => item.isActive).length }
    ]
  };
}
