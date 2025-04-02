/*
File: new-verification.ts
Description: Function to update the user's email.
*/

"use server";

import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/utils/auth/auth-utils";
import { getVerificationTokenByToken } from "@/utils/auth/auth-utils";
import { unstable_update as updateToken } from "@/auth";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date() > existingToken.expires;

  if (hasExpired) {
    return { error: "Token expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email not found" };
  }

  const changedUser = await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  // Update Current Token
  updateToken({
    user: {
      name: changedUser.name,
      email: changedUser.email as string,
      isTwoFactorEnabled: changedUser.isTwoFactorEnabled,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified" };
};
