/*
File: auth-login.ts
Description: Login for the user. 2 executions required if 2FA is enabled.
*/

"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { LoginSchema, LoginSchemaData } from "@/schemas/auth/auth-schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/utils/auth/auth-utils";
import { sendVerificationEmail } from "@/actions/auth/auth-mail";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/actions/auth/auth-tokens";
import { sendTwoFactorEmail } from "@/actions/auth/auth-mail";
import { getTwoFactorTokenByEmail } from "@/utils/auth/auth-utils";
import { getTwoFactorConfirmationByUserId } from "@/utils/auth/auth-utils";
import prisma from "@/lib/prisma";

export const loginUser = async (values: LoginSchemaData) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid input" };
  }

  const { email, password, code } = validateFields.data;

  // Set lower case email
  const lowerMail = email.toLowerCase();
  const existingUser = await getUserByEmail(lowerMail);

  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.hashedPassword) {
    return { error: "Error. Please try previous login method like oauth." };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(existingUser.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  }

  // 2FA
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    // Check password first!
    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );
    if (!passwordMatch) {
      return { error: "Invalid password" };
    }

    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "No Token found" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid 2FA token" };
      }

      const hasExpired = new Date() > new Date(twoFactorToken.expires);
      if (hasExpired) {
        return { error: "Token has expired" };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(existingUser.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials!" };
        }
        default: {
          return { error: "An error occurred" };
        }
      }
    }

    throw error; // for redirecting ?
  }
};
