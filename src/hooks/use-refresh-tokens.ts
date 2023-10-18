import { axiosInstance } from "@/lib/axios-instance";
import { useAppDispatch } from "@/store";
import { updateToken } from "@/store/slices/session-slice";

interface RefreshResponse {
  accessToken: string;
}

export function useRefreshTokens() {
  const appDispatch = useAppDispatch();

  return async () => {
    const {
      data: { accessToken },
    } = await axiosInstance.post<RefreshResponse>("/auth/refresh");

    appDispatch(updateToken(accessToken));

    return accessToken;
  };
}
