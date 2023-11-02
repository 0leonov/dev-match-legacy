import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLazyPost } from "@/hooks/use-lazy-post";
import { User } from "@/interfaces";
import { useAppDispatch } from "@/store";
import { updateUser } from "@/store/slices/session-slice";

export function useUpdate() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const { isLoading, error, data, post } = useLazyPost<User>("/me");

  useEffect(() => {
    if (data) {
      appDispatch(updateUser(data));
    }
  }, [appDispatch, data, router]);

  async function update(payload: { username?: string }) {
    console.log(payload.username);

    await post(payload);
  }

  return {
    isLoading,
    error,
    update,
  };
}
