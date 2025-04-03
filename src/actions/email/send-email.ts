/*
File: send-emails.ts
Description: Sending Emails using Resend API.
*/

"use server";

import { Resend } from "resend";

import { emailTemplate } from "@/actions/email/email-template";
import {
  ButtonLink,
  ButtonText,
  FromEmail,
  PrivacyPolicyLink,
  SenderAddress,
  SenderEmail,
  SenderName,
  UnsubscribeLink,
} from "@/constants/resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing");
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  email: string,
  subject: string,
  content: string
): Promise<ReturnType<Resend["emails"]["send"]>> {
  try {
    const emailContent = emailTemplate({
      content: content,
      senderName: SenderName,
      senderAddress: SenderAddress,
      senderEmail: SenderEmail,
      privacyPolicyLink: PrivacyPolicyLink,
      unsubscribeLink: UnsubscribeLink,
      buttonText: ButtonText,
      buttonLink: ButtonLink,
    });

    const response = await resend.emails.send({
      from: FromEmail,
      to: email,
      subject: subject,
      html: emailContent,
    });

    console.log("E-Mail sent successfully:", response);
    return response;
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown } } | Error;
    console.error(
      "Error sending E-Mail:",
      "response" in err && err.response?.data
        ? err.response.data
        : err instanceof Error
          ? err.message
          : "Unknown error"
    );
    throw new Error("E-Mail could not be sent");
  }
}
