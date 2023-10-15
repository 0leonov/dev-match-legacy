import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { usePost } from "@/hooks/use-post";
import { useAppDispatch } from "@/store";
import { set } from "@/store/slices/session-slice";
import { LoginResponse } from "@/types/login-response";

export function useRegister() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const { isLoading, error, data, post } =
    usePost<LoginResponse>("/auth/register");

  useEffect(() => {
    if (data) {
      appDispatch(set(data));
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
