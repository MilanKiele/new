/*
File: UserInfo.tsx
Description: User Information component.
*/

import { auth } from "@/auth";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import SignOutButton from "@/components/auth/utils/SignOutButton";

const UserInfo = async () => {
  const session = await auth();
  const { email } = session?.user || {};

  return (
    <FormWrapper>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div>
          <p className="text-sm text-gray-600">Email Address:</p>
          <p className="text-md font-medium">{email}</p>
        </div>
        <SignOutButton />
      </div>
    </FormWrapper>
  );
};

export default UserInfo;
