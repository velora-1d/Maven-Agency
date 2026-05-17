import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getOptionalSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getOptionalSession();

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="grid min-h-screen bg-deep-black md:grid-cols-2">
      {/* Left — Brand panel */}
      <div className="relative flex flex-col justify-between overflow-hidden border-r-[3px] border-true-black bg-true-black p-12">
        {/* Decorative grid */}
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10">
          <div className="mb-8 inline-block border-[3px] border-paper-white/20 px-4 py-2 font-body text-label-mono uppercase text-paper-white/50">
            INTERNAL SYSTEM
          </div>
          <h1 className="font-display text-display-2xl uppercase leading-none text-paper-white">
            MAVEN<br />
            <span className="text-primary-container">FORGE.</span>
          </h1>
          <p className="mt-6 max-w-xs border-l-[3px] border-secondary-container pl-6 font-body text-body-lg uppercase text-paper-white/60">
            Control the forge. Portfolio, services, testimonials, team, catalog, and site settings all live in one dashboard.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-3">
          {[
            { label: "Content Manager", desc: "Services, portfolio, team, testimonials" },
            { label: "Catalog CRUD", desc: "Packages, pricing, features, tech stack" },
            { label: "Site Settings", desc: "Hero copy, contact, social links" },
            { label: "Analytics", desc: "Page views & visitor tracking" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 border-[3px] border-paper-white/10 bg-paper-white/5 px-4 py-3">
              <div className="h-2 w-2 flex-shrink-0 bg-secondary-container" />
              <div>
                <p className="font-display text-headline-md uppercase text-paper-white">{item.label}</p>
                <p className="font-body text-label-mono uppercase text-paper-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Login form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
