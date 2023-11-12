import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Method } from "@/enums/method";
import { useLazyRequest } from "@/hooks/use-lazy-request";
import { User } from "@/interfaces";
import { EditProfileSchema } from "@/schemas/edit-profile-schema";
import { useAppDispatch } from "@/store";
import { updateUser } from "@/store/slices/session-slice";

export function useEditProfile() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const { isLoading, error, data, post } = useLazyRequest<User>(
    "/me",
    Method.PATCH,
    true,
  );

  useEffect(() => {
    if (data) {
      appDispatch(updateUser(data));
    }
  }, [appDispatch, data, router]);

  async function edit(payload: EditProfileSchema) {
    await post(payload);
  }

  return {
    isLoading,
    error,
    edit,
  };
}
