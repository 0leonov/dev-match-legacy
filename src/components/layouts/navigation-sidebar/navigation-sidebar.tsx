import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

export function NavigationSidebar({
  children,
  items,
  bottomItems,
}: {
  children: React.ReactNode;
  items?: React.ReactNode[];
  bottomItems?: React.ReactNode[];
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

          <nav className="grow flex flex-col gap-2">{items}</nav>

          <nav className="flex flex-col gap-2">{bottomItems}</nav>
        </aside>
      </ScrollArea>

      <main className="grow">{children}</main>
    </div>
  );
}
