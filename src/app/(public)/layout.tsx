"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

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
