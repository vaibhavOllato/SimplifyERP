import React, { useState, useEffect } from "react";
import { Edit, Save, X } from "lucide-react";
import axios from "axios";

const Settings = () => {
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
    const userId = sessionStorage.getItem("userId");

    if (userData) {
      setProfile({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        imageUrl: userData.imageUrl || "",
      });
    } else {
      console.log("No user data found in session.");
    }

    // Check if there's an image URL saved in localStorage
    const savedImageUrl = localStorage.getItem("profileImageUrl");
    if (savedImageUrl) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        imageUrl: savedImageUrl,
      }));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSave = async () => {
    const userId = sessionStorage.getItem("userId"); // Fetch userId from sessionStorage

    if (!userId) {
      console.error("User ID is missing from session.");
      return;
    }

    // If there's an image file, upload it first
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      // formData.append("file", selectedImageFile);
      formData.append("userId", userId); // Pass userId if needed

      try {
        const response = await axios.post(
          "http://localhost:5000/upload-profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = response.data.url;
        // setProfile((prevProfile) => ({ ...prevProfile, imageUrl })); // Update the profile with the new image URL
        setProfile((prev) => ({ ...prev, imageUrl }));
        localStorage.setItem("profileImageUrl", imageUrl); // Store in localStorage
        sessionStorage.setItem(
          "userProfile",
          JSON.stringify({ ...profile, imageUrl })
        ); // Update sessionStorage
        setImage(null); // Clear image file after upload
      } catch (error) {
        console.error("Error uploading image", error);
        return; // Stop execution if image upload fails
      }
    }

    // Send the profile details (including firstName, lastName, email, phone)
    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile/update-profile-details",
        {
          userId, // Pass the userId from session
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
        }
      );

      console.log(response.data);
      setEditing(false); // Exit editing mode after saving

      // After saving, update session and localStorage with new profile info
      sessionStorage.setItem(
        "userProfile",
        JSON.stringify({
          ...profile,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          phone: response.data.user.phone,
        })
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-500 mb-6">Settings</h2>

      <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-20 w-20 bg-gray-300 rounded-full">
            {profile.imageUrl ? (
              <img
                src={profile.imageUrl}
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
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
          {/* First Name */}
          <div className="flex justify-between">
            <p className="text-gray-600">First Name:</p>
            {editing ? (
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md w-1/2"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            ) : (
              <p className="font-semibold">{profile.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex justify-between">
            <p className="text-gray-600">Last Name:</p>
            {editing ? (
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md w-1/2"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            ) : (
              <p className="font-semibold">{profile.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex justify-between">
            <p className="text-gray-600">Email:</p>
            {editing ? (
              <input
                type="email"
                className="border border-gray-300 p-2 rounded-md w-1/2"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            ) : (
              <p className="font-semibold">{profile.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex justify-between">
            <p className="text-gray-600">Phone:</p>
            {editing ? (
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md w-1/2"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            ) : (
              <p className="font-semibold">{profile.phone}</p>
            )}
          </div>

          {/* Profile Picture */}
          {editing && (
            <div className="flex justify-between">
              <p className="text-gray-600">Profile Picture:</p>
              <input
                type="file"
                onChange={handleImageChange}
                className="border border-gray-300 p-2 rounded-md w-1/2"
              />
            </div>
          )}

          {/* Save or Cancel buttons */}
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
    </div>
  );
};

export default Settings;
