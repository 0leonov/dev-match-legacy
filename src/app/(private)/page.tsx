"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
import { signOut } from "@/store/slices/session-slice";
import { getAxiosInstance } from "@/lib/axios-instance";

export default function Home() {
  const { user } = useUser();

  const router = useRouter();

  const appDispatch = useAppDispatch();

  async function signOutHandler() {
    appDispatch(signOut());

    await getAxiosInstance().post("auth/logout");

    router.push("/welcome");
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Profile</h1>

      {user && (
        <div className="leading-7 [&:not(:first-child)]:mt-6">
          <p>ID: {user.id || <Skeleton className="h-4 w-12" />}</p>
          <p>Name: {user.name || <Skeleton className="h-4 w-12" />}</p>
          <p>Email: {user.email || <Skeleton className="h-4 w-12" />}</p>
          <p>Roles: {user.roles || <Skeleton className="h-4 w-12" />}</p>
          <p>Username: {user.username || <Skeleton className="h-4 w-12" />}</p>
        </div>
      )}

      <Button onClick={() => signOutHandler()}>Sign Out</Button>
    </main>
  );
}
