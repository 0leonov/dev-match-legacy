import { useRouter } from "next/navigation";
import { useState } from "react";

import { UseAxiosPrivateInstance } from "@/hooks/use-axios-private-instance";
import { useAppDispatch } from "@/store";
import { resetSession } from "@/store/slices/session-slice";

export function useLogout() {
  const appDispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivateInstance = UseAxiosPrivateInstance();

  async function logout() {
    setIsLoading(true);
    const response = await axiosPrivateInstance.post("/auth/logout");

    if (response?.status === 200) {
      appDispatch(resetSession());
      router.push("/welcome");
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    logout,
  };
}
