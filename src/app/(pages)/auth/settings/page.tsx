/*
File: settings.tsx
Description: Page to show user settings.
*/

import AuthSettings from "@/components/auth/settings/AuthSettings";

const SettingsPage = async () => {
  return (
    <main>
      <div className="container my-24 flex justify-center items-center">
        <AuthSettings />
      </div>
    </main>
  );
};

export default SettingsPage;
