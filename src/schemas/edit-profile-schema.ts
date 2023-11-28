import { z } from "zod";

import { Gender, Interest } from "@/enums";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be longer than 3 characters.")
    .max(32, "Name must be shorten than 32 characters."),
  username: z
    .string()
    .min(3, "Username must be longer than 3 characters.")
    .max(32, "Username must be shorten than 32 characters.")
    .refine(
      (value) => /^[a-zA-Z0-9_]+$/.test(value),
      "Username can only consist of Latin characters, numbers and underscores.",
    ),
  biography: z
    .string()
    .max(140, "Biography must be shorter than 150 characters."),
  gender: z.nativeEnum(Gender),
  interests: z.array(z.nativeEnum(Interest)),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
