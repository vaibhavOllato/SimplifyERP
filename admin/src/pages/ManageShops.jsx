import { useState } from "react";

const dummyShops = [
  { id: 1, name: "Fashion World", owner: "Vaibhav Tupe", status: "Active" },
  { id: 2, name: "Style Hub", owner: "Sujit G", status: "Inactive" },
];

const ManageShops = () => {
  const [shops, setShops] = useState(dummyShops);
  const [search, setSearch] = useState("");

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Shops</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Add Shop
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by shop name..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Shop Name</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop) => (
              <tr key={shop.id} className="border-t">
                <td className="p-3">{shop.name}</td>
                <td className="p-3">{shop.owner}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      shop.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {shop.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-yellow-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filteredShops.length === 0 && (
              <tr>
                <td className="p-3 text-center" colSpan="4">
                  No shops found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageShops;
