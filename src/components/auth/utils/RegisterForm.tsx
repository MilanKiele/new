/*
File: RegisterForm.tsx
Description: RegisterForm component.
*/

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RegisterSchema,
  RegisterSchemaData,
} from "@/schemas/auth/auth-schemas";
import { registerUser } from "@/actions/auth/auth-register";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import FormField from "@/components/ui/form-template/FormField";
import FormMessage from "@/components/ui/form-template/FormMessage";
import OAuthLogin from "@/components/auth/utils/OAuthLogin";

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaData) => {
    setMessage("");
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const result = await registerUser(data);
      if (result.error) {
        setMessage(result.error as string);
      } else {
        setMessage(result.success as string);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to register. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <h1 className="mb-2">Register</h1>
      <div className="flex flex-row w-full gap-2 py-2">
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
          disabled={isSubmitting}
        />
        <FormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register("password")}
          error={errors.password}
          disabled={isSubmitting}
        />
        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          disabled={isSubmitting}
        />
        <FormMessage message={message} type={message ? "error" : "success"} />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      <div className="mt-2">
        <Link href="/auth/login" className="mt-4 text-blue-500 hover:underline">
          Already have an account? Login here.
        </Link>
      </div>
    </FormWrapper>
  );
};

export default RegisterForm;
