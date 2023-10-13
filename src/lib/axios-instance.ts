import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export function getAxiosInstance(accessToken?: string) {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
}
