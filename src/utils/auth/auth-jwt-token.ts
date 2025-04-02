/*
File: auth-jwt-token.ts
Description: Enables custom jwt token to send to external apis.
*/

import jwt from "jsonwebtoken";

const ACCESS_TOKEN_LIFETIME = 1 * 60 * 60; // 1h in seconds

export async function generateAccessToken(userId: string): Promise<string> {
  const payload = { sub: userId };
  const options: jwt.SignOptions = {
    expiresIn: `${ACCESS_TOKEN_LIFETIME}s`,
    algorithm: "HS256",
  };
  return await jwt.sign(
    payload,
    process.env.AUTHENTICATION_SECRET as string,
    options
  );
}

export async function isAccessTokenValid(token: string): Promise<boolean> {
  try {
    await jwt.verify(token, process.env.AUTHENTICATION_SECRET as string);
    return true;
  } catch {
    return false;
  }
}
