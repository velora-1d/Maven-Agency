import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getOptionalSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getOptionalSession();

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 py-12">
      <div className="grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="brutal-card bg-blaze p-8 text-ink">
          <p className="text-xs uppercase tracking-[0.3em]">Internal Only</p>
          <h1 className="mt-4 font-[family:var(--font-display)] text-7xl uppercase leading-[0.88]">
            Control the Forge.
          </h1>
          <p className="mt-5 text-sm leading-7">
            Portfolio, services, testimonials, team, catalog, and site settings all
            live in one loud dashboard.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
