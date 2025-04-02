/*
File: FormMessage.tsx
Description: Shows final form result.
*/

import React from "react";

interface FormMessageProps {
  message?: string;
  type?: "success" | "error";
}

const FormMessage: React.FC<FormMessageProps> = ({ message, type }) => {
  if (!message) return null;

  return (
    <div
      className={`p-2 rounded ${
        type === "error"
          ? "bg-red-200 text-red-800"
          : "bg-green-200 text-green-800"
      } mb-2`}
    >
      {message}
    </div>
  );
};

export default FormMessage;
