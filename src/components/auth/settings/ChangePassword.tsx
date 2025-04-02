/*
File: ChangePasswordForm.tsx
Description: Form component to change current password.
*/

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "@/components/ui/form-template/FormField";
import FormMessage from "@/components/ui/form-template/FormMessage";
import { changePassword } from "@/actions/auth/auth-password";
import { NewPasswordSchemaData } from "@/schemas/auth/auth-schemas";
import { EditIcon, XIcon } from "lucide-react";
import useSessionUpdater from "@/hooks/auth/auth-update";

type MessageType = "success" | "error" | "";

const ChangePasswordForm = ({ user }: { user: any }) => {
  const [message, setMessage] = useState<{ type: MessageType; text: string }>({
    type: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const updateSession = useSessionUpdater();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewPasswordSchemaData>();

  const onSubmit = async (data: NewPasswordSchemaData) => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    const result = await changePassword(data, user);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({
        type: "success",
        text: result.success || "Password updated.",
      });
      reset();
      setIsEditing(false);
      updateSession(); // Optional: reflect session updates
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        Password
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>
            <EditIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        ) : (
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
            label="New Password"
            type="password"
            placeholder="Enter new password"
            register={register("password")}
            error={errors.password}
            disabled={isLoading}
          />
          <FormField
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>

          {message.text && (
            <FormMessage
              message={message.text}
              type={message.type as "success" | "error"}
            />
          )}
        </form>
      ) : (
        <div className="text-gray-500 italic">***************</div>
      )}
    </div>
  );
};

export default ChangePasswordForm;
