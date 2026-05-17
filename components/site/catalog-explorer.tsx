"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { pickLocaleText } from "@/lib/i18n";
import type { CatalogItem, Locale } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type CatalogExplorerProps = {
  locale: Locale;
  items: CatalogItem[];
  labels: {
    catalogSearch: string;
    allCategories: string;
    allStacks: string;
    hiddenPrice: string;
    filter: string;
  };
};

export function CatalogExplorer({
  locale,
  items,
  labels
}: CatalogExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [stack, setStack] = useState("all");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(items.map((item) => pickLocaleText(locale, item.category)))
      ),
    [items, locale]
  );

  const stacks = useMemo(
    () => Array.from(new Set(items.flatMap((item) => item.technologyLabels))),
    [items]
  );

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const content = [
        pickLocaleText(locale, item.name),
        pickLocaleText(locale, item.description),
        ...item.technologyLabels
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = content.includes(query.toLowerCase());
      const matchesCategory =
        category === "all" || pickLocaleText(locale, item.category) === category;
      const matchesStack = stack === "all" || item.technologyLabels.includes(stack);

      return matchesQuery && matchesCategory && matchesStack;
    });
  }, [category, items, locale, query, stack]);

  return (
    <div className="grid gap-8">
      <div className="brutal-card grid gap-4 bg-white p-6 lg:grid-cols-[1.6fr_1fr_1fr]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.catalogSearch}
          className="editable-field"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="editable-field"
        >
          <option value="all">{labels.allCategories}</option>
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select
          value={stack}
          onChange={(event) => setStack(event.target.value)}
          className="editable-field"
        >
          <option value="all">{labels.allStacks}</option>
          {stacks.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, index) => {
          const priceLine = item.isPriceHidden
            ? labels.hiddenPrice
            : `${pickLocaleText(locale, item.priceLabel)} ${formatCurrency(
                item.priceFrom,
                locale
              )}${item.priceTo ? ` - ${formatCurrency(item.priceTo, locale)}` : ""}`;

          return (
            <article
              key={item.id}
              className="brutal-card flex h-full flex-col justify-between p-6"
              style={{
                backgroundColor:
                  index % 3 === 0 ? "#FFFDF8" : index % 3 === 1 ? "#A5FF8B" : "#98D8FF"
              }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em]">
                  {pickLocaleText(locale, item.category)}
                </p>
                <h2 className="mt-3 font-[family:var(--font-display)] text-4xl uppercase leading-none">
                  {pickLocaleText(locale, item.name)}
                </h2>
                <p className="mt-4 text-sm leading-7">
                  {pickLocaleText(locale, item.description)}
                </p>
                <p className="mt-5 rounded-2xl border-[3px] border-black bg-white px-4 py-3 text-sm">
                  {priceLine}
                </p>
                <div className="mt-5 grid gap-3">
                  {item.features.map((feature, featureIndex) => (
                    <div
                      key={`${item.id}-${featureIndex}`}
                      className="rounded-2xl border-[3px] border-black bg-white px-4 py-3 text-sm"
                    >
                      {pickLocaleText(locale, feature)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.technologyLabels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border-[3px] border-black bg-white px-3 py-2 text-[11px] uppercase tracking-[0.2em]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <Link
                  href={item.ctaUrl}
                  className="inline-flex rounded-full border-[3px] border-black bg-signal px-5 py-3 text-xs uppercase tracking-[0.25em] shadow-brutalSm"
                >
                  {locale === "id" ? "Pesan Sekarang" : "Book Now"}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
