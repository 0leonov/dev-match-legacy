import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LoginForm } from "@/forms/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen">
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
          Log in to your account
        </h1>

        <p className="mt-2 text-center text-lg text-muted-foreground">
          Welcome back! Please enter your details.
        </p>
      </div>

      <LoginForm className="max-w-md w-full mx-auto p-8 pb-10 bg-secondary xs:rounded-lg" />

      <p className="p-8 text-center">
        {"Don't have an account? "}
        <Link
          href="/register"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
        .
      </p>
    </main>
  );
}
