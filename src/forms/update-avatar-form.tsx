import React from "react";

import { CurrentUserAvatar } from "@/components/current-user-avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";

export function UpdateAvatarForm({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg bg-secondary flex justify-between items-center",
        className,
      )}
    >
      <CurrentUserAvatar className="w-14 h-14" />

      <label htmlFor="image" className={buttonVariants()}>
        <input id="image" type="file" className="hidden" />
        Change photo
      </label>
    </div>
  );
}
