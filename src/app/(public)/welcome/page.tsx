import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/layouts/section";

export default function WelcomePage() {
  return (
    <div>
      <header>
        <div className="p-8 flex justify-between">
          <Image src="/logo.svg" alt="" width={64} height={64} />

          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Login
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </header>

      <Section className="flex items-center justify-center gap-16 flex-col-reverse lg:flex-row">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Welcome to <span className="text-primary">Dev Match</span>!
          </h2>

          <h1 className="text-5xl font-extrabold tracking-tight">
            «Where Tech Professionals{" "}
            <span className="text-primary">Unite</span>»
          </h1>

          <p className="mt-6">
            Are you an IT specialist looking for exciting projects,
            collaboration opportunities, or fellow tech enthusiasts to connect
            with?
          </p>

          <Link
            href="/register"
            className={`${buttonVariants({ size: "lg" })} mt-6`}
          >
            Join us
          </Link>
        </div>

        <Skeleton className="w-full max-w-screen-lg h-[400px]" />
      </Section>
    </div>
  );
}
