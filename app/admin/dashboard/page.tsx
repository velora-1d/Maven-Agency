import { BarChart3, Database, Globe2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AnimatedReveal } from "@/components/animated-reveal";
import { AnimatedCounter } from "@/components/animated-counter";

import { getDashboardMetrics, storageMode } from "@/lib/store";

export default async function DashboardOverviewPage() {
  const metrics = await getDashboardMetrics();

  const cards = [
    {
      label: "Total Views",
      value: String(metrics.totalViews),
      bg: "bg-primary-container",
      textColor: "text-paper-white",
      icon: BarChart3
    },
    {
      label: "Unique Visitors",
      value: String(metrics.uniqueVisitors),
      bg: "bg-secondary-container",
      textColor: "text-true-black",
      icon: Globe2
    },
    {
      label: "Storage",
      value: storageMode.toUpperCase(),
      bg: "bg-paper-white",
      textColor: "text-true-black",
      icon: Database
    },
    {
      label: "Access Level",
      value: "ADMIN",
      bg: "bg-true-black",
      textColor: "text-paper-white",
      icon: ShieldCheck
    }
  ];

  const quickLinks = [
    { href: "/admin/dashboard/services", label: "Services" },
    { href: "/admin/dashboard/portfolio", label: "Portfolio" },
    { href: "/admin/dashboard/team", label: "Team" },
    { href: "/admin/dashboard/testimonials", label: "Testimonials" },
    { href: "/admin/dashboard/catalog", label: "Catalog" },
    { href: "/admin/dashboard/settings", label: "Settings" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnimatedReveal direction="up" className="border-[3px] border-true-black bg-paper-white p-6 md:p-8 neo-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body text-label-mono uppercase text-on-surface-variant">OVERVIEW</p>
            <h1 className="mt-2 font-display text-headline-lg-mobile uppercase leading-none text-true-black">
              DASHBOARD
            </h1>
            <p className="mt-3 max-w-xl font-body text-body-md text-on-surface-variant">
              Monitor traffic, manage content, and control all site data from this panel.
            </p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <div className="h-3 w-3 animate-pulse bg-primary-container" />
            <span className="font-body text-label-mono uppercase text-on-surface-variant">LIVE</span>
          </div>
        </div>
      </AnimatedReveal>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <AnimatedReveal
              direction="up"
              delay={i * 100}
              key={card.label}
              className={`relative overflow-hidden border-[3px] border-true-black p-6 neo-shadow ${card.bg}`}
            >
              <div className="flex items-start justify-between">
                <Icon className={`h-5 w-5 ${card.textColor} opacity-60`} />
                <span className={`font-body text-[10px] uppercase tracking-widest ${card.textColor} opacity-40`}>
                  SYS
                </span>
              </div>
              <p className={`mt-5 break-words font-display text-4xl leading-tight ${card.textColor}`}>
                <AnimatedCounter text={card.value} />
              </p>
              <p className={`mt-2 font-body text-[11px] uppercase tracking-[0.2em] ${card.textColor} opacity-70`}>
                {card.label}
              </p>
            </AnimatedReveal>
          );
        })}
      </div>

      {/* Quick access */}
      <AnimatedReveal direction="up" delay={200} className="border-[3px] border-true-black bg-paper-white p-6 md:p-8 neo-shadow">
        <h2 className="mb-6 font-display text-headline-md uppercase text-true-black">
          QUICK ACCESS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between border-[3px] border-true-black bg-surface-container px-5 py-4 font-display text-headline-md uppercase text-true-black shadow-hard-sm transition-all hover:bg-primary-container hover:text-paper-white hover:shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              {link.label}
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ))}
        </div>
      </AnimatedReveal>

      {/* Analytics tables */}
      <AnimatedReveal direction="up" delay={300} className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Top pages */}
        <div className="border-[3px] border-true-black bg-paper-white neo-shadow">
          <div className="border-b-[3px] border-true-black bg-true-black px-6 py-4">
            <h2 className="font-display text-headline-md uppercase text-paper-white">
              TOP PAGES
            </h2>
          </div>
          <div className="divide-y-[3px] divide-true-black">
            {metrics.topPages.length === 0 ? (
              <p className="px-6 py-8 font-body text-label-mono uppercase text-on-surface-variant">
                NO DATA YET
              </p>
            ) : (
              metrics.topPages.map((page, i) => (
                <div key={page.path} className="flex items-center justify-between px-6 py-4">
                  <div className="flex min-w-0 items-center gap-4 flex-1 mr-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-[3px] border-true-black bg-surface-container font-display text-headline-md text-true-black">
                      {i + 1}
                    </span>
                    <p className="font-body text-body-md text-on-surface truncate">{page.path}</p>
                  </div>
                  <div className="border-[3px] border-true-black bg-primary-container px-3 py-1 font-body text-label-mono uppercase text-paper-white">
                    <AnimatedCounter text={String(page.total)} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active content counts */}
        <div className="border-[3px] border-true-black bg-paper-white neo-shadow">
          <div className="border-b-[3px] border-true-black bg-secondary-container px-6 py-4">
            <h2 className="font-display text-headline-md uppercase text-true-black">
              ACTIVE CONTENT
            </h2>
          </div>
          <div className="divide-y-[3px] divide-true-black">
            {metrics.activeCounts.length === 0 ? (
              <p className="px-6 py-8 font-body text-label-mono uppercase text-on-surface-variant">
                NO DATA YET
              </p>
            ) : (
              metrics.activeCounts.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-6 py-4">
                  <p className="font-display text-headline-md uppercase text-true-black">{item.label}</p>
                  <div className="border-[3px] border-true-black bg-true-black px-3 py-1 font-body text-label-mono uppercase text-paper-white">
                    <AnimatedCounter text={String(item.total)} /> ACTIVE
                  </div>
                </div>
              ))
            )}
            {metrics.topReferrers.length > 0 && (
              <>
                <div className="bg-surface-container px-6 py-2">
                  <p className="font-body text-label-mono uppercase text-on-surface-variant">REFERRERS</p>
                </div>
                {metrics.topReferrers.map((ref) => (
                  <div key={ref.referrer} className="flex items-center justify-between px-6 py-4">
                    <p className="font-body text-body-md text-on-surface truncate max-w-[200px]">{ref.referrer || "Direct"}</p>
                    <div className="border-[3px] border-true-black bg-surface-container px-3 py-1 font-body text-label-mono uppercase text-on-surface">
                      <AnimatedCounter text={String(ref.total)} />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </AnimatedReveal>
    </div>
  );
}
