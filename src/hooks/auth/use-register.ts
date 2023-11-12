import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Method } from "@/enums/method";
import { useLazyRequest } from "@/hooks/use-lazy-request";
import { LoginResponse } from "@/interfaces";
import { RegisterSchema } from "@/schemas/register-schema";
import { useAppDispatch } from "@/store";
import { updateSession } from "@/store/slices/session-slice";

export function useRegister() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const { isLoading, error, data, post } = useLazyRequest<LoginResponse>(
    "/auth/register",
    Method.POST,
  );

  useEffect(() => {
    if (data) {
      appDispatch(updateSession(data));
      router.push("/");
    }
  }, [appDispatch, data, router]);

  async function register(payload: RegisterSchema) {
    await post(payload);
  }

  return {
    isLoading,
    error,
    register,
  };
}
