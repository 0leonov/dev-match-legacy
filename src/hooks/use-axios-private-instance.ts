import { useEffect } from "react";

import { useRefreshTokens } from "@/hooks/use-refresh-tokens";
import { axiosPrivateInstance } from "@/lib/axios-instance";
import { useAppSelector } from "@/store";

export function UseAxiosPrivateInstance() {
  const refreshTokens = useRefreshTokens();

  const accessToken = useAppSelector((state) => state.session.accessToken);

  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = accessToken;
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          !previousRequest?.isRetryRequest
        ) {
          previousRequest.isRetryRequest = true;
          previousRequest.headers.Authorization = await refreshTokens();
          return axiosPrivateInstance(previousRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshTokens]);

  return axiosPrivateInstance;
}
