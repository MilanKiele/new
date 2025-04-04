/*
File: auth-register.ts
Description: function to register a user.
*/

"use server";

import bcrypt from "bcryptjs";

import {
  RegisterSchema,
  RegisterSchemaData,
} from "@/schemas/auth/auth-schemas";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/utils/auth/auth-utils";
import { generateVerificationToken } from "@/actions/auth/auth-tokens";
import { sendVerificationEmail } from "@/actions/auth/auth-mail";

export const registerUser = async (values: RegisterSchemaData) => {
  const validateField = RegisterSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid input" };
  }

  const { email, password } = validateField.data;

  // Data processing
  const lowerEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  // Prisma POST
  const existingUser = await getUserByEmail(lowerEmail);

  if (existingUser) {
    return { error: "User already exists" };
  }

  await prisma.user.create({
    data: {
      email: lowerEmail,
      hashedPassword: hashedPassword,
      name: lowerEmail.split("@")[0],
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  return { success: "Email sent" };
};
