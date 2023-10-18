"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { useSession } from "@/hooks/auth/use-session";

export default function Home() {
  const { error, user } = useSession();

  const router = useRouter();

  if (error?.response?.status === 401) {
    router.push("/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Profile</h1>

      <div className="leading-7 [&:not(:first-child)]:mt-6">
        <p>Username: {user?.username}</p>
      </div>
    </main>
  );
}
