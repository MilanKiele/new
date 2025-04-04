/*
File: VerifyNewPasswordPage.tsx
Description: Allows users to set a new password.
*/

import NewPasswordForm from "@/components/auth/token-page/NewPasswordForm";
import { Suspense } from "react";

const VerifyNewPasswordPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <NewPasswordForm />
        </Suspense>
      </div>
    </main>
  );
};

export default VerifyNewPasswordPage;
