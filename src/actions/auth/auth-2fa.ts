/*
File: auth-2FA.ts
Description: Toggles 2FA for a user.
*/

"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const toggleTwoFactor = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return { error: "User not found!" };
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { isTwoFactorEnabled: !user.isTwoFactorEnabled },
  });

  return {
    success: `Two-factor authentication ${
      updatedUser.isTwoFactorEnabled ? "activated" : "deactivated"
    } successfully!`,
  };
};
