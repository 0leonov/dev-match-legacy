"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store";

export function CurrentUserAvatar({ className }: { className?: string }) {
  const user = useAppSelector((state) => state.session.user);

  if (!user) {
    return null;
  }

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.avatar_url} />
      <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
