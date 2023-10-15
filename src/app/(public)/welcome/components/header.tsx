import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex justify-between items-center">
      <Image src="/logo.svg" alt="" width={64} height={64} />

      <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
        Login
        <ChevronRight className="w-5 h-5 ml-2" />
      </Link>
    </header>
  );
}
