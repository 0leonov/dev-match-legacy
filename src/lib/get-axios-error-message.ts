import { AxiosError } from "axios";

export function getAxiosErrorMessage(requestError: unknown) {
  if (requestError instanceof AxiosError) {
    return requestError?.response?.data?.message || requestError.message;
  }

  return "Unexpected error.";
}
