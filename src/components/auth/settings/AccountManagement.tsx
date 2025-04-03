/*
File: AccountManagemnet.tsx
Description: Form component to change email or password for user.
*/

import { auth } from "@/auth";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import Toggle2FAButton from "./Toggle2FAButton";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePassword";

const AccountManagement = async () => {
  const session = await auth();
  const { email } = session?.user || {};

  return (
    <FormWrapper>
      {/* Account Management */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <ChangeEmailForm currentEmail={email ?? null} />
        <ChangePasswordForm />
        <Toggle2FAButton
          initialStatus={session?.user.isTwoFactorEnabled || false}
        />
      </div>
      {/* Danger Zone */}
    </FormWrapper>
  );
};

export default AccountManagement;
