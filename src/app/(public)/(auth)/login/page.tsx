import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  console.log(1);

  return (
    <main className="min-h-screen bg-muted">
      <div className="p-8 sm:pt-24">
        <Link href="/welcome">
          <Image
            src="/logo.svg"
            alt=""
            width={48}
            height={48}
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

      <div className="max-w-md w-full mx-auto p-8 pb-10 border bg-card text-card-foreground shadow-sm xs:rounded-lg">
        <LoginForm />
      </div>

      <p className="p-8 text-center">
        {"Don't have an account? "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
