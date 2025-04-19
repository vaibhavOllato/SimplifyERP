import React, { useState } from "react";
import { Edit, Save, X } from "lucide-react";

const Settings = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    address: "123 Main Street, City",
  });

  const handleSave = () => {
    // Save the updated profile details
    setEditing(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-500 mb-6">Settings</h2>

      {/* Profile Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-20 w-20 bg-gray-300 rounded-full"></div> {/* Profile Picture */}
          <div>
            <h3 className="text-xl font-semibold">Profile</h3>
            <button
              onClick={() => setEditing(!editing)}
              className="mt-2 text-cyan-600 flex items-center gap-1"
            >
              <Edit size={18} />
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Name:</p>
            {editing ? (
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md w-1/2"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            ) : (
              <p className="font-semibold">{profile.name}</p>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Email:</p>
            {editing ? (
              <input
                type="email"
                className="border border-gray-300 p-2 rounded-md w-1/2"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            ) : (
              <p className="font-semibold">{profile.email}</p>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Phone:</p>
            {editing ? (
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md w-1/2"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            ) : (
              <p className="font-semibold">{profile.phone}</p>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Address:</p>
            {editing ? (
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md w-1/2"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            ) : (
              <p className="font-semibold">{profile.address}</p>
            )}
          </div>

          {editing && (
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
              >
                <Save size={18} /> Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Account Settings</h3>

        {/* Two-Factor Authentication */}
        <div className="flex justify-between items-center border-b border-gray-200 py-4">
          <p className="text-gray-600">Enable Two-Factor Authentication</p>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            Enable
          </button>
        </div>

        {/* Email Preferences */}
        <div className="flex justify-between items-center border-b border-gray-200 py-4">
          <p className="text-gray-600">Email Notifications</p>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            Manage Preferences
          </button>
        </div>

        {/* Change Password */}
        <div className="flex justify-between items-center py-4">
          <p className="text-gray-600">Change Password</p>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            Change Password
          </button>
        </div>
      </div>

      {/* System Configuration Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">System Configuration</h3>

        {/* Company Information */}
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <p className="text-gray-600">Company Information</p>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            Edit
          </button>
        </div>

        {/* Currency Settings */}
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <p className="text-gray-600">Currency</p>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            Set Currency
          </button>
        </div>

        {/* Tax Settings */}
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <p className="text-gray-600">Tax Settings</p>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            Edit Taxes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
