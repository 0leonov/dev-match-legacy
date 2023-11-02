import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";

export function ScrollDownButton({ elementId }: { elementId: string }) {
  return (
    <Link
      className={buttonVariants({ variant: "none", size: "icon" })}
      href={`/welcome#${elementId}`}
    >
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </Link>
  );
}
