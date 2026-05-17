"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/types";

export function PageViewTracker({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    void fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        path: pathname,
        locale,
        referrer: document.referrer || "direct"
      })
    });
  }, [locale, pathname]);

  return null;
}
