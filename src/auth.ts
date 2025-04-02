/*
  File: auth.ts
  Description: Defines authentication configurations and handlers using NextAuth.
  Sets email always to lowercase!
*/

import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import authConfig from "@/auth.config";
import { getUserByEmail, getUserById } from "@/utils/auth/auth-utils";
import { getTwoFactorConfirmationByUserId } from "@/utils/auth/auth-utils";
import {
  generateAccessToken,
  isAccessTokenValid,
} from "./utils/auth/auth-jwt-token";

// Fixing Session type for typescript
export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  email: string;
  isTwoFactorEnabled: boolean;
  refreshToken?: string | null;
  accessToken?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    accessToken?: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn, // export signIn
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    // error: "/auth/error", -> default
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          profile: {
            create: {},
          },
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // If OAuth login (Google, GitHub, etc.)

      if (account?.provider !== "credentials") {
        const oauthUser = await getUserByEmail(user.email!);

        if (oauthUser) {
          // check for alternate accounts (unverified)
          if (!oauthUser.emailVerified) {
            await prisma.user.update({
              where: { id: oauthUser.id },
              data: {
                hashedPassword: null,
                emailVerified: new Date(),
              },
            });
          }

          if (account) {
            // Check if the OAuth account is already linked
            const linkedAccount = await prisma.account.findFirst({
              where: {
                userId: oauthUser.id,
                provider: account.provider,
              },
            });

            if (!linkedAccount) {
              // Link the OAuth account manually
              await prisma.account.create({
                data: {
                  userId: oauthUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  token_type: account.token_type,
                  id_token: account.id_token,
                  refresh_token: account.refresh_token,
                  scope: account.scope,
                  expires_at: account.expires_at,
                  session_state: account.session_state as string | null,
                },
              });
            }
          }

          return true;
        }

        // If user doesn't exist, allow NextAuth to create them
        return true;
      }

      // Prevent signin without email verification
      const existingUser = await getUserById(user.id as string);
      if (!existingUser?.emailVerified) return false;

      // Two-factor authentication logic 2FA
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      // Else, allow signin
      return true;
    },
    async jwt({ token, user }) {
      // Initial sign-in (user vorhanden)y
      if (user) {
        const dbUser = await getUserById(user.id as string);
        if (!dbUser) return null;

        token.sub = dbUser.id;
        token.email = dbUser.email?.toLowerCase();
        token.name = dbUser.name;
        token.isTwoFactorEnabled = (dbUser as ExtendedUser).isTwoFactorEnabled;
        token.accessToken = await generateAccessToken(dbUser.id as string);
        token.lastUpdate = new Date();
        token.refreshToken = (dbUser as ExtendedUser).refreshToken as string;
        return token;
      }

      // Token Validierung
      if (!token.sub) return null;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return null;

      if (existingUser) {
        token.sub = existingUser.id;
        token.email = existingUser.email?.toLowerCase();
        token.name = existingUser.name;
        token.isTwoFactorEnabled = (
          existingUser as ExtendedUser
        ).isTwoFactorEnabled;
      }

      const isValid = await isAccessTokenValid(token.accessToken as string);

      if (!isValid) {
        if (
          token.refreshToken &&
          token.refreshToken === existingUser.refreshToken
        ) {
          token.accessToken = await generateAccessToken(existingUser.id);
        } else {
          return null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      if (session.user && token.isTwoFactorEnabled) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      session.user.id = token.sub;
      session.user.name = token.name as string;
      session.user.email = token.email?.toLowerCase() as string;
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  adapter: PrismaAdapter(prisma), // Use PrismaAdapter for NextAuth
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  ...authConfig, // Additional authentication configurations
});
