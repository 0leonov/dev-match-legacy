import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLazyPost } from "@/hooks/use-lazy-post";
import { LoginResponse } from "@/interfaces";
import { useAppDispatch } from "@/store";
import { updateSession } from "@/store/slices/session-slice";

export function useRegister() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const { isLoading, error, data, post } =
    useLazyPost<LoginResponse>("/auth/register");

  useEffect(() => {
    if (data) {
      appDispatch(updateSession(data));
      router.push("/");
    }
  }, [appDispatch, data, router]);

  async function register(payload: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    await post(payload);
  }

  return {
    isLoading,
    error,
    register,
  };
}
