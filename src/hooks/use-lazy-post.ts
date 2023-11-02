import { AxiosError } from "axios";
import { useState } from "react";

import { axiosInstance } from "@/lib/axios-instance";

export function useLazyPost<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  async function post(payload: unknown) {
    setIsLoading(true);
    setError(null);

    try {
      const axiosResponse = await axiosInstance.post<T>(url, payload);

      setData(axiosResponse.data);
    } catch (requestError) {
      setError(
        requestError instanceof AxiosError
          ? requestError?.response?.data?.message || requestError.message
          : "Unexpected error.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    data,
    post,
  };
}
