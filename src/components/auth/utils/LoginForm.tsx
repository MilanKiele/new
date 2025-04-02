/*
File: LoginForm.tsx
Description: LoginForm component.
*/

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginSchemaData } from "@/schemas/auth/auth-schemas";
import { loginUser } from "@/actions/auth/auth-login";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import FormField from "@/components/ui/form-template/FormField";
import FormMessage from "@/components/ui/form-template/FormMessage";
import OAuthLogin from "@/components/auth/utils/OAuthLogin";

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = async (data: LoginSchemaData) => {
    setIsSubmitting(true);
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const result = await loginUser(data);
      if (result?.twoFactor) {
        setShowTwoFactor(true);
        return;
      }
      if (result?.error) {
        setMessage(result?.error as string);
      } else {
        setMessage(result?.success as string);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to log in. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <h1 className="mb-2 w-full max-w-[1920px]">Login</h1>
      <div className="flex flex-row w-full py-2 gap-2">
        <OAuthLogin provider={"github"} />
        <OAuthLogin provider={"google"} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email}
          disabled={isSubmitting || showTwoFactor}
        />
        <div className="mb-6">
          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password")}
            error={errors.password}
            disabled={isSubmitting || showTwoFactor}
          />
          <Link
            href="/auth/reset"
            className="mt-4 text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        {showTwoFactor && (
          <>
            <FormField
              label="Code"
              type="text"
              placeholder="Enter your code"
              register={register("code")}
              error={errors.code}
              disabled={isSubmitting}
            />
          </>
        )}
        <FormMessage message={message} type={message ? "error" : "success"} />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className="mt-2 flex flex-col">
        <Link
          href="/auth/register"
          className="mt-4 text-blue-500 hover:underline"
        >
          Register instead?
        </Link>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
