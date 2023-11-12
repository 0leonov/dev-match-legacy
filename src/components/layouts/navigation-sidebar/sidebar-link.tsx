import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LinkButtonProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export function SidebarLink({ href, title, icon }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "space-x-2 xl:justify-start xl:w-full xl:px-4 xl:py-2",
      )}
    >
      {icon}
      <span className="hidden xl:flex">{title}</span>
    </Link>
  );
}
