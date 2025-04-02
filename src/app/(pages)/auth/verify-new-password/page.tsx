/*
File: VerifyNewPasswordPage.tsx
Description: Allows users to set a new password.
*/

import NewPasswordForm from "@/components/auth/token-page/NewPasswordForm";

const VerifyNewPasswordPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <NewPasswordForm />
      </div>
    </main>
  );
};

export default VerifyNewPasswordPage;
