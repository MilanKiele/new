/*
File: RegisterPage.tsx
Description: Allows users to register.
*/

import RegisterForm from "@/components/auth/utils/RegisterForm";

const RegisterPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
