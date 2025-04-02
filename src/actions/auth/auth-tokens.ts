/*
File: auth-tokens.ts
Description: Creates Auth Tokens for the user.
*/

"use server";

import { v4 as uuidv4 } from "uuid";
import crypt from "crypto";

import {
  getDeleteTokenByEmail,
  getPasswordResetTokenByEmail,
} from "@/utils/auth/auth-utils";
import { getVerificationTokenByEmail } from "@/utils/auth/auth-utils";
import prisma from "@/lib/prisma";
import { getTwoFactorTokenByEmail } from "@/utils/auth/auth-utils";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypt.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateDeleteToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getDeleteTokenByEmail(email);

  if (existingToken) {
    await prisma.deleteToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const deleteToken = await prisma.deleteToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return deleteToken;
};

export const generateEmailChangeToken = async (
  email: string,
  newAddress: string
) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 3600 * 1000);

  // Get user to find userId
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found for this email.");
  }

  // Delete old token if it exists
  const existingToken = await prisma.emailChangeToken.findFirst({
    where: { userId: user.id },
  });

  if (existingToken) {
    await prisma.emailChangeToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newEmail = newAddress.toLowerCase();

  const emailChangeToken = await prisma.emailChangeToken.create({
    data: {
      userId: user.id,
      email,
      newEmail,
      token,
      expires,
    },
  });

  return emailChangeToken;
};
