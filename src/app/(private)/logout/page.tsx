"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/auth/use-logout";

export default function LogoutPage() {
  const { isLoading, error, logout } = useLogout();

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Sign out failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div>
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt=""
          width={64}
          height={64}
          className="mx-auto m-8 sm:mt-24"
        />
      </Link>

      <main className="max-w-md w-full mx-auto p-8 bg-secondary text-secondary-foreground xs:rounded-xl">
        <h1 className="text-center text-3xl tracking-tight">
          Are you sure you want to sign out?
        </h1>

        <Button
          onClick={logout}
          disabled={isLoading}
          className="w-full mt-8"
          variant="accent"
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Sign out
        </Button>
      </main>
    </div>
  );
}
