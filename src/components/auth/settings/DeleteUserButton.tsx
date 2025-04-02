/*
File: DeleteUserButton.tsx
Description: Button component to trigger account deletion email using form components for better UX.
*/

"use client";

import { useState } from "react";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import FormMessage from "@/components/ui/form-template/FormMessage";
import { useForm } from "react-hook-form";
import { deleteMail } from "@/actions/auth/auth-delete-mail";
import FormField from "@/components/ui/form-template/FormField";

const DeleteUserButton = () => {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState<{
    type?: "success" | "error";
    message?: string;
  }>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  interface FormData {
    confirmation: string;
  }

  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleInitialClick = () => {
    setShowConfirmation(true);
    setMessage({});
  };

  const onSubmit = async (data: { confirmation: string }) => {
    setMessage({});

    if (data.confirmation !== "DELETE MY ACCOUNT") {
      setMessage({
        type: "error",
        message: 'Please type "DELETE MY ACCOUNT" to confirm.',
      });
      return;
    }

    const response = await deleteMail();

    if (response.error) {
      setMessage({ type: "error", message: response.error });
    } else {
      setIsSent(true);
      setMessage({
        type: "success",
        message: "Deletion email sent successfully.",
      });
    }

    reset();
  };

  return (
    <div>
      {message.message && (
        <FormMessage type={message.type} message={message.message} />
      )}

      {isSent ? null : showConfirmation ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label='Type "DELETE MY ACCOUNT" to confirm'
            type="text"
            register={register("confirmation")}
          />
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            type="submit"
          >
            Confirm Account Deletion
          </button>
        </form>
      ) : (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleInitialClick}
        >
          Request Account Deletion
        </button>
      )}
    </div>
  );
};

export default DeleteUserButton;
