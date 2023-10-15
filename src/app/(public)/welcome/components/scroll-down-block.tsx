import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";

export function ScrollDownBlock() {
  return (
    <div className="text-center">
      <Link
        className={buttonVariants({ variant: "none", size: "icon" })}
        href="/welcome#why-choose-us"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </Link>
    </div>
  );
}
