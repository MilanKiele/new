/*
File: DeleteUserForm.tsx
Description: Allows users to delete their account.
*/

import { auth } from "@/auth";
import DeleteUserButton from "./DeleteUserButton";
import FormWrapper from "@/components/ui/form-template/FormWrapper";

const DeleteUserComponent = async () => {
  const session = await auth();

  return (
    <FormWrapper>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <DeleteUserButton />
      </div>
    </FormWrapper>
  );
};

export default DeleteUserComponent;
