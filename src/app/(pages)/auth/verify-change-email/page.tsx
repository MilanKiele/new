/*
File: VerifyChangeEmailPage.tsx
Description: Page to verify new email address.
*/

import VerifyEmailChangeForm from "@/components/auth/token-page/ChangeEmail";

export default function VerifyChangeEmailPage() {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <VerifyEmailChangeForm />
      </div>
    </main>
  );
}
