import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";

export default function SettingsPage() {
  return (
    <main className="max-w-screen-md mx-auto p-8 py-12">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="mt-8 space-y-6">
        <ThemeToggle />

        <Link
          href="/logout"
          className={cn(buttonVariants({ variant: "destructive" }), "w-full")}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign out
        </Link>
      </div>
    </main>
  );
}
