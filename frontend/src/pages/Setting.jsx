import React, { useState, useEffect } from "react";
import { Edit, Save, X } from "lucide-react";
import axios from "axios";
import { useNotification } from "../context/NotificationProvider";

const Settings = () => {
  const { triggerNotification } = useNotification();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    imageUrl: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userProfile"));
    if (userData) {
      setProfile({ ...userData });
    }

    const savedImageUrl = localStorage.getItem("profileImageUrl");
    if (savedImageUrl) {
      setProfile((prev) => ({ ...prev, imageUrl: savedImageUrl }));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSave = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      return triggerNotification("User ID is missing from session.", "error");
    }
    
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("userId", userId);

      try {
        const response = await axios.post(
          `${apiUrl}/upload-profile`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const imageUrl = response.data.url;
        setProfile((prev) => ({ ...prev, imageUrl }));
        localStorage.setItem("profileImageUrl", imageUrl);
        sessionStorage.setItem(
          "userProfile",
          JSON.stringify({ ...profile, imageUrl })
        );
        // triggerNotification({
        //   type: "success",
        //   message: "Profile image uploaded successfully.",
        // });
        triggerNotification("Profile image uploaded successfully!", "success");
      } catch {
        // return triggerNotification({
        //   type: "error",
        //   message: "Error uploading image",
        // });
        return triggerNotification("Error uploading image", "error");
      }
    }

    try {
      const response = await axios.put(
        `${apiUrl}/profile/update-profile-details`,
        { userId, ...profile }
      );
      setEditing(false);
      sessionStorage.setItem("userProfile", JSON.stringify(response.data.user));
      // triggerNotification({
      //   type: "success",
      //   message: "Profile updated successfully.",
      // });
      triggerNotification("Profile updated successfully.", "success");
    } catch {
      // triggerNotification({
      //   type: "error",
      //   message: "Error updating profile.",
      // });
      triggerNotification("Error updating profile.", "error");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-500">
            Profile Settings
          </h2>
          <button
            onClick={() => setEditing((prev) => !prev)}
            className="text-cyan-600 hover:text-cyan-700 transition flex items-center gap-2"
          >
            <Edit size={20} />
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <div className="relative group">
            <img
              src={
                profile.imageUrl ||
                "https://via.placeholder.com/96?text=No+Image"
              }
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-600"
              alt="Profile"
            />
            {editing && (
              <label className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-white text-sm">Change</span>
              </label>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-cyan-700">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm text-gray-500">{profile.userId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              First Name
            </label>
            {editing ? (
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-600"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            ) : (
              <p className="text-gray-800">{profile.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Name
            </label>
            {editing ? (
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-600"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            ) : (
              <p className="text-gray-800">{profile.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            {editing ? (
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-600"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            ) : (
              <p className="text-gray-800">{profile.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            {editing ? (
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-600"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            ) : (
              <p className="text-gray-800">{profile.phone}</p>
            )}
          </div>
        </div>

        {editing && (
          <div className="flex justify-end mt-8 gap-4">
            <button
              onClick={handleSave}
              className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 flex items-center gap-2"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
