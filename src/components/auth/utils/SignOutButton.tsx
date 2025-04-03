/*
File: SignOutButton.tsx
Description: Styled Sign Out button with logout icon.
*/

"use client";

import useSessionUpdater from "@/hooks/auth/auth-update";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const updateSession = useSessionUpdater();

  const handleSignOut = async () => {
    signOut();
    updateSession();
  };

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition-colors duration-200"
    >
      <LogOutIcon className="w-5 h-5" />
      Sign Out
    </button>
  );
};

export default SignOutButton;
