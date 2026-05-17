import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/auth";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <AdminShell userEmail={session.user?.email ?? "admin@mavenforge.com"}>
      {children}
    </AdminShell>
  );
}
