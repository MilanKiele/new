/*
File: Formfield.tsx
Description: describes a form field.
*/

import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  register,
  error,
  disabled,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
        id={label}
        type={type}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  );
};

export default FormField;
