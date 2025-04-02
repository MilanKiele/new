/*
File: auth-mail.ts
Description: Send authentication mails.
*/

"use server";

import { sendEmail } from "@/actions/email/send-email";

const FrontendUrl = process.env.FRONTEND_URL;

// Verify Email
export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${FrontendUrl}/auth/verify-new-email?token=${token}`;
  const content = `<p>Click <a href="${confirmLink}">here to confirm your email</a></p>`;
  await sendEmail(email, "Confirm your email", content);
}

// Reset Password Email
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${FrontendUrl}/auth/verify-new-password?token=${token}`;
  const content = `<p>Click <a href="${resetLink}">here to reset your password</a></p>`;
  await sendEmail(email, "Reset your password", content);
}

// Deactivate your account
export async function sendUserDeleteEmail(email: string, token: string) {
  const deactivateLink = `${FrontendUrl}/auth/verify-delete-user?token=${token}`;
  const content = `<p>Click <a href="${deactivateLink}">here to deactivate your account</a></p>`;
  await sendEmail(email, "Deactivate your Account", content);
}

// Email change for your account
export const sendEmailChangeEmail = async (email: string, token: string) => {
  const changeEmail = `${FrontendUrl}/auth/verify-change-email?token=${token}`;
  const content = `<p>Click <a href="${changeEmail}">to change your users email adress</a></p>`;
  await sendEmail(email, "Change Email adress", content);
};

// 2FA Email
export async function sendTwoFactorEmail(email: string, token: string) {
  const content = `<p>Your 2FA code is: ${token}</p>`;
  await sendEmail(email, "Your 2FA code", content);
}
