/*
File: ChangeEmail.tsx
Description: Form component to change new email adress.
*/

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "@/components/ui/form-template/FormField";
import FormMessage from "@/components/ui/form-template/FormMessage";
import { requestEmailChange } from "@/actions/auth/auth-email-mail";
import { EditIcon, XIcon } from "lucide-react";
import useSessionUpdater from "@/hooks/auth/auth-update";

interface FormData {
  newEmail: string;
}

interface ChangeEmailFormProps {
  currentEmail: string | null;
}

const ChangeEmailForm = ({ currentEmail }: ChangeEmailFormProps) => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const updateSession = useSessionUpdater();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const result = await requestEmailChange(data.newEmail);
    setLoading(false);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "logged in succesfully" });
      // Update the session after successfully changing the username
      updateSession();
      reset();
      setIsEditing(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        Email
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            <EditIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        )}
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              reset();
              setMessage({ type: "", text: "" });
            }}
          >
            <XIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="New Email"
            type="email"
            placeholder="Enter new email"
            register={register("newEmail", { required: true })}
            error={errors.newEmail}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded"
          >
            {loading ? "Sending..." : "Request Email Change"}
          </button>
          {message.text && (
            <FormMessage
              message={message.text}
              type={message.type === "error" ? "error" : "success"}
            />
          )}
        </form>
      ) : (
        <div className="text-gray-500 italic">{currentEmail}</div>
      )}
    </div>
  );
};

export default ChangeEmailForm;
