"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

import { CurrentUserAvatar } from "@/components/current-user-avatar";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UseUpdateAvatar } from "@/hooks/auth/use-update-avatar";
import { cn } from "@/lib";

export function UpdateAvatarForm({ className }: { className?: string }) {
  const { isLoading, error, update } = UseUpdateAvatar();

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Change photo failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleImageSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (!e.target.files) {
      return;
    }

    update(e.target.files[0]);
  };

  return (
    <div
      className={cn(
        "px-8 py-4 rounded-xl bg-secondary flex justify-between items-center",
        className,
      )}
    >
      <CurrentUserAvatar className="w-[76px] h-[76px]" />

      <label
        htmlFor="image"
        className={buttonVariants({ size: "lg", variant: "accent" })}
      >
        <input
          id="image"
          type="file"
          className="hidden"
          onChange={handleImageSelected}
          disabled={isLoading}
        />
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Change photo
      </label>
    </div>
  );
}
