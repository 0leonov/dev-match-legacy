export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  roles: string[];
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
