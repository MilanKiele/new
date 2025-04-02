/*
File: profile.ts
Description: Changes Profile details.
*/

"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { profileSchema } from "@/schemas/auth/profile-schemas";

export const updateProfile = async (data: unknown) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const parsed = profileSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || "Invalid input.",
    };
  }

  const { username, bio, location, birthDate } = parsed.data;

  try {
    if (username) {
      const existing = await prisma.profile.findFirst({
        where: {
          username,
          userId: { not: session.user.id },
        },
      });

      if (existing) {
        return { error: "Username is already taken." };
      }
    }

    let profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId: session.user.id,
          username,
          bio,
          location,
          birthDate: birthDate ? new Date(birthDate) : undefined,
        },
      });
    } else {
      profile = await prisma.profile.update({
        where: { userId: session.user.id },
        data: {
          username,
          bio,
          location,
          birthDate: birthDate ? new Date(birthDate) : undefined,
        },
      });
    }

    return { success: "Profile updated successfully!", profile };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
};
