/*
File: ResetForm.tsx
Description: Asks for email to reset password.
*/

"use client";

import { useState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ResetPasswordSchema,
  ResetPasswordSchemaData,
} from "@/schemas/auth/auth-schemas";
import { resetPasswordMail } from "@/actions/auth/auth-password-mail";
import FormField from "@/components/ui/form-template/FormField";
import FormMessage from "@/components/ui/form-template/FormMessage";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import Link from "next/link";

const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: ResetPasswordSchemaData) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPasswordMail(data)
        .then((result) => {
          setError(result?.error || "");
          setSuccess(result?.success || "");
        })
        .catch(() => {
          setError("An error occurred");
        });
    });
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-2">Forgot your password?</h1>
        <FormField
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email}
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSubmitting ? "Sending..." : "Send Reset email"}
        </button>
      </form>
      <FormMessage
        message={!success && !error ? "" : error || success}
        type={!success && !error ? "success" : "error"}
      />
      <div className="mt-4">
        <Link href="/auth/login" className="mt-4 text-blue-500 hover:underline">
          Remember login details? Go here.
        </Link>
      </div>
    </FormWrapper>
  );
};

export default ResetForm;
