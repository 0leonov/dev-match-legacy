import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const sectionVariants = cva("", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      secondary: "bg-secondary text-secondary-foreground py-12",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Section({
  children,
  className,
  variant,
}: VariantProps<typeof sectionVariants> & {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(sectionVariants({ variant }))}>
      <div className={cn("container", className)}>{children}</div>
    </section>
  );
}
