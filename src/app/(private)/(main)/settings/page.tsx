import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

import { PageLayout } from "@/components/layouts/page-layout";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";

export default function SettingsPage() {
  return (
    <PageLayout title="Settings">
      <div className="space-y-6">
        <ThemeToggle />

        <Link
          href="/logout"
          className={cn(buttonVariants({ variant: "destructive" }), "w-full")}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign out
        </Link>
      </div>
    </PageLayout>
  );
}
