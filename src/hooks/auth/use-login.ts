import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLazyPost } from "@/hooks/use-lazy-post";
import { LoginResponse } from "@/interfaces";
import { useAppDispatch } from "@/store";
import { updateSession } from "@/store/slices/session-slice";

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

  function login(payload: { email: string; password: string }) {
    post(payload);
  }

  return {
    isLoading,
    error,
    login,
  };
}
