import { axiosInstance } from "@/lib/axios-instance";
import { useAppDispatch } from "@/store";
import { updateToken } from "@/store/slices/session-slice";

interface RefreshResponse {
  accessToken: string;
}

export function useRefreshTokens() {
  const appDispatch = useAppDispatch();

  return async () => {
    const response = await axiosInstance.post<RefreshResponse>("/auth/refresh");

    const accessToken = response.data.accessToken;

    appDispatch(updateToken(accessToken));

    return accessToken;
  };
}
