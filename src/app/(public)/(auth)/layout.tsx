import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary">
      <header>
        <div className="px-8 py-4 flex items-center justify-between">
          <Link href="/welcome">
            <Image src="/logo.svg" alt="" width={64} height={64} />
          </Link>

          <Link
            href="/register"
            className={buttonVariants({ variant: "ghost" })}
          >
            Already have an acccount?
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
