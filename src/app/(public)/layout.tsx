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

  const { isLoading, error, user } = useSession();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (user) {
    return null;
  }

  return children;
}
