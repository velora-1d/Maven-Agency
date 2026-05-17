import "server-only";

import { randomUUID } from "node:crypto";

import {
  createResourceItemInDb,
  deleteResourceItemFromDb,
  getDashboardMetricsFromDb,
  getPublicSiteDataFromDb,
  isRecoverableDbError,
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

function logDbFallback(error: unknown, action: string) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`[maven-forge] Falling back to seed-memory for ${action}: ${message}`);
}

async function tryDbOrFallback<T>(
  action: string,
  dbAction: () => Promise<T>,
  fallbackAction: () => Promise<T> | T
) {
  try {
    return await dbAction();
  } catch (error) {
    if (!isRecoverableDbError(error)) {
      throw error;
    }

    logDbFallback(error, action);
    return await fallbackAction();
  }
}

async function getSeedPublicSiteData(): Promise<PublicSiteData> {
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

async function listSeedResource(resource: AdminResourceKey) {
  const store = getStore();
  return structuredClone(store[resource]).sort(
    (
      a: { sortOrder: number },
      b: { sortOrder: number }
    ) => a.sortOrder - b.sortOrder
  );
}

async function getSeedSettings() {
  return structuredClone(getStore().settings);
}

async function saveSeedSettings(settings: SiteSettings) {
  getStore().settings = structuredClone(settings);
  return getSeedSettings();
}

async function createSeedResourceItem<T extends AdminResourceKey>(
  resource: T,
  item: ResourceInput<T>
): Promise<AppStore[T][number]> {
  const store = getStore();
  const nextItem = {
    ...item,
    id: item.id || randomUUID()
  } as AppStore[T][number];

  store[resource] = [...store[resource], nextItem] as AppStore[T];
  return nextItem;
}

async function updateSeedResourceItem<T extends AdminResourceKey>(
  resource: T,
  id: string,
  item: ResourceInput<T>
): Promise<AppStore[T][number] | undefined> {
  const store = getStore();
  store[resource] = store[resource].map((entry) =>
    entry.id === id ? { ...entry, ...item, id } : entry
  ) as AppStore[T];
  return structuredClone(store[resource].find((entry) => entry.id === id));
}

async function deleteSeedResourceItem<T extends AdminResourceKey>(
  resource: T,
  id: string
): Promise<{ ok: true }> {
  const store = getStore();
  store[resource] = store[resource].filter((entry) => entry.id !== id) as AppStore[T];
  return { ok: true };
}

async function recordSeedPageView(view: Omit<PageView, "id" | "visitedAt">) {
  const store = getStore();
  store.pageViews.unshift({
    id: randomUUID(),
    visitedAt: new Date().toISOString(),
    ...view
  });
}

async function getSeedDashboardMetrics(): Promise<DashboardMetrics> {
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

export async function getPublicSiteData(): Promise<PublicSiteData> {
  if (useDatabase) {
    return tryDbOrFallback("public site data", getPublicSiteDataFromDb, getSeedPublicSiteData);
  }

  return getSeedPublicSiteData();
}

export async function listResource(resource: AdminResourceKey) {
  if (useDatabase) {
    return tryDbOrFallback(
      `${resource} list`,
      () => listResourceFromDb(resource),
      () => listSeedResource(resource)
    );
  }

  return listSeedResource(resource);
}

export async function getSettings() {
  if (useDatabase) {
    return tryDbOrFallback("settings read", getSettingsFromDb, getSeedSettings);
  }

  return getSeedSettings();
}

export async function saveSettings(settings: SiteSettings) {
  if (useDatabase) {
    return tryDbOrFallback(
      "settings save",
      () => saveSettingsToDb(settings),
      () => saveSeedSettings(settings)
    );
  }

  return saveSeedSettings(settings);
}

export async function createResourceItem<T extends AdminResourceKey>(
  resource: T,
  item: ResourceInput<T>
): Promise<AppStore[T][number]> {
  if (useDatabase) {
    return tryDbOrFallback<AppStore[T][number]>(
      `${resource} create`,
      () => createResourceItemInDb(resource, item) as Promise<AppStore[T][number]>,
      () => createSeedResourceItem(resource, item)
    );
  }

  return createSeedResourceItem(resource, item);
}

export async function updateResourceItem<T extends AdminResourceKey>(
  resource: T,
  id: string,
  item: ResourceInput<T>
): Promise<AppStore[T][number] | undefined> {
  if (useDatabase) {
    return tryDbOrFallback<AppStore[T][number] | undefined>(
      `${resource} update`,
      () =>
        updateResourceItemInDb(resource, id, item) as Promise<
          AppStore[T][number] | undefined
        >,
      () => updateSeedResourceItem(resource, id, item)
    );
  }

  return updateSeedResourceItem(resource, id, item);
}

export async function deleteResourceItem<T extends AdminResourceKey>(
  resource: T,
  id: string
): Promise<{ ok: true }> {
  if (useDatabase) {
    return tryDbOrFallback<{ ok: true }>(
      `${resource} delete`,
      () => deleteResourceItemFromDb(resource, id),
      () => deleteSeedResourceItem(resource, id)
    );
  }

  return deleteSeedResourceItem(resource, id);
}

export async function recordPageView(view: Omit<PageView, "id" | "visitedAt">) {
  if (useDatabase) {
    return tryDbOrFallback(
      "page view record",
      () => recordPageViewInDb(view),
      () => recordSeedPageView(view)
    );
  }

  return recordSeedPageView(view);
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  if (useDatabase) {
    return tryDbOrFallback(
      "dashboard metrics",
      getDashboardMetricsFromDb,
      getSeedDashboardMetrics
    );
  }

  return getSeedDashboardMetrics();
}
