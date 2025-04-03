/*
File: ChangeEmail.tsx
Description: Form component to verify new email adress.
*/

"use client";

import { useCallback, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { verifyEmailChange } from "@/actions/auth/auth-email";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import FormField from "@/components/ui/form-template/FormField";
import FormMessage from "@/components/ui/form-template/FormMessage";

interface VerifyEmailData {
  confirmEmail: string;
}

export default function VerifyEmailChangeForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailData>({
    defaultValues: { confirmEmail: "" },
  });

  const onSubmit = useCallback(
    async (data: VerifyEmailData) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      if (!token) {
        setMessage("Invalid request: Missing token.");
        setIsSubmitting(false);
        return;
      }

      try {
        const result = await verifyEmailChange(token, data.confirmEmail);
        setMessage(result.error || result.success || "An error occurred.");

        if (result.success) {
          setTimeout(() => router.push("/dashboard"), 2000);
        }
      } catch {
        setMessage("An unexpected error occurred.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [token, isSubmitting, router]
  );

  return (
    <FormWrapper>
      <FormMessage
        message={message || "Confirm your new email address."}
        type={message?.includes("success") ? "success" : "error"}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-xl mb-4">Email Change Confirmation</h1>

        <FormField
          label="New Email"
          type="email"
          placeholder="Confirm your new email"
          register={register("confirmEmail", { required: "Email is required" })}
          error={errors.confirmEmail}
          disabled={isSubmitting}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Confirm Email Change"}
        </button>
      </form>
    </FormWrapper>
  );
}
