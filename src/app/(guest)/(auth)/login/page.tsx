import Link from "next/link";
import React from "react";

import { Header } from "../components/header";

import { LoginForm } from "@/forms/login-form";

export default function LoginPage() {
  return (
    <main>
      <Header
        title="Log in to your account"
        text="Welcome back! Please enter your details."
      />

      <LoginForm className="max-w-md w-full mx-auto p-8 bg-secondary xs:rounded-xl" />

      <p className="p-8 text-center">
        {"Don't have an account? "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
        .
      </p>
    </main>
  );
}
