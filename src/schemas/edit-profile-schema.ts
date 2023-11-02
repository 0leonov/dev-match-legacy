import { z } from "zod";

import { registerSchema } from "./register-schema";

import { Gender, Interest } from "@/enums";

export const editProfileSchema = registerSchema.and(
  z.object({
    gender: z.nativeEnum(Gender),
    interests: z.nativeEnum(Interest).array(),
    biography: z
      .string()
      .max(140, "Biography must be shorter than 150 characters."),
  }),
);

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
