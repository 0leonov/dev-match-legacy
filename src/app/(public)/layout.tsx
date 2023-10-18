"use client";

import { useRouter } from "next/router";
import React from "react";

import { useSession } from "@/hooks/auth/use-session";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  //
  // const { isLoading, error, user } = useSession();
  //
  // if (isLoading) {
  //   return "loading";
  // }
  //
  // if (user) {
  //   router.push("/");
  //   return;
  // }
  //
  // console.log({ isLoading, error, user });

  return children;
}
