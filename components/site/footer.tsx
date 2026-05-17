import Link from "next/link";

import type { Locale } from "@/lib/types";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t-[3px] border-black bg-ink text-paper">
      <div className="section-shell flex flex-col gap-6 py-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em]">MAVEN Forge</p>
          <h2 className="mt-3 font-[family:var(--font-display)] text-5xl uppercase leading-none">
            Forge Loud.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-paper/80">
            {locale === "id"
              ? "Website publik bilingual dan admin panel internal untuk tim digital yang ingin bergerak cepat."
              : "A bilingual public website and internal admin panel for digital teams that want to move fast."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-full border-[3px] border-paper bg-paper px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink"
          >
            Home
          </Link>
          <Link
            href={`/${locale}/katalog`}
            className="rounded-full border-[3px] border-paper px-4 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Catalog
          </Link>
          <Link
            href="/admin/login"
            className="rounded-full border-[3px] border-blaze bg-blaze px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
