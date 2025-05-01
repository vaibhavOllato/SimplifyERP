import { useState } from "react";

const dummyUsers = [
  { id: 1, name: "Amit Sharma", email: "amit@example.com", role: "Manager", status: "Active" },
  { id: 2, name: "Neha Jain", email: "neha@example.com", role: "Viewer", status: "Inactive" },
];

const ManageUsers = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-yellow-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
