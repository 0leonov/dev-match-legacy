"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/use-logout";
import { useSession } from "@/hooks/auth/use-session";

export default function Home() {
  const { user } = useSession();

  const { isLoading, logout } = useLogout();

  function logoutHandler() {
    logout();
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Profile</h1>

      <div className="leading-7 [&:not(:first-child)]:mt-6">
        <p>Username: {user?.username}</p>
      </div>

      <Button onClick={logoutHandler} disabled={isLoading}>
        Logout
      </Button>
    </main>
  );
}
