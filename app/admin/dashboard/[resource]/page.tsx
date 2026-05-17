import { notFound } from "next/navigation";

import { ResourceManager } from "@/components/admin/resource-manager";
import { SettingsManager } from "@/components/admin/settings-manager";
import { getSettings, listResource } from "@/lib/store";
import type { AdminResourceKey } from "@/lib/types";

const editableResources = [
  "services",
  "portfolio",
  "team",
  "testimonials",
  "catalog",
  "settings"
] as const;

type ResourcePageProps = {
  params: Promise<{
    resource: string;
  }>;
};

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { resource } = await params;

  if (!editableResources.includes(resource as (typeof editableResources)[number])) {
    notFound();
  }

  if (resource === "settings") {
    const settings = await getSettings();
    return <SettingsManager initialSettings={settings} />;
  }

  const items = await listResource(resource as AdminResourceKey);

  return (
    <ResourceManager
      resource={resource as AdminResourceKey}
      initialItems={items as Array<Record<string, unknown>>}
    />
  );
}
