import { notFound } from "next/navigation";

import type { Locale } from "@/lib/types";

export const locales: Locale[] = ["id", "en"];

export const localeLabels: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English"
};

export function assertLocale(locale: string): Locale {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return locale as Locale;
}

export const uiDictionary = {
  id: {
    nav: {
      home: "Beranda",
      services: "Layanan",
      portfolio: "Portofolio",
      testimonials: "Review",
      team: "Tim",
      catalog: "Katalog",
      contact: "Kontak"
    },
    labels: {
      exploreCatalog: "Jelajahi Katalog",
      startProject: "Mulai Proyek",
      featuredWork: "Sorotan Proyek",
      whyUs: "Kenapa MAVEN Forge",
      catalogSearch: "Cari paket, solusi, atau teknologi",
      allCategories: "Semua Kategori",
      allStacks: "Semua Teknologi",
      hiddenPrice: "Hubungi Kami",
      activeNow: "Aktif Sekarang",
      internalCms: "CMS Internal",
      analyticsMode: "Analytics Ringan",
      adminPanel: "Panel Admin",
      save: "Simpan",
      delete: "Hapus",
      create: "Tambah Baru",
      update: "Perbarui",
      signOut: "Keluar",
      signIn: "Masuk",
      email: "Email",
      password: "Password",
      upload: "Upload Media",
      filter: "Filter",
      noData: "Belum ada data. Tambahkan dari panel admin."
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      testimonials: "Reviews",
      team: "Team",
      catalog: "Catalog",
      contact: "Contact"
    },
    labels: {
      exploreCatalog: "Explore Catalog",
      startProject: "Start a Project",
      featuredWork: "Featured Work",
      whyUs: "Why MAVEN Forge",
      catalogSearch: "Search packages, solutions, or technologies",
      allCategories: "All Categories",
      allStacks: "All Technologies",
      hiddenPrice: "Contact Us",
      activeNow: "Active Now",
      internalCms: "Internal CMS",
      analyticsMode: "Light Analytics",
      adminPanel: "Admin Panel",
      save: "Save",
      delete: "Delete",
      create: "Create New",
      update: "Update",
      signOut: "Sign out",
      signIn: "Sign in",
      email: "Email",
      password: "Password",
      upload: "Upload Media",
      filter: "Filter",
      noData: "No data yet. Add content from the admin panel."
    }
  }
} as const;

export function getUiCopy(locale: Locale) {
  return uiDictionary[locale];
}

export function pickLocaleText<T extends { id: string; en: string }>(
  locale: Locale,
  value: T
) {
  return locale === "id" ? value.id : value.en;
}
