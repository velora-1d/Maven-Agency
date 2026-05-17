import { BarChart3, Database, Globe2, ShieldCheck } from "lucide-react";

import { getDashboardMetrics, storageMode } from "@/lib/store";

export default async function DashboardOverviewPage() {
  const metrics = await getDashboardMetrics();

  const cards = [
    {
      label: "Total Views",
      value: String(metrics.totalViews),
      accent: "bg-blaze",
      icon: BarChart3
    },
    {
      label: "Unique Visitors",
      value: String(metrics.uniqueVisitors),
      accent: "bg-sky",
      icon: Globe2
    },
    {
      label: "Storage Mode",
      value: storageMode,
      accent: "bg-mint",
      icon: Database
    },
    {
      label: "Access",
      value: "Admin only",
      accent: "bg-white",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="grid gap-6">
      <section className="dash-panel bg-paper">
        <p className="text-xs uppercase tracking-[0.3em]">Overview</p>
        <h1 className="mt-3 font-[family:var(--font-display)] text-6xl uppercase leading-none">
          Dashboard Snapshot
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7">
          Monitor traffic, content inventory, and current storage mode while the Neon
          connection is still optional.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className={`dash-panel ${card.accent}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em]">{card.label}</p>
                  <p className="mt-4 font-[family:var(--font-display)] text-4xl uppercase leading-none">
                    {card.value}
                  </p>
                </div>
                <Icon className="h-8 w-8" />
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="dash-panel bg-white">
          <h2 className="font-[family:var(--font-display)] text-4xl uppercase leading-none">
            Top Pages
          </h2>
          <div className="mt-6 grid gap-3">
            {metrics.topPages.map((page) => (
              <div
                key={page.path}
                className="rounded-[20px] border-[3px] border-black bg-paper px-4 py-3"
              >
                <p className="text-xs uppercase tracking-[0.25em]">{page.path}</p>
                <p className="mt-2 text-sm">{page.total} views</p>
              </div>
            ))}
          </div>
        </article>

        <article className="dash-panel bg-white">
          <h2 className="font-[family:var(--font-display)] text-4xl uppercase leading-none">
            Referrers + Active Content
          </h2>
          <div className="mt-6 grid gap-3">
            {metrics.topReferrers.map((referrer) => (
              <div
                key={referrer.referrer}
                className="rounded-[20px] border-[3px] border-black bg-paper px-4 py-3"
              >
                <p className="text-xs uppercase tracking-[0.25em]">
                  {referrer.referrer}
                </p>
                <p className="mt-2 text-sm">{referrer.total} hits</p>
              </div>
            ))}
            {metrics.activeCounts.map((item) => (
              <div
                key={item.label}
                className="rounded-[20px] border-[3px] border-black bg-mint px-4 py-3"
              >
                <p className="text-xs uppercase tracking-[0.25em]">{item.label}</p>
                <p className="mt-2 text-sm">{item.total} active entries</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
