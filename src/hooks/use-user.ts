import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { setUser } from "@/store/slices/session-slice";
import { useAppDispatch } from "@/store";
import { User } from "@/types/user";
import { getAxiosInstance } from "@/lib/axios-instance";
import { useAppSelector } from "@/store";

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
      .then(({ data }) => {
        appDispatch(setUser(data));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.code === "401") {
            return router.push("/login");
          }

          setError(error?.response?.data?.message || error.message);
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
