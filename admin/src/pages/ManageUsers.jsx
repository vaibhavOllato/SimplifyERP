import { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await axios.get(`${baseURL}/admin/users-count`);
        setUserCount(res.data.count);
      } catch (err) {
        console.error("Error fetching user count:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL}/admin/admin-users`);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUserCount();
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-cyan-600 mb-4 sm:mb-0">
          👥 Manage Users
        </h1>
        <button className="bg-cyan-600 text-white font-medium px-5 py-3 rounded-xl hover:bg-cyan-700 transition shadow-md">
          + Add User
        </button>
      </div>

      <div className="mb-6">
        <p className="text-lg text-gray-800">
          Total Users:{" "}
          <span className="font-bold text-cyan-600">{userCount}</span>
        </p>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by user name..."
        className="w-full max-w-md mb-6 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-indigo-100 text-cyan-600 text-md uppercase tracking-wide">
            <tr>
              <th className="py-4 px-6 text-center">Sr. No.</th>
              <th className="px-6 py-4 text-center">User ID</th>
              <th className="px-6 py-4 text-center">Name</th>
              <th className="px-6 py-4 text-center">Email</th>
              {/* <th className="px-6 py-4 text-center">Role</th> */}
              <th className="px-6 py-4 text-center">Created At</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center">{user.userId}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 text-center">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-center">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {new Date(user.createdAt)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>
                  <td className="px-6 py-4 space-x-3 text-center">
                    <button
                      onClick={() => openModal(user)}
                      className="text-cyan-600 hover:underline font-medium"
                    >
                      View
                    </button>
                    <button className="text-yellow-600 hover:underline font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl relative">
            <h2 className="text-2xl font-bold text-cyan-600 mb-6">
              👤 User Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <div>
                <p className="font-semibold">User ID:</p>
                <p>{selectedUser.userId}</p>
              </div>
              <div>
                <p className="font-semibold">Name:</p>
                {/* <p>{selectedUser.name}</p> */}
                <p>
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{selectedUser.email}</p>
              </div>

              <div>
                <p className="font-semibold">Phone:</p>
                <p>{selectedUser.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>{selectedUser.active ? "Active" : "Inactive"}</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
