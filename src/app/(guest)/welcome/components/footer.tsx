import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";

const content = [
  {
    title: "Company",
    links: [
      {
        title: "About us",
        href: "/about-us",
      },
      {
        title: "Terms of Service",
        href: "/terms",
      },
      {
        title: "Privacy Policy",
        href: "/terms",
      },
    ],
  },
  {
    title: "Account",
    links: [
      {
        title: "Register",
        href: "/registerSchema",
      },
      {
        title: "Log in",
        href: "/loginSchema",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-8 text-sm">
        <div className="flex gap-8 flex-col sm:flex-row">
          <div className="max-w-md">
            <div className="flex gap-2">
              <Image src="/images/logo.svg" alt="" width={32} height={32} />

              <h1 className="text-foreground text-2xl font-semibold tracking-tight">
                Dev Match
              </h1>
            </div>

            <p className="mt-2">
              Social network for IT specialists – search, collaborate, learn,
              communicate
            </p>
          </div>

          {content.map(({ title, links }) => {
            return (
              <div key={title}>
                <h2 className="text-foreground font-semibold tracking-tight">
                  {title}
                </h2>

                <ul className="mt-4 space-y-2">
                  {links.map((link) => {
                    return (
                      <li key={link.title}>
                        <Link href={link.href}>{link.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <Separator className="my-8" />

        <p>
          Created by{" "}
          <Link
            className="font-medium underline-offset-4 hover:underline"
            href="https://github.com/0leonov"
            target="_blank"
          >
            Artyom Leonov
          </Link>
          . The source code is available on{" "}
          <Link
            className="font-medium underline-offset-4 hover:underline"
            href="https://github.com/0leonov/dev-match"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
