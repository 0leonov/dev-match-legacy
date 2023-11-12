import { useCallback } from "react";

import { axiosInstance } from "@/lib/axios-instance";
import { useAppDispatch } from "@/store";
import { updateToken } from "@/store/slices/session-slice";

interface RefreshResponse {
  accessToken: string;
}

export function useRefreshTokens() {
  const appDispatch = useAppDispatch();

  return useCallback(async () => {
    const response = await axiosInstance.post<RefreshResponse>("/auth/refresh");
    const { accessToken } = response.data;

    appDispatch(updateToken(accessToken));

    return accessToken;
  }, [appDispatch]);
}
