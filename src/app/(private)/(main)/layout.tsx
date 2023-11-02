"use client";

import { Home, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CurrentUserAvatar } from "@/components/current-user-avatar";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const navItemsProps = [
  {
    href: "/",
    title: "Home",
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: "/search",
    title: "Search",
    icon: <Search className="w-5 h-5" />,
  },
  {
    href: "/profile",
    title: "Profile",
    icon: <CurrentUserAvatar className="w-5 h-5" />,
  },
];

function NavItem({
  href,
  title,
  className,
  icon,
}: {
  href: string;
  title: string;
  className?: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "space-x-2 xl:justify-start xl:w-full xl:px-4 xl:py-2",
        className,
      )}
    >
      {icon}
      <span className="hidden xl:flex">{title}</span>
    </Link>
  );
}

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <ScrollArea className="w-full max-w-fit border-r hidden sm:flex">
        <aside className="min-h-screen px-4 py-8 flex flex-col gap-8">
          <Link
            href="/"
            className="flex justify-center items-center gap-2 xl:px-8"
          >
            <div className="w-8 h-8">
              <Image src="/images/logo.svg" width={64} height={64} alt="" />
            </div>

            <span className="text-xl font-medium hidden xl:flex">
              Dev Match
            </span>
          </Link>

          <nav className="grow flex flex-col gap-2">
            {navItemsProps.map(({ title, ...props }) => (
              <NavItem key={title} title={title} {...props} />
            ))}
          </nav>

          <NavItem
            href="/settings"
            title="Settings"
            icon={<Settings className="w-5 h-5" />}
          />
        </aside>
      </ScrollArea>

      <main className="grow">{children}</main>
    </div>
  );
}
