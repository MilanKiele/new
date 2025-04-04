/*
File: VerifyChangeEmailPage.tsx
Description: Page to verify new email address.
*/

import { Suspense } from "react";
import VerifyEmailChangeForm from "@/components/auth/token-page/ChangeEmail";

export default function VerifyChangeEmailPage() {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyEmailChangeForm />
        </Suspense>
      </div>
    </main>
  );
}
