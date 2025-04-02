/*
File: middleware.js
Description: Defines a middleware function to handle authentication logic for routes,
including redirection based on authentication status and route configurations.
*/

import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  // Check for authentication
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Get Routes
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Check if the route is an authentication route
  if (isApiAuthRoute) {
    return null;
  }

  // Check if the route is an authentication route
  if (isAuthRoute) {
    // If user is logged in, redirect to default login redirect URL
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // If user is not logged in, continue processing the route
    return null;
  }

  // If user is not logged in and route is not public or authentication route, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Return null for other cases
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
