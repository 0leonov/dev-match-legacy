import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";

import { useRefreshTokens } from "@/hooks/auth/use-refresh-tokens";
import { axiosPrivateInstance } from "@/lib/axios-instance";
import { useAppSelector } from "@/store";

interface PrivateAxiosRequestConfig extends AxiosRequestConfig {
  isRetryRequest?: boolean;
}

export function useAxiosPrivateInstance() {
  const refreshTokens = useRefreshTokens();

  const accessToken = useAppSelector((state) => state.session.accessToken);

  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        const newConfig = { ...config };
        newConfig.headers.Authorization = accessToken;
        return newConfig;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest: PrivateAxiosRequestConfig | undefined =
          error?.config;

        if (
          error.response?.status === 401 &&
          previousRequest &&
          !previousRequest?.isRetryRequest
        ) {
          previousRequest.isRetryRequest = true;

          if (previousRequest.headers) {
            previousRequest.headers.Authorization = await refreshTokens();
          } else {
            previousRequest.headers = { Authorization: await refreshTokens() };
          }

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
