/*
File: next-auth-config.js
Description: Configures authentication providers for Next.js authentication, including GitHub, Google, and custom credentials.
Defines authorization logic for custom credentials using bcrypt for password validation.
*/

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/auth/auth-schemas";
import { getUserByEmail } from "@/utils/auth/auth-utils";

export default {
  // Set Provider
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // Defining authorization logic for custom credentials
      async authorize(credentials) {
        const validateFields = await LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;

          // Get Password
          const user = await getUserByEmail(email);
          if (!user || !user.hashedPassword) {
            return null;
          }

          // Compare Password
          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          // Send back user
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
