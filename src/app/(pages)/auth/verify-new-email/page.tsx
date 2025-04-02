/*
File: VerifyNewEmailPage.tsx
Description: Allows users to verify their new email.
*/

import NewVerificationForm from "@/components/auth/token-page/NewVerificationForm";

const VerifyNewEmailPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <NewVerificationForm />
      </div>
    </main>
  );
};

export default VerifyNewEmailPage;
