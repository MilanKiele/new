/*
File: OAuthLogin.tsx
Description: Basic OAuth login component.
*/

import React from "react";
import { signIn } from "next-auth/react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface OAuthLoginProps {
  provider: "google" | "github";
}

const OAuthLogin: React.FC<OAuthLoginProps> = ({ provider }) => {
  const onClick = () => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <button
      className="min-h-8 bg-blue-500 w-full text-white rounded-md border-2 border-black"
      onClick={onClick}
    >
      {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </button>
  );
};

export default OAuthLogin;
