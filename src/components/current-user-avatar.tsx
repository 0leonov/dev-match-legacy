"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/hooks/auth/use-session";

export function CurrentUserAvatar({ className }: { className?: string }) {
  const { user } = useSession();

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.avatar_url} />
      <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
