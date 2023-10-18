import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLazyPost } from "@/hooks/use-lazy-post";
import { useAppDispatch } from "@/store";
import { updateSession } from "@/store/slices/session-slice";
import { LoginResponse } from "@/types";

export function useLogin() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const { isLoading, error, data, post } =
    useLazyPost<LoginResponse>("/auth/login");

  useEffect(() => {
    if (data) {
      appDispatch(updateSession(data));
      router.push("/");
    }
  }, [appDispatch, data, router]);

  async function login(payload: { email: string; password: string }) {
    await post(payload);
  }

  return {
    isLoading,
    error,
    login,
  };
}
