import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAxiosPrivateInstance } from "@/hooks/auth/use-axios-private-instance";
import { getAxiosErrorMessage } from "@/lib";
import { useAppDispatch } from "@/store";
import { resetSession } from "@/store/slices/session-slice";

export function useLogout() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const axiosPrivateInstance = useAxiosPrivateInstance();

  async function logout() {
    setIsLoading(true);

    try {
      await axiosPrivateInstance.post("/auth/logout");
      appDispatch(resetSession());
      router.push("/welcome");
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
    logout,
  };
}
