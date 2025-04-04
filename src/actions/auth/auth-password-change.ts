/*
File: change-password.ts
Description: Function to change the current user's password using session.
*/

"use server";

import { auth } from "@/auth";
import { changePassword } from "./auth-password";
import {
  NewPasswordSchema,
  NewPasswordSchemaData,
} from "@/schemas/auth/auth-schemas";
import { getUserById } from "@/utils/auth/auth-utils";

export const changePasswordWithSession = async (
  values: NewPasswordSchemaData
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Not authenticated!" };
  }

  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: validateFields.error.message };
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return { error: "User not found!" };
  }

  const pw = await changePassword(values, user.id);

  if (!pw.success) {
    return { error: pw.error };
  }

  return { success: "Password updated successfully!" };
};
