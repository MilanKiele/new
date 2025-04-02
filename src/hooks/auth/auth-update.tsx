/*
File: updateSessionToken.tsx
Description: This function is needed to update the user auth token!
*/

"use client";

import { useSession } from "next-auth/react";

const useSessionUpdater = () => {
  const { update } = useSession();

  const updateSession = () => {
    update();
  };

  return updateSession;
};

export default useSessionUpdater;
