import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Header({ title, text }: { title?: string; text?: string }) {
  return (
    <div className="p-8 sm:pt-24">
      <Link href="/welcome">
        <Image
          src="/images/logo.svg"
          alt=""
          width={64}
          height={64}
          className="mx-auto"
        />
      </Link>

      <h1 className="mt-4 text-center text-4xl font-extrabold tracking-tight">
        {title}
      </h1>

      <p className="mt-2 text-center text-lg text-muted-foreground">{text}</p>
    </div>
  );
}
