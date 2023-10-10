import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { usePost } from "@/hooks/use-post";
import { LoginResponse } from "@/types/login-response";
import { set } from "@/store/slices/session-slice";
import { useAppDispatch } from "@/store";

export function useLogin() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const { isLoading, error, data, post } =
    usePost<LoginResponse>("/auth/login");

  useEffect(() => {
    if (data) {
      appDispatch(set(data));
      router.push("/");
    }
  }, [appDispatch, data, router]);

  async function login(email: string, password: string) {
    await post({ email, password });
  }

  return {
    isLoading,
    error,
    login,
  };
}
