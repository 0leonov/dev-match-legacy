import { useEffect } from "react";

import { useRefreshTokens } from "@/hooks/use-refresh-tokens";
import { axiosInstance } from "@/lib/axios-instance";
import { useAppSelector } from "@/store";

export function UseAxiosPrivateInstance() {
  const refreshTokens = useRefreshTokens();

  const accessToken = useAppSelector((state) => state.session.accessToken);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = accessToken;
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          !previousRequest?.isRetryRequest
        ) {
          previousRequest.isRetryRequest = true;
          previousRequest.headers.Authorization = await refreshTokens();
          return axiosInstance(previousRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshTokens]);

  return axiosInstance;
}
