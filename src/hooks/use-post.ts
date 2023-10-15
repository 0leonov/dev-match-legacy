import { AxiosError } from "axios";
import { useState } from "react";

import { getAxiosInstance } from "@/lib/axios-instance";

export function usePost<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  async function post(payload: unknown) {
    setIsLoading(true);
    setError(null);

    try {
      const { data: responseData } = await getAxiosInstance().post<T>(
        url,
        payload,
      );

      setData(responseData);
    } catch (responseError) {
      if (responseError instanceof AxiosError) {
        setError(
          responseError?.response?.data?.message || responseError.message,
        );
      } else {
        setError("Unexpected error.");
      }
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
