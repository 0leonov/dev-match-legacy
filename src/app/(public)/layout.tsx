"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useAppSelector } from "@/store";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = !!useAppSelector(
    (state) => state.session.accessToken,
  );

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return children;
}
