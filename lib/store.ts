import "server-only";

import { randomUUID } from "node:crypto";

import {
  createResourceItemInDb,
  deleteResourceItemFromDb,
  getDashboardMetricsFromDb,
  getPublicSiteDataFromDb,
  getSettingsFromDb,
  listResourceFromDb,
  recordPageViewInDb,
  saveSettingsToDb,
  updateResourceItemInDb
} from "@/lib/db-store";
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

type AppStore = {
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  team: TeamMember[];
  testimonials: Testimonial[];
  catalog: CatalogItem[];
  settings: SiteSettings;
  pageViews: PageView[];
};

type ResourceInput<T extends AdminResourceKey> = Omit<AppStore[T][number], "id"> & {
  id?: string;
};

declare global {
  var __mavenStore: AppStore | undefined;
}

function cloneStore(): AppStore {
  return structuredClone({
    services: seedServices,
    portfolio: seedPortfolio,
    team: seedTeam,
    testimonials: seedTestimonials,
    catalog: seedCatalog,
    settings: seedSettings,
    pageViews: seedPageViews
  });
}

function getStore() {
  if (!global.__mavenStore) {
    global.__mavenStore = cloneStore();
  }

  return global.__mavenStore;
}

const useDatabase = Boolean(process.env.DATABASE_URL);

export const storageMode = useDatabase ? "database-backed" : "seed-memory";

export async function getPublicSiteData(): Promise<PublicSiteData> {
  if (useDatabase) {
    return getPublicSiteDataFromDb();
  }

  const store = getStore();

  return {
    services: [...store.services]
      .filter((item) => item.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    portfolio: [...store.portfolio]
      .filter((item) => item.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    team: [...store.team]
      .filter((item) => item.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    testimonials: [...store.testimonials]
      .filter((item) => item.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    catalog: [...store.catalog]
      .filter((item) => item.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    settings: structuredClone(store.settings)
  };
}

export async function listResource(resource: AdminResourceKey) {
  if (useDatabase) {
    return listResourceFromDb(resource);
  }

  const store = getStore();
  return structuredClone(store[resource]).sort(
    (
      a: { sortOrder: number },
      b: { sortOrder: number }
    ) => a.sortOrder - b.sortOrder
  );
}

export async function getSettings() {
  if (useDatabase) {
    return getSettingsFromDb();
  }

  return structuredClone(getStore().settings);
}

export async function saveSettings(settings: SiteSettings) {
  if (useDatabase) {
    return saveSettingsToDb(settings);
  }

  getStore().settings = structuredClone(settings);
  return getSettings();
}

export async function createResourceItem<T extends AdminResourceKey>(
  resource: T,
  item: ResourceInput<T>
) {
  if (useDatabase) {
    return createResourceItemInDb(resource, item);
  }

  const store = getStore();
  const nextItem = {
    ...item,
    id: item.id || randomUUID()
  };

  store[resource] = [...store[resource], nextItem] as AppStore[T];
  return nextItem;
}

export async function updateResourceItem<T extends AdminResourceKey>(
  resource: T,
  id: string,
  item: ResourceInput<T>
) {
  if (useDatabase) {
    return updateResourceItemInDb(resource, id, item);
  }

  const store = getStore();
  store[resource] = store[resource].map((entry) =>
    entry.id === id ? { ...entry, ...item, id } : entry
  ) as AppStore[T];
  return structuredClone(store[resource].find((entry) => entry.id === id));
}

export async function deleteResourceItem<T extends AdminResourceKey>(
  resource: T,
  id: string
) {
  if (useDatabase) {
    return deleteResourceItemFromDb(resource, id);
  }

  const store = getStore();
  store[resource] = store[resource].filter((entry) => entry.id !== id) as AppStore[T];
  return { ok: true };
}

export async function recordPageView(view: Omit<PageView, "id" | "visitedAt">) {
  if (useDatabase) {
    return recordPageViewInDb(view);
  }

  const store = getStore();
  store.pageViews.unshift({
    id: randomUUID(),
    visitedAt: new Date().toISOString(),
    ...view
  });
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  if (useDatabase) {
    return getDashboardMetricsFromDb();
  }

  const store = getStore();
  const pageMap = new Map<string, number>();
  const referrerMap = new Map<string, number>();

  for (const view of store.pageViews) {
    pageMap.set(view.path, (pageMap.get(view.path) ?? 0) + 1);
    const normalizedReferrer = view.referrer || "direct";
    referrerMap.set(normalizedReferrer, (referrerMap.get(normalizedReferrer) ?? 0) + 1);
  }

  const uniqueVisitors = new Set(store.pageViews.map((view) => view.visitorId)).size;

  return {
    totalViews: store.pageViews.length,
    uniqueVisitors,
    topPages: [...pageMap.entries()]
      .map(([path, total]) => ({ path, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5),
    topReferrers: [...referrerMap.entries()]
      .map(([referrer, total]) => ({ referrer, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5),
    activeCounts: [
      { label: "Services", total: store.services.filter((item) => item.isActive).length },
      { label: "Portfolio", total: store.portfolio.filter((item) => item.isActive).length },
      { label: "Team", total: store.team.filter((item) => item.isActive).length },
      {
        label: "Testimonials",
        total: store.testimonials.filter((item) => item.isActive).length
      },
      { label: "Catalog", total: store.catalog.filter((item) => item.isActive).length }
    ]
  };
}
