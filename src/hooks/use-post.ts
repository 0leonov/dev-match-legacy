import { useState } from "react";
import { AxiosError } from "axios";

import { getAxiosInstance } from "@/lib/axios-instance";

export function usePost<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  async function post(payload: any) {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await getAxiosInstance().post<T>(url, payload);

      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message || error.message);
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
