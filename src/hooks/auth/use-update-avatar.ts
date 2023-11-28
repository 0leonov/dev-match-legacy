import { useState } from "react";

import { useAxiosPrivateInstance } from "@/hooks/auth/use-axios-private-instance";
import { getAxiosErrorMessage } from "@/lib";
import { useAppDispatch } from "@/store";
import { updateUser } from "@/store/slices/session-slice";

export function UseUpdateAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const axiosPrivateInstance = useAxiosPrivateInstance();

  const appDispatch = useAppDispatch();

  async function update(image: File) {
    const formData = new FormData();
    formData.set("image", image);

    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axiosPrivateInstance.put("/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      appDispatch(updateUser(data));
    } catch (requestError) {
      const errorMessage = getAxiosErrorMessage(requestError);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    update,
  };
}
