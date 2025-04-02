/*
File: auth-reset.ts
Description: Reset Password function.
*/

"use server";

import {
  ResetPasswordSchema,
  ResetPasswordSchemaData,
} from "@/schemas/auth/auth-schemas";
import { getUserByEmail } from "@/utils/auth/auth-utils";
import { generatePasswordResetToken } from "@/actions/auth/auth-tokens";
import { sendPasswordResetEmail } from "@/actions/auth/auth-mail";

export const resetPasswordMail = async (values: ResetPasswordSchemaData) => {
  const validateFields = ResetPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid input" };
  }

  let { email } = validateFields.data;
  email = email.toLowerCase();

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email sent" };
};
