import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Method } from "@/enums/method";
import { useLazyRequest } from "@/hooks/use-lazy-request";
import { LoginResponse } from "@/interfaces";
import { LoginSchema } from "@/schemas/login-schema";
import { useAppDispatch } from "@/store";
import { updateSession } from "@/store/slices/session-slice";

export function useLogin() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const { isLoading, error, data, post } = useLazyRequest<LoginResponse>(
    "/auth/login",
    Method.POST,
  );

  useEffect(() => {
    if (data) {
      appDispatch(updateSession(data));
      router.push("/");
    }
  }, [appDispatch, data, router]);

  function login(payload: LoginSchema) {
    post(payload);
  }

  return {
    isLoading,
    error,
    login,
  };
}
