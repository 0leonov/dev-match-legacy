import axios, { type AxiosInstance } from "axios";

const BASE_URL = "https://localhost:3001/api/";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});