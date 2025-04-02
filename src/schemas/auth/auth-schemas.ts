/*
File: auth-schemas.ts
Description: This files contains schemas for authentication data validation.
*/

import * as z from "zod";

// LoginSchemaData is the type of data that LoginSchema will validate
export type LoginSchemaData = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  // no extra password validation check because of possible updated requirements -> no need here
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

// Email where the reset password link will be sent
export type ResetPasswordSchemaData = z.infer<typeof ResetPasswordSchema>;
export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

// Email where the new user email will be
export type NewEmailSchemaData = z.infer<typeof NewEmailSchemaData>;
export const NewEmailSchemaData = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

// For setting a new Password
export type NewPasswordSchemaData = z.infer<typeof NewPasswordSchema>;
export const NewPasswordSchema = z
  .object({
    // Definition of Password Requirements
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      })
      .regex(/^[a-zA-Z0-9]*$/, {
        message: "Password cannot contain special symbols",
      })
      .regex(/[a-z].*[a-z]/, {
        message: "Password must contain at least two lowercase letters",
      })
      .regex(/[A-Z].*[A-Z]/, {
        message: "Password must contain at least two uppercase letters",
      })
      .regex(/[0-9].*[0-9]/, {
        message: "Password must contain at least two numbers",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      })
      .regex(/^[a-zA-Z0-9]*$/, {
        message: "Password cannot contain special symbols",
      })
      .regex(/[a-z].*[a-z]/, {
        message: "Password must contain at least two lowercase letters",
      })
      .regex(/[A-Z].*[A-Z]/, {
        message: "Password must contain at least two uppercase letters",
      })
      .regex(/[0-9].*[0-9]/, {
        message: "Password must contain at least two numbers",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

// RegisterSchemaData is the type of data that RegisterSchema will validate
export type RegisterSchemaData = z.infer<typeof RegisterSchema>;
export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    // Password Requirements
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      })
      .regex(/^[a-zA-Z0-9]*$/, {
        message: "Password cannot contain special symbols",
      })
      .regex(/[a-z].*[a-z]/, {
        message: "Password must contain at least two lowercase letters",
      })
      .regex(/[A-Z].*[A-Z]/, {
        message: "Password must contain at least two uppercase letters",
      })
      .regex(/[0-9].*[0-9]/, {
        message: "Password must contain at least two numbers",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      })
      .regex(/^[a-zA-Z0-9]*$/, {
        message: "Password cannot contain special symbols",
      })
      .regex(/[a-z].*[a-z]/, {
        message: "Password must contain at least two lowercase letters",
      })
      .regex(/[A-Z].*[A-Z]/, {
        message: "Password must contain at least two uppercase letters",
      })
      .regex(/[0-9].*[0-9]/, {
        message: "Password must contain at least two numbers",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
