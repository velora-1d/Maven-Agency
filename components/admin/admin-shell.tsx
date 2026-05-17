"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { resourceLabels } from "@/lib/admin-config";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard/services", label: resourceLabels.services },
  { href: "/admin/dashboard/portfolio", label: resourceLabels.portfolio },
  { href: "/admin/dashboard/team", label: resourceLabels.team },
  { href: "/admin/dashboard/testimonials", label: resourceLabels.testimonials },
  { href: "/admin/dashboard/catalog", label: resourceLabels.catalog },
  { href: "/admin/dashboard/settings", label: resourceLabels.settings }
];

export function AdminShell({
  userEmail,
  children
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-ink text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 p-4 xl:grid-cols-[320px_1fr]">
        <aside className="dash-panel self-start bg-paper">
          <p className="text-xs uppercase tracking-[0.3em]">MAVEN Forge</p>
          <h1 className="mt-3 font-[family:var(--font-display)] text-5xl uppercase leading-none">
            Admin
          </h1>
          <p className="mt-4 text-sm leading-7">{userEmail}</p>

          <nav className="mt-8 grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-[20px] border-[3px] border-black px-4 py-3 text-sm uppercase tracking-[0.18em]",
                  pathname === item.href
                    ? "bg-signal text-ink shadow-brutalSm"
                    : "bg-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-8 rounded-full border-[3px] border-black bg-ink px-5 py-3 text-sm uppercase tracking-[0.2em] text-paper"
          >
            Sign Out
          </button>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
