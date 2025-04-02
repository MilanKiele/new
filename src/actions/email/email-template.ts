/*
File: email-template.ts
Description: Sending Emails using a template design.
*/

import {
  ButtonLink,
  ButtonText,
  PrivacyPolicyLink,
  SenderAddress,
  SenderEmail,
  SenderName,
  UnsubscribeLink,
} from "@/constants/resend";

export const emailTemplate = ({
  senderName = SenderName,
  senderAddress = SenderAddress,
  senderEmail = SenderEmail,
  privacyPolicyLink = PrivacyPolicyLink,
  unsubscribeLink = UnsubscribeLink,
  content,
  buttonText = ButtonText,
  buttonLink = ButtonLink,
  year = new Date().getFullYear(),
}: {
  senderName?: string;
  senderAddress?: string;
  senderEmail?: string;
  privacyPolicyLink?: string;
  unsubscribeLink?: string;
  content: string;
  buttonText?: string;
  buttonLink?: string;
  year?: number;
}) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${senderName} Email</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #1a1a1a;
              color: #ffffff;
              text-align: center;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #2a2a2a;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          header {
              background-color: #007bff;
              color: #ffffff;
              padding: 24px;
              font-size: 28px;
              font-weight: bold;
          }
          main {
              padding: 30px;
              font-size: 18px;
              line-height: 1.6;
          }
          .content-box {
              background: #333333;
              padding: 20px;
              border-radius: 8px;
              margin: 20px auto;
              max-width: 500px;
              font-size: 16px;
              color: #f1f1f1;
          }
          .button {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 24px;
              background-color: #007bff;
              color: #ffffff;
              font-size: 16px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              transition: background 0.3s ease;
          }
          .button:hover {
              background-color: #0056b3;
          }
          footer {
              background-color: #007bff;
              color: #ffffff;
              padding: 16px;
              font-size: 14px;
          }
          .footer-content {
              font-size: 12px;
              color: #ccc;
              text-align: center;
              padding: 10px;
          }
          .footer-content a {
              color: #ff4747;
              text-decoration: none;
          }
          .footer-content a:hover {
              text-decoration: underline;
          }
          @media screen and (max-width: 600px) {
              .container {
                  width: 90%;
              }
              main {
                  padding: 20px;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <header>${senderName}</header>
          <main>
              <p>Welcome to ${senderName}! 🚀</p>
              <div class="content-box">${content}</div>
              <a href="${buttonLink}" class="button">${buttonText}</a>
          </main>
          <footer>
              <p>&copy; ${year} ${senderName}. All rights reserved.</p>
              <div class="footer-content">
                  <p>${senderName}, ${senderAddress}</p>
                  <p>Contact: <a href="mailto:${senderEmail}">${senderEmail}</a></p>
                  <p>
                      <a href="${privacyPolicyLink}">Privacy Policy</a>
                      ${
                        unsubscribeLink
                          ? ` | <a href="${unsubscribeLink}">Unsubscribe</a>`
                          : ""
                      }
                  </p>
              </div>
          </footer>
      </div>
  </body>
  </html>
  `;
