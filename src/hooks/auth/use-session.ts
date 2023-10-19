import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { UseAxiosPrivateInstance } from "@/hooks/use-axios-private-instance";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetSession, updateUser } from "@/store/slices/session-slice";
import { User } from "@/types";

export function useSession() {
  const { accessToken, user } = useAppSelector((state) => state.session);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const appDispatch = useAppDispatch();
  const router = useRouter();

  const axiosPrivateInstance = UseAxiosPrivateInstance();

  useEffect(() => {
    if (!accessToken) {
      appDispatch(resetSession());
      router.push("/login");
      setIsLoading(false);
      return;
    }

    if (user) {
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();

    async function fetchUser() {
      setIsLoading(true);

      try {
        const { data } = await axiosPrivateInstance.get<User>("/users/me", {
          signal: abortController.signal,
        });

        appDispatch(updateUser(data));
        setIsLoading(false);
      } catch (err) {
        if (err instanceof AxiosError && err.name === "CanceledError") {
          return;
        }

        appDispatch(resetSession());

        if (err instanceof AxiosError) {
          setError(err.response?.data.message || err.message);
        } else {
          setError("Unexpected error.");
        }

        setIsLoading(false);
      }
    }

    fetchUser();

    return () => {
      abortController.abort();
    };
  }, [accessToken, appDispatch, axiosPrivateInstance, router, user]);

  return {
    isLoading,
    error,
    user,
  };
}
