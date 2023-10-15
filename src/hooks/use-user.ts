import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAxiosInstance } from "@/lib/axios-instance";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUser } from "@/store/slices/session-slice";
import { User } from "@/types/user";

export function useUser() {
  const { accessToken, user } = useAppSelector((state) => state.session);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const appDispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      return router.push("/login");
    }

    getAxiosInstance(accessToken)
      .get<User>("/users/me")
      .then(({ data: responseData }) => {
        appDispatch(setUser(responseData));
      })
      .catch((responseError) => {
        if (responseError instanceof AxiosError) {
          if (responseError.code === "401") {
            return router.push("/login");
          }

          setError(
            responseError?.response?.data?.message || responseError.message,
          );
        } else {
          setError("Unexpected error.");
        }
      })
      .finally(() => setIsLoading(false));
  }, [accessToken, appDispatch, router]);

  return {
    isLoading,
    error,
    user,
  };
}
