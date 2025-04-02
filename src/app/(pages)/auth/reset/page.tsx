/*
File: ResetPage.tsx
Description: Page to reset password.
*/

import ResetForm from "@/components/auth/utils/ResetForm";

const ResetPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <ResetForm />
      </div>
    </main>
  );
};

export default ResetPage;
