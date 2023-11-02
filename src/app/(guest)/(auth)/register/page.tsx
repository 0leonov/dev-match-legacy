import Image from "next/image";
import Link from "next/link";
import React from "react";

import { RegisterForm } from "@/forms";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-muted">
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
          Create an account
        </h1>

        <p className="mt-2 text-center text-lg text-muted-foreground">
          Enter your details below to create your account.
        </p>
      </div>

      <RegisterForm className="max-w-md w-full mx-auto p-8 pb-10 border bg-card text-card-foreground shadow-sm xs:rounded-lg" />

      <p className="p-8 text-center">
        {"Already have an account? "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Log in
        </Link>
        .
      </p>
    </main>
  );
}
