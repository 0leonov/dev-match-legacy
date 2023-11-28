"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

import { CurrentUserAvatar } from "@/components/current-user-avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.session.user);

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto py-8 sm:max-w-screen-md xl:max-w-screen-lg xl:px-8 sm:py-24">
      <section className="flex px-8 gap-8 xl:px-16 xl:gap-16">
        <CurrentUserAvatar className="w-24 h-24 xl:w-40 xl:h-40" />

        <div>
          <div className="mb-4 flex gap-4 flex-col xl:flex-row xl:items-center">
            <h1 className="text-xl">{user.username}</h1>

            <div className="flex items-center gap-2">
              <Link
                href="/profile/edit"
                className={buttonVariants({ variant: "secondary" })}
              >
                Edit profile
              </Link>

              <Link
                href="/settings"
                className={buttonVariants({ size: "icon", variant: "ghost" })}
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <p>{user.biography}</p>
        </div>
      </section>

      <Separator className="my-8" />
    </main>
  );
}
