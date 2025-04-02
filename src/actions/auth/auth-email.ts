/*
File: auth-email.ts
Description: verifies current email for user.
*/

"use server";

import prisma from "@/lib/prisma";
import { generateVerificationToken } from "./auth-tokens";
import { sendVerificationEmail } from "./auth-mail";
import { v4 as uuidv4 } from "uuid";

export const verifyEmailChange = async (
  token: string,
  confirmEmail: string
) => {
  if (!confirmEmail || !token) {
    return { error: "Invalid new email or expired token." };
  }

  const tokenData = await prisma.emailChangeToken.findUnique({
    where: { token },
  });

  if (!tokenData) {
    return { error: "Invalid or expired token." };
  }

  if (tokenData.confirmedAt !== null)
    if (new Date() > tokenData.expires) {
      return { error: "Token has expired." };
    }

  if (confirmEmail.toLowerCase() !== tokenData.newEmail) {
    return { error: "The confirmed email does not match the requested email." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: tokenData.email },
  });

  if (!existingUser || !existingUser.id) {
    return { error: "User with old email could not be found." };
  }

  await prisma.user.update({
    where: { email: tokenData.email },
    data: {
      email: tokenData.newEmail,
      emailVerified: null,
      refreshToken: uuidv4(),
    },
  });

  await prisma.account.deleteMany({
    where: { userId: existingUser.id },
  });

  const verificationToken = await generateVerificationToken(tokenData.newEmail);
  await sendVerificationEmail(tokenData.newEmail, verificationToken.token);

  await prisma.emailChangeToken.update({
    where: { id: tokenData.id },
    data: { confirmedAt: new Date() },
  });

  return { success: "Email changed successfully." };
};
