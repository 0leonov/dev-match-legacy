import { AxiosRequestConfig } from "axios";
import { useState } from "react";

import { Method } from "@/enums/method";
import { useAxiosPrivateInstance } from "@/hooks/auth/use-axios-private-instance";
import { axiosInstance, getAxiosErrorMessage } from "@/lib";

export function useLazyRequest<T>(
  url: string,
  method: Method,
  isPrivate = false,
  config?: AxiosRequestConfig<unknown> | undefined,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const axiosPrivateInstance = useAxiosPrivateInstance();

  async function post(payload: unknown) {
    setIsLoading(true);
    setError(null);

    try {
      const axiosInstanceToUse = isPrivate
        ? axiosPrivateInstance
        : axiosInstance;

      let axiosResponse;
      if (method === Method.POST) {
        axiosResponse = await axiosInstanceToUse.post<T>(url, payload, config);
      } else if (method === Method.PATCH) {
        axiosResponse = await axiosInstanceToUse.patch<T>(url, payload, config);
      } else if (method === Method.PUT) {
        axiosResponse = await axiosInstanceToUse.put<T>(url, payload, config);
      }

      if (axiosResponse) {
        setData(axiosResponse.data);
      }
    } catch (requestError) {
      const errorMessage = getAxiosErrorMessage(requestError);
      setError(errorMessage);
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    error,
    data,
    post,
  };
}
