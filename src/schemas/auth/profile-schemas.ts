/*
File: profile-schemas.ts
Description: This files contains schemas for profile edits.
*/

import { z } from "zod";

export type ProfileSchemaType = z.infer<typeof profileSchema>;
export const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(24, "Username must be at most 24 characters")
    .or(z.literal("")),
  bio: z.string().max(24, "Bio must be less than 24 characters").optional(),
  location: z.string().optional(),
  birthDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Birthdate must be a valid date"
    ),
});
