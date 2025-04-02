/*
File: delete-user.ts
Description: Next.js API route to delete user based on session.
*/

"use server";

import { auth } from "@/auth";
import { generateDeleteToken } from "./auth-tokens";
import { sendUserDeleteEmail } from "./auth-mail";

export const deleteMail = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return { error: "User already exists" };
  }
  const token = await generateDeleteToken(session.user.email);
  await sendUserDeleteEmail(token.email, token.token);

  return { success: "Email for user account deletion has been sent." };
};
