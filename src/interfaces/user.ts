import { Gender, Interest, Role } from "@/enums";

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar_url: string;
  biography: string;
  roles: Role[];
  gender: Gender;
  interests: Interest[];
}
