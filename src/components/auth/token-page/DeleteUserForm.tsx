/*
File: VerifyUserDeletionForm.tsx
Description: Form component to verify and confirm user account deletion, with redirect upon success.
*/

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import FormMessage from "@/components/ui/form-template/FormMessage";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import FormField from "@/components/ui/form-template/FormField";
import { deleteUser } from "@/actions/auth/auth-delete";

interface VerifyDeletionData {
  confirmEmail: string;
}

const DeleteUserForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyDeletionData>({
    defaultValues: {
      confirmEmail: "",
    },
  });

  const onSubmit = useCallback(
    async (data: VerifyDeletionData) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        if (!token) {
          setError("Missing Token!");
          return;
        }

        const result = await deleteUser(data.confirmEmail, token);
        setError(result?.error || "");
        setSuccess(result?.success || "");

        if (result?.success) {
          setTimeout(() => router.push("/"), 2000);
        }
      } catch (error) {
        setError("An unexpected error occurred");
      } finally {
        setIsSubmitting(false);
      }
    },
    [token, isSubmitting, router]
  );

  return (
    <FormWrapper>
      <div>
        <FormMessage
          message={
            !success && !error ? "Verify account deletion..." : error || success
          }
          type={!success && !error ? "success" : error ? "error" : "success"}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Verify Account Deletion</h1>
        <FormField
          label="Email"
          type="email"
          placeholder="Confirm your email"
          register={register("confirmEmail", { required: "Email is required" })}
          error={errors.confirmEmail}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Confirm Deletion"}
        </button>
      </form>
    </FormWrapper>
  );
};

export default DeleteUserForm;
