"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import ProfileCompletionForm from "@/components/admin/ProfileCompletionForm";
import { getCurrentUser, needsProfileCompletion, AdminUser } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      if (isLoginPage) {
        if (!cancelled) setChecked(true);
        return;
      }

      const currentUser = await getCurrentUser();

      if (cancelled) return;

      if (!currentUser) {
        router.replace("/admin/login");
      } else {
        setUser(currentUser);
        setChecked(true);
      }
    }

    setChecked(false);
    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>Loading...</p>
      </div>
    );
  }

  if (needsProfileCompletion(user)) {
    return (
      <ProfileCompletionForm
        fullName={user?.fullName || ""}
        onComplete={async () => {
          const refreshedUser = await getCurrentUser();
          setUser(refreshedUser);
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-gray-bg)" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2.5rem 3rem", overflowX: "hidden" }}>
        {children}
      </main>
    </div>
  );
}