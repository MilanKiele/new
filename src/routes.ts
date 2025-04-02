/*
File: routes.js
Description: Defines route access levels and redirects.
*/

// Public Routes without Auth
export const publicRoutes = ["/", "/legal", "/error", "/not-found", "/loading"];

// Auth Routes, need to be available all time
export const authRoutes = [
  "/auth/error",
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-verification",
  "/auth/new-password",
  // "/auth/delete-user",
  // "/auth/verify-email-change",
];

// Always allow
export const apiAuthPrefix = "/api/auth";

// Redirect when logged in
export const DEFAULT_LOGIN_REDIRECT = "/auth/settings";

// Redirect when not logged in
export const DEFAULT_UNAUTHORIZED_REDIRECT = "/auth/login";

// Other pages are blocked
