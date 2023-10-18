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
  const [error, setError] = useState<AxiosError | null>(null);

  const appDispatch = useAppDispatch();
  const router = useRouter();

  const axiosPrivateInstance = UseAxiosPrivateInstance();

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
      return;
    }

    if (user) {
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
      } catch (err) {
        console.log(12345);

        if (err instanceof AxiosError && err.name != "CanceledError") {
          setError(err);
          appDispatch(resetSession());
        } else {
          console.error(err);
        }
      } finally {
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
