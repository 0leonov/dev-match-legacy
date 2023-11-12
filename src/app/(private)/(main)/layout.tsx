"use client";

import { Home, Search, Settings } from "lucide-react";
import React from "react";

import { CurrentUserAvatar } from "@/components/current-user-avatar";
import {
  NavigationSidebar,
  SidebarLink,
} from "@/components/layouts/navigation-sidebar";
import { useSession } from "@/hooks/auth/use-session";

const itemProps = [
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

const sidebarItems = itemProps.map(({ href, title, icon }) => (
  <SidebarLink key={title} href={href} title={title} icon={icon} />
));

const sidebarBottomItems = [
  <SidebarLink
    key="settings"
    href="/settings"
    title="Settings"
    icon={<Settings className="w-5 h-5" />}
  />,
];

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isFetching } = useSession(true);

  if (isFetching || !user) {
    return null;
  }

  return (
    <NavigationSidebar items={sidebarItems} bottomItems={sidebarBottomItems}>
      {children}
    </NavigationSidebar>
  );
}
