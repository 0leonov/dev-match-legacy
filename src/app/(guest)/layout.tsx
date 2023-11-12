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

  const { user, isFetching } = useSession();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  if (user || isFetching) {
    return null;
  }

  return children;
}
