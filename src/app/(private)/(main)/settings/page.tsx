import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <main className="max-w-lg mx-auto p-8 py-12">
      <h1 className="text-5xl font-extrabold tracking-tight">Settings</h1>

      <Link
        href="/logout"
        className={`${buttonVariants({ variant: "destructive" })} w-full mt-6`}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sign out
      </Link>
    </main>
  );
}
