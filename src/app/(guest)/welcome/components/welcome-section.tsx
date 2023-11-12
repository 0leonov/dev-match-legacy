import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";

export function WelcomeSection() {
  return (
    <section className="grow flex items-center justify-center">
      <div className="max-w-lg">
        <h2 className="text-3xl font-semibold tracking-tight">
          Welcome to <span className="text-primary">Dev Match</span>!
        </h2>

        <h1 className="text-5xl font-extrabold tracking-tight">
          «Where Tech Professionals <span className="text-primary">Unite</span>»
        </h1>

        <p className="mt-6">
          Are you an IT professional seeking thrilling projects, collaboration
          prospects, or like-minded tech enthusiasts to network with?
        </p>

        <Link
          href="/register"
          className={`${buttonVariants({ size: "lg" })} mt-6`}
        >
          Join us
        </Link>
      </div>
    </section>
  );
}
