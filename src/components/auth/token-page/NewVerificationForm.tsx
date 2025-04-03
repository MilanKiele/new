/*
File: NewVericationForm.tsx
Description: Accepts token and verifies users new email.
*/

"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";

import FormMessage from "@/components/ui/form-template/FormMessage";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import { newVerification } from "@/actions/auth/auth-email-verify";

const NewVerificationForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (!token) {
        setError("Missing Token!");
        return;
      }

      const result = await newVerification(token);
      setError(result?.error || "");
      setSuccess(result?.success || "");

      if (result.success) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        redirect(`/auth/settings`);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }, [token, isSubmitting]);

  useEffect(() => {
    onSubmit();
  }, [token, onSubmit]);

  return (
    <FormWrapper>
      Verifying
      <FormMessage
        message={!success && !error ? "Verifying..." : error}
        type={!success && !error ? "success" : "error"}
      />
    </FormWrapper>
  );
};

export default NewVerificationForm;
