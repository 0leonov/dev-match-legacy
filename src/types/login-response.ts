import { User } from "@/types/user";

export interface LoginResponse {
  accessToken: string;
  user: User;
}
