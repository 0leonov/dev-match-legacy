import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAxiosPrivateInstance } from "@/hooks/auth/use-axios-private-instance";
import { User } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  resetSession,
  updateUser,
  updateIsFetching,
} from "@/store/slices/session-slice";

export function useSession(redirect = false) {
  const { accessToken, user, isFetching } = useAppSelector(
    (state) => state.session,
  );
  const appDispatch = useAppDispatch();
  const axiosPrivateInstance = useAxiosPrivateInstance();
  const router = useRouter();

  useEffect(() => {
    if (user || !accessToken) {
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    async function fetch() {
      try {
        appDispatch(updateIsFetching(true));

        const { data } = await axiosPrivateInstance.get<User>("/me", {
          signal,
        });

        appDispatch(updateUser(data));
        appDispatch(updateIsFetching(false));
      } catch (error) {
        if (error instanceof AxiosError && error.code === "ERR_CANCELED") {
          return;
        }

        appDispatch(resetSession());
        appDispatch(updateIsFetching(false));
        if (redirect) {
          router.push("/login");
        }
      }
    }

    fetch();

    return () => abortController.abort();
  }, [accessToken, appDispatch, axiosPrivateInstance, redirect, router, user]);

  return {
    user,
    accessToken,
    isFetching,
  };
}
