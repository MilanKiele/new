/*
File: auth-utils.ts
Description: Retrievign Auth Data from a database
*/

// ___________________________________________________________________________
// Quick consts

export const redirectLoginPage = "/auth/login";

// Components
import prisma from "@/lib/prisma";

// ___________________________________________________________________________
// Retrieves a user by email address.
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Retrieves a user by user ID.
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Retrieves a password reset token by its token value.
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Getting Password Reset Token by Email
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Retrieves a two-factor confirmation record by user ID.
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: { userId },
      }
    );

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

// _________________________________________________________________________
// Retrieves a two-factor token by its token value.
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Retrieves a two-factor token by email address.
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Retrieves a verification token by email address.
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Retrieves a verification token by its token value.
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Retrieves a verification token by email address.
export const getDeleteTokenByEmail = async (email: string) => {
  try {
    const deleteToken = await prisma.deleteToken.findFirst({
      where: { email },
    });
    return deleteToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Delete Account Token
export const getDeleteTokenByToken = async (token: string) => {
  try {
    const deleteToken = await prisma.deleteToken.findUnique({
      where: { token },
    });
    return deleteToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Change Email Token
export const getEmailChangeTokenByToken = async (token: string) => {
  try {
    const emailChangeToken = await prisma.emailChangeToken.findUnique({
      where: { token },
    });
    return emailChangeToken;
  } catch {
    return null;
  }
};

// ___________________________________________________________________________
// Change Email Token
export const getEmailChangeTokenByEmail = async (email: string) => {
  try {
    const emailChangeToken = await prisma.emailChangeToken.findFirst({
      where: { email },
    });
    return emailChangeToken;
  } catch {
    return null;
  }
};
