// import React, { useState, useEffect } from "react";
// import { Edit, Save, X } from "lucide-react";
// import axios from "axios";
// import { useNotification } from "../context/NotificationProvider";

// const Settings = () => {
//   const { triggerNotification } = useNotification();
//   const apiUrl = import.meta.env.VITE_API_BASE_URL;
//   const [editing, setEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     imageUrl: "",
//   });

//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(sessionStorage.getItem("userProfile"));
//     const userId = sessionStorage.getItem("userId");

//     if (userData) {
//       setProfile({
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         email: userData.email,
//         phone: userData.phone,
//         address: userData.address,
//         imageUrl: userData.imageUrl || "",
//       });
//     } else {
//       console.log("No user data found in session.");
//     }

//     const savedImageUrl = localStorage.getItem("profileImageUrl");
//     if (savedImageUrl) {
//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         imageUrl: savedImageUrl,
//       }));
//     }
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleSave = async () => {
//     const userId = sessionStorage.getItem("userId");

//     if (!userId) {
//       console.error("User ID is missing from session.");
//       // triggerNotification("User ID is missing from session.");
//       triggerNotification({
//         type: "error", // Type of notification (success/error)
//         message: "User ID is missing from session.",
//       });
//       return;
//     }

//     if (image) {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("userId", userId);

//       try {
//         const response = await axios.post(
//           `${apiUrl}/upload-profile`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         const imageUrl = response.data.url;
//         setProfile((prev) => ({ ...prev, imageUrl }));
//         localStorage.setItem("profileImageUrl", imageUrl);
//         sessionStorage.setItem(
//           "userProfile",
//           JSON.stringify({ ...profile, imageUrl })
//         );
//         setImage(null);
//         // triggerNotification("Profile image uploaded successfully.");
//         triggerNotification({
//           type: "success", // Type of notification
//           message: "Profile image uploaded successfully.",
//         });
//       } catch (error) {
//         console.error("Error uploading image", error);
//         // triggerNotification("Error uploading image", error);
//         triggerNotification({
//           type: "error", // Type of notification
//           message: "Error uploading image",
//         });
//         return;
//       }
//     }

//     try {
//       const response = await axios.put(
//         `${apiUrl}/profile/update-profile-details`,
//         {
//           userId,
//           firstName: profile.firstName,
//           lastName: profile.lastName,
//           email: profile.email,
//           phone: profile.phone,
//         }
//       );

//       console.log(response.data);
//       setEditing(false);

//       sessionStorage.setItem(
//         "userProfile",
//         JSON.stringify({
//           ...profile,
//           firstName: response.data.user.firstName,
//           lastName: response.data.user.lastName,
//           email: response.data.user.email,
//           phone: response.data.user.phone,
//         })
//       );
//       // triggerNotification("Profile updated successfully.");
//       triggerNotification({
//         type: "success", // Type of notification
//         message: "Profile updated successfully.",
//       });
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       // toast.error("Error updating profile:", error);
//       triggerNotification({
//         type: "error", // Type of notification
//         message: "Error updating profile.",
//       });
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-500 mb-8">Profile Settings</h2>

//       <div className="bg-white shadow-xl p-8 rounded-lg max-w-4xl mx-auto">
//         <div className="flex items-center gap-6 mb-6">
//           <div className="h-24 w-24 rounded-full border-4 border-cyan-600 overflow-hidden">
//             {profile.imageUrl ? (
//               <img
//                 src={profile.imageUrl}
//                 alt="Profile"
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <span className="text-gray-400 text-xl font-semibold">
//                 No Image
//               </span>
//             )}
//           </div>
//           <div>
//             <h3 className="text-2xl font-semibold text-gray-700">Profile</h3>
//             <button
//               onClick={() => setEditing(!editing)}
//               className="mt-3 text-cyan-600 flex items-center gap-2 hover:text-cyan-700 transition-colors"
//             >
//               <Edit size={20} />
//               {editing ? "Cancel" : "Edit"}
//             </button>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {/* First Name */}
//           <div className="flex items-center gap-2 mb-4">
//             <p className="text-lg text-gray-600 w-1/4">First Name:</p>
//             {editing ? (
//               <input
//                 type="text"
//                 className="border-2 border-gray-300 p-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600"
//                 value={profile.firstName}
//                 onChange={(e) =>
//                   setProfile({ ...profile, firstName: e.target.value })
//                 }
//               />
//             ) : (
//               <p className="text-lg font-semibold text-gray-800">
//                 {profile.firstName}
//               </p>
//             )}
//           </div>

//           {/* Last Name */}
//           <div className="flex items-center gap-2 mb-4">
//             <p className="text-lg text-gray-600 w-1/4">Last Name:</p>
//             {editing ? (
//               <input
//                 type="text"
//                 className="border-2 border-gray-300 p-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600"
//                 value={profile.lastName}
//                 onChange={(e) =>
//                   setProfile({ ...profile, lastName: e.target.value })
//                 }
//               />
//             ) : (
//               <p className="text-lg font-semibold text-gray-800">
//                 {profile.lastName}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="flex items-center gap-2 mb-4">
//             <p className="text-lg text-gray-600 w-1/4">Email:</p>
//             {editing ? (
//               <input
//                 type="email"
//                 className="border-2 border-gray-300 p-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600"
//                 value={profile.email}
//                 onChange={(e) =>
//                   setProfile({ ...profile, email: e.target.value })
//                 }
//               />
//             ) : (
//               <p className="text-lg font-semibold text-gray-800">
//                 {profile.email}
//               </p>
//             )}
//           </div>

//           {/* Phone Number */}
//           <div className="flex items-center gap-2 mb-4">
//             <p className="text-lg text-gray-600 w-1/4">Phone:</p>
//             {editing ? (
//               <input
//                 type="text"
//                 className="border-2 border-gray-300 p-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600"
//                 value={profile.phone}
//                 onChange={(e) =>
//                   setProfile({ ...profile, phone: e.target.value })
//                 }
//               />
//             ) : (
//               <p className="text-lg font-semibold text-gray-800">
//                 {profile.phone}
//               </p>
//             )}
//           </div>

//           {/* Profile Picture */}
//           {editing && (
//             <div className="flex items-center gap-2 mb-4">
//               <p className="text-lg text-gray-600 w-1/4">Profile Picture:</p>
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 className="p-2 rounded-lg border-2 border-gray-300 w-3/4"
//               />
//             </div>
//           )}

//           {/* Save or Cancel buttons */}
//           {editing && (
//             <div className="flex justify-end gap-4 mt-6">
//               <button
//                 onClick={handleSave}
//                 className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none transition-colors"
//               >
//                 <Save size={18} className="inline mr-2" />
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setEditing(false)}
//                 className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none transition-colors"
//               >
//                 <X size={18} className="inline mr-2" />
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;








