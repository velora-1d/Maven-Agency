"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  ExternalLink,
  Menu,
  X,
  LayoutDashboard,
  Layers,
  Briefcase,
  Users,
  Star,
  Package,
  Settings
} from "lucide-react";

import { resourceLabels } from "@/lib/admin-config";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: "/admin/dashboard/services", label: resourceLabels.services, icon: <Layers className="h-5 w-5" /> },
  { href: "/admin/dashboard/portfolio", label: resourceLabels.portfolio, icon: <Briefcase className="h-5 w-5" /> },
  { href: "/admin/dashboard/team", label: resourceLabels.team, icon: <Users className="h-5 w-5" /> },
  { href: "/admin/dashboard/testimonials", label: resourceLabels.testimonials, icon: <Star className="h-5 w-5" /> },
  { href: "/admin/dashboard/catalog", label: resourceLabels.catalog, icon: <Package className="h-5 w-5" /> },
  { href: "/admin/dashboard/settings", label: resourceLabels.settings, icon: <Settings className="h-5 w-5" /> },
];

export function AdminShell({
  userEmail,
  children
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-container flex-col lg:flex-row">
      {/* ── Mobile / Tablet Header ── */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-[3px] border-true-black bg-deep-black px-6 py-4 lg:hidden">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="block">
            <div className="bg-true-black border-[2px] border-paper-white/20 p-1 inline-block">
              <Image
                src="/logo.png"
                alt="MAVEN Forge Logo"
                width={120}
                height={30}
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </Link>
          <div className="border-[3px] border-paper-white/20 px-2.5 py-0.5 font-body text-[10px] uppercase text-paper-white/40 hidden sm:inline-block">
            FORGE
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="border-[3px] border-paper-white/20 bg-paper-white/10 p-2 text-paper-white active:bg-paper-white/20"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-true-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-shrink-0 flex-col border-r-[3px] border-true-black bg-deep-black transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Brand */}
        <div className="border-b-[3px] border-paper-white/10 p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-3.5 group">
            <div className="bg-true-black border-[3px] border-paper-white/20 p-2.5 flex items-center justify-center neo-shadow-sm transition-transform group-hover:-translate-y-0.5">
              <Image
                src="/logo.png"
                alt="MAVEN Forge Logo"
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-body text-[11px] tracking-widest uppercase text-paper-white/40 mb-1 font-bold">
                FORGE ADMIN
              </div>
              <h1 className="font-display text-2xl uppercase leading-none text-paper-white font-extrabold tracking-tight">
                MAVEN<span className="text-primary-container">FORGE.</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="border-b-[3px] border-paper-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-[3px] border-primary-container bg-primary-container font-display text-label-mono text-paper-white">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <p className="truncate font-body text-label-mono uppercase text-paper-white/60">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6">
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 border-[3px] px-4 py-3 font-body text-label-mono uppercase transition-all ${
                    isActive
                      ? "border-primary-container bg-primary-container text-paper-white neo-shadow-sm"
                      : "border-paper-white/10 bg-paper-white/5 text-paper-white/60 hover:border-secondary-container hover:bg-secondary-container/20 hover:text-paper-white"
                  }`}
                >
                  <span className={`font-display text-headline-md ${isActive ? "text-paper-white" : "text-paper-white/30 group-hover:text-secondary-container"}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto h-2 w-2 flex-shrink-0 bg-paper-white" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Language + View Site */}
        <div className="px-4 pb-2 space-y-2">
          {/* Language switcher */}
          <div className="flex overflow-hidden border-[3px] border-paper-white/20">
            <Link
              href="/id"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 font-body text-label-mono uppercase text-paper-white/60 transition-colors hover:bg-primary-container/20 hover:text-paper-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              ID
            </Link>
            <div className="w-[3px] bg-paper-white/20" />
            <Link
              href="/en"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 font-body text-label-mono uppercase text-paper-white/60 transition-colors hover:bg-primary-container/20 hover:text-paper-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              EN
            </Link>
          </div>

          {/* View website */}
          <Link
            href="/id"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex w-full items-center gap-3 border-[3px] border-secondary-container/40 bg-secondary-container/10 px-4 py-3 font-body text-label-mono uppercase text-secondary-container transition-all hover:border-secondary-container hover:bg-secondary-container hover:text-true-black"
          >
            <ExternalLink className="h-4 w-4 flex-shrink-0" />
            VIEW SITE
          </Link>
        </div>

        {/* Sign out */}
        <div className="border-t-[3px] border-paper-white/10 p-4">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center gap-3 border-[3px] border-paper-white/20 bg-paper-white/5 px-4 py-3 font-body text-label-mono uppercase text-paper-white/60 transition-all hover:border-primary-container hover:bg-primary-container hover:text-paper-white"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            SIGN OUT
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 md:p-8 w-full max-w-full">
        {children}
      </main>
    </div>
  );
}
