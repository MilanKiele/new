/*
File: VerifyDeleteUserPage.tsx
Description: Allows users to confirm account deletion.
*/

import DeleteUserForm from "@/components/auth/token-page/DeleteUserForm";
import { Suspense } from "react";

const VerifyDeleteUserPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <DeleteUserForm />
        </Suspense>
      </div>
    </main>
  );
};

export default VerifyDeleteUserPage;
