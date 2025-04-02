/*
File: delete-user.ts
Description: Next.js API route to delete user based on confirmation token.
*/

"use server";

import { getDeleteTokenByToken, getUserByEmail } from "@/utils/auth/auth-utils";
import prisma from "@/lib/prisma";

export const deleteUser = async (
  confirmEmail: string,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token!" };
  }

  const existingToken = await getDeleteTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token!" };
  }

  const hasExpired = new Date() > existingToken.expires;

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  if (existingToken.email !== confirmEmail.toLowerCase()) {
    return { error: "Invalid Confirmation Email!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  await prisma.deleteToken.delete({
    where: { id: existingToken.id },
  });

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      email: null,
      hashedPassword: null,
      accounts: { deleteMany: {} },
      profile: {
        update: {
          username: null,
          bio: null,
          location: null,
          birthDate: null,
        },
      },
    },
  });

  return { success: "User deleted successfully!" };
};
