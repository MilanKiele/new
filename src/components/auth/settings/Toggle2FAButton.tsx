/*
File: Toggle2FAButton.tsx
Description: Allows users to toggle 2FA.
*/

"use client";

import { toggleTwoFactor } from "@/actions/auth/auth-2fa";
import { useState } from "react";

interface Toggle2FAButtonProps {
  initialStatus: boolean;
}

const Toggle2FAButton = ({ initialStatus }: Toggle2FAButtonProps) => {
  const [isEnabled, setIsEnabled] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const result = await toggleTwoFactor();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setIsEnabled((prev) => !prev);
      alert(result.success);
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded font-bold text-white ${
        isEnabled
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      }`}
      onClick={handleToggle}
      disabled={loading}
    >
      {loading
        ? "Updating..."
        : isEnabled
        ? "Disable 2-Factor Authentication"
        : "Enable 2-Factor Authentication"}
    </button>
  );
};

export default Toggle2FAButton;
