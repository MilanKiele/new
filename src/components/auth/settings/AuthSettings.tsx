/*
File: AuthSettings.tsx
Description: Form component to edit user account details.
*/

import EditProfileForm from "../profile/EditProfileForm";
import AccountManagement from "./AccountManagement";
import UserInfo from "./UserInfo";
import DeleteUserComponent from "./DeleteUserForm";

const AuthSettings = async () => {
  return (
    <section className="w-full max-w-6xl mx-auto p-4 space-y-10">
      {/* Profile Info */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-left items-start">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <UserInfo />
      </div>

      {/* Edit Profile */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-left items-start">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <EditProfileForm />
      </div>

      {/* Account Management */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-left items-start">
        <h2 className="text-2xl font-semibold mb-4">Account Management</h2>
        <AccountManagement />
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-red-500 text-left items-start">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Danger Zone
        </h2>
        <DeleteUserComponent />
      </div>
    </section>
  );
};

export default AuthSettings;
