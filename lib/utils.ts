import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number | null | undefined,
  locale: "id" | "en" = "id"
) {
  if (typeof value !== "number") {
    return null;
  }

  return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
    style: "currency",
    currency: locale === "id" ? "IDR" : "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseLines(input: string) {
  return input
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function parseCommaList(input: string) {
  return input
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}