// import React, { useState, useEffect } from "react";
// import { Edit, Save, X } from "lucide-react";
// import axios from "axios";
// import { useNotification } from "../context/NotificationProvider";

// const Settings = () => {
//   const { triggerNotification } = useNotification();
//   const apiUrl = import.meta.env.VITE_API_BASE_URL;
//   const [editing, setEditing] = useState(false);
//   const [image, setImage] = useState(null);
//   const [profile, setProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     imageUrl: "",
//   });

//   useEffect(() => {
//     const userData = JSON.parse(sessionStorage.getItem("userProfile"));
//     const savedImageUrl = localStorage.getItem("profileImageUrl");
//     if (userData) {
//       setProfile({
//         ...userData,
//         imageUrl: savedImageUrl || userData.imageUrl || "",
//       });
//     }
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleSave = async () => {
//     const userId = sessionStorage.getItem("userId");
//     if (!userId) {
//       triggerNotification({ type: "error", message: "User ID is missing from session." });
//       return;
//     }

//     if (image) {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("userId", userId);

//       try {
//         const res = await axios.post(`${apiUrl}/upload-profile`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         const imageUrl = res.data.url;
//         setProfile((prev) => ({ ...prev, imageUrl }));
//         localStorage.setItem("profileImageUrl", imageUrl);
//         sessionStorage.setItem("userProfile", JSON.stringify({ ...profile, imageUrl }));
//         setImage(null);
//         triggerNotification({ type: "success", message: "Profile image uploaded successfully." });
//       } catch (error) {
//         triggerNotification({ type: "error", message: "Error uploading image" });
//         return;
//       }
//     }

//     try {
//       const res = await axios.put(`${apiUrl}/profile/update-profile-details`, {
//         userId,
//         firstName: profile.firstName,
//         lastName: profile.lastName,
//         email: profile.email,
//         phone: profile.phone,
//       });

//       const updatedUser = res.data.user;
//       sessionStorage.setItem("userProfile", JSON.stringify({ ...profile, ...updatedUser }));
//       setProfile({ ...profile, ...updatedUser });
//       setEditing(false);
//       triggerNotification({ type: "success", message: "Profile updated successfully." });
//     } catch (err) {
//       triggerNotification({ type: "error", message: "Error updating profile." });
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-cyan-700 mb-10 text-center">Account Settings</h2>

//       <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
//         <div className="flex flex-col sm:flex-row sm:items-center gap-6">
//           <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-cyan-600">
//             {profile.imageUrl ? (
//               <img src={profile.imageUrl} alt="Profile" className="h-full w-full object-cover" />
//             ) : (
//               <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 font-semibold">
//                 No Image
//               </div>
//             )}
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-gray-700">Profile Information</h3>
//             <button
//               onClick={() => setEditing((prev) => !prev)}
//               className="mt-3 inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium"
//             >
//               <Edit size={18} />
//               {editing ? "Cancel" : "Edit"}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* First Name */}
//           <div>
//             <label className="block text-gray-600 mb-1">First Name</label>
//             {editing ? (
//               <input
//                 type="text"
//                 value={profile.firstName}
//                 onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
//               />
//             ) : (
//               <p className="font-medium text-gray-800">{profile.firstName}</p>
//             )}
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="block text-gray-600 mb-1">Last Name</label>
//             {editing ? (
//               <input
//                 type="text"
//                 value={profile.lastName}
//                 onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
//               />
//             ) : (
//               <p className="font-medium text-gray-800">{profile.lastName}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-600 mb-1">Email</label>
//             {editing ? (
//               <input
//                 type="email"
//                 value={profile.email}
//                 onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
//               />
//             ) : (
//               <p className="font-medium text-gray-800">{profile.email}</p>
//             )}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-gray-600 mb-1">Phone</label>
//             {editing ? (
//               <input
//                 type="text"
//                 value={profile.phone}
//                 onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
//               />
//             ) : (
//               <p className="font-medium text-gray-800">{profile.phone}</p>
//             )}
//           </div>

//           {/* Image Upload */}
//           {editing && (
//             <div className="md:col-span-2">
//               <label className="block text-gray-600 mb-1">Profile Picture</label>
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2"
//               />
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         {editing && (
//           <div className="flex justify-end gap-4 pt-6">
//             <button
//               onClick={handleSave}
//               className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors inline-flex items-center gap-2"
//             >
//               <Save size={18} />
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditing(false)}
//               className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center gap-2"
//             >
//               <X size={18} />
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Settings;



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
      return triggerNotification({
        type: "error",
        message: "User ID is missing from session.",
      });
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
        triggerNotification({
          type: "success",
          message: "Profile image uploaded successfully.",
        });
      } catch {
        return triggerNotification({
          type: "error",
          message: "Error uploading image",
        });
      }
    }

    try {
      const response = await axios.put(
        `${apiUrl}/profile/update-profile-details`,
        { userId, ...profile }
      );
      setEditing(false);
      sessionStorage.setItem("userProfile", JSON.stringify(response.data.user));
      triggerNotification({
        type: "success",
        message: "Profile updated successfully.",
      });
    } catch {
      triggerNotification({
        type: "error",
        message: "Error updating profile.",
      });
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
            <h3 className="text-xl font-medium text-gray-700">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm text-gray-500">{profile.email}</p>
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
