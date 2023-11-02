import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAxiosPrivateInstance } from "@/hooks/use-axios-private-instance";
import { User } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetSession, updateUser } from "@/store/slices/session-slice";

export function useSession(redirect: boolean = true) {
  const { accessToken, user } = useAppSelector((state) => state.session);
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const axiosPrivateInstance = useAxiosPrivateInstance();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      appDispatch(resetSession());
      setIsLoading(false);

      if (redirect) {
        router.push("/loginSchema");
      }

      return;
    }

    if (user) {
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        const { data } = await axiosPrivateInstance.get<User>("/me", {
          signal,
        });

        appDispatch(updateUser(data));

        setIsLoading(false);
      } catch (requestError) {
        if (
          requestError instanceof AxiosError &&
          requestError.code === "ERR_CANCELED"
        ) {
          return;
        }

        appDispatch(resetSession());
        setIsLoading(false);

        if (redirect) {
          router.push("/loginSchema");
        }
      }
    };

    fetchData().then();

    return () => {
      abortController.abort();
    };
  }, [accessToken, appDispatch, axiosPrivateInstance, redirect, router, user]);

  return {
    isLoading,
    user,
    accessToken,
  };
}
