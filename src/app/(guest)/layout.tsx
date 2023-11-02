"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useSession } from "@/hooks/auth/use-session";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isLoading, user } = useSession(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (isLoading || user) {
    return null;
  }

  return children;
}
