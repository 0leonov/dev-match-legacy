import { useState } from "react";

import { Method } from "@/enums/method";
import { useAxiosPrivateInstance } from "@/hooks/auth/use-axios-private-instance";
import { axiosInstance, getAxiosErrorMessage } from "@/lib";

export function useLazyRequest<T>(
  url: string,
  method: Method,
  isPrivate = false,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const axiosPrivateInstance = useAxiosPrivateInstance();

  async function post(payload: unknown) {
    setIsLoading(true);
    setError(null);

    try {
      let axiosResponse;

      if (method === Method.POST) {
        axiosResponse = isPrivate
          ? await axiosPrivateInstance.post<T>(url, payload)
          : await axiosInstance.post<T>(url, payload);
      } else if (method === Method.PATCH) {
        axiosResponse = isPrivate
          ? await axiosPrivateInstance.patch<T>(url, payload)
          : await axiosInstance.patch<T>(url, payload);
      } else {
        return;
      }

      setData(axiosResponse.data);
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
