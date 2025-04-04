/*
File: VerifyNewEmailPage.tsx
Description: Allows users to verify their new email.
*/

import NewVerificationForm from "@/components/auth/token-page/NewVerificationForm";
import { Suspense } from "react";

const VerifyNewEmailPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <NewVerificationForm />
        </Suspense>
      </div>
    </main>
  );
};

export default VerifyNewEmailPage;
