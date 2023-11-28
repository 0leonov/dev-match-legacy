import Link from "next/link";
import React from "react";

import { Header } from "../components/header";

import { RegisterForm } from "@/forms/register-form";

export default function RegisterPage() {
  return (
    <main>
      <Header
        title="Create an account"
        text="Enter your details below to create your account."
      />

      <RegisterForm className="max-w-md w-full mx-auto p-8 bg-secondary xs:rounded-xl" />

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
