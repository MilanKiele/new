/*
File: auth-email-mail.ts
Description: Sends mail for a new email adress.
*/

"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendVerificationEmail } from "./auth-mail";
import { generateEmailChangeToken } from "./auth-tokens";

export const requestEmailChange = async (newEmail: string) => {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return { error: "Unauthorized" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: newEmail.toLowerCase() },
  });

  if (existingUser) {
    return { error: "New email already in use." };
  }

  const token = await generateEmailChangeToken(session.user.email, newEmail);

  if (!token) {
    return { error: "Something went wrong. Please try again later" };
  }

  await sendVerificationEmail(session.user.email, token.token);

  return { success: "Verification email sent to the new address." };
};
