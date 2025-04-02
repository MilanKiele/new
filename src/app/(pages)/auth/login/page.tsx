/*
File: LoginPage.tsx
Description: Allows users to login.
*/

import LoginForm from "@/components/auth/utils/LoginForm";

const LoginPage = () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
