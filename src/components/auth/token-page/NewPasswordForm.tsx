/*
File: NewPasswordForm.tsx
Description: Ask NewPasswordForm component.
*/

"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  NewPasswordSchema,
  NewPasswordSchemaData,
} from "@/schemas/auth/auth-schemas";
import FormMessage from "@/components/ui/form-template/FormMessage";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import FormField from "@/components/ui/form-template/FormField";
import { newPassword } from "@/actions/auth/auth-password-reset";

const NewPasswordForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordSchemaData>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback(
    async (data: NewPasswordSchemaData) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        if (!token) {
          setError("Missing Token!");
          return;
        }

        if (!data.password || !data.confirmPassword) {
          setError("Password and Confirm Password are required");
          return;
        }

        if (data.password !== data.confirmPassword) {
          setError("Password and Confirm Password must match");
          return;
        }

        const result = await newPassword(data, token);
        setError(result?.error || "");
        setSuccess(result?.success || "");
      } catch (error) {
        setError("An error occurred");
      } finally {
        setIsSubmitting(false);
      }
    },
    [token, isSubmitting]
  );

  return (
    <FormWrapper>
      <div>
        <FormMessage
          message={!success && !error ? "New Password..." : error}
          type={!success && !error ? "success" : "error"}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Enter new Password</h1>
        <FormField
          label="Password"
          type="password"
          placeholder="Enter your new password"
          register={register("password")}
          error={errors.password}
          disabled={isSubmitting}
        />
        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </FormWrapper>
  );
};

export default NewPasswordForm;
