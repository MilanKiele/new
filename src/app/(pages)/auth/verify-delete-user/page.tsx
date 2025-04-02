/*
File: VerifyDeleteUserPage.tsx
Description: Allows users to confirm account deletion.
*/

import DeleteUserForm from "@/components/auth/token-page/DeleteUserForm";

const VerifyDeleteUserPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <DeleteUserForm />
      </div>
    </main>
  );
};

export default VerifyDeleteUserPage;
