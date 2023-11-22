import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";

export function WelcomeSection() {
  return (
    <section className="grow flex items-center justify-center">
      <div className="max-w-lg">
        <h2 className="text-3xl font-semibold tracking-tight">
          Welcome to <span className="text-accent">Dev Match</span>!
        </h2>

        <h1 className="text-5xl font-extrabold tracking-tight">
          «Where Tech Professionals <span className="text-accent">Unite</span>»
        </h1>

        <p className="mt-6">
          Are you an IT professional seeking thrilling projects, collaboration
          prospects, or like-minded tech enthusiasts to network with?
        </p>

        <Link
          href="/register"
          className={cn(
            buttonVariants({ size: "lg", variant: "accent" }),
            "mt-6",
          )}
        >
          Join us
        </Link>
      </div>
    </section>
  );
}
