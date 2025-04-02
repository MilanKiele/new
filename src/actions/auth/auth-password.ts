/*
File: change-password.ts
Description: Function to update the user's password.
*/

"use server";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import {
  NewPasswordSchema,
  NewPasswordSchemaData,
} from "@/schemas/auth/auth-schemas";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client"; // if you're using Prisma

export const changePassword = async (
  values: NewPasswordSchemaData,
  user: User
) => {
  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: validateFields.error.message };
  }

  const { password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { hashedPassword: hashedPassword, refreshToken: uuidv4() },
  });

  return { success: "Password updated!" };
};
