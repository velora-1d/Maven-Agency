"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [opacity, setOpacity] = useState("opacity-0 translate-y-4");

  useEffect(() => {
    setOpacity("opacity-0 translate-y-4");
    const timer = setTimeout(() => {
      setOpacity("opacity-100 translate-y-0");
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`transition-all duration-500 ease-out ${opacity}`}>
      {children}
    </div>
  );
}
