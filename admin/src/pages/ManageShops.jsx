import { useState, useEffect } from "react";
import axios from "axios";

const ManageShops = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");
  const [shopCount, setShopCount] = useState(0);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchShopCount = async () => {
      try {
        const res = await axios.get(`${baseURL}/admin/shop-count-admin`);
        setShopCount(res.data.count);
      } catch (err) {
        console.error("Error fetching shop count:", err);
      }
    };

    const fetchShops = async () => {
      try {
        const res = await axios.get(`${baseURL}/admin/shops-admin`);
        setShops(res.data);
      } catch (err) {
        console.error("Error fetching shops:", err);
      }
    };

    fetchShopCount();
    fetchShops();
  }, []);

  const filteredShops = shops.filter((shop) =>
    shop.shopName.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedShop(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-cyan-600 mb-4 sm:mb-0">
          🛒 Manage Shops
        </h1>
        <button className="bg-cyan-600 text-white font-medium px-5 py-3 rounded-xl hover:bg-cyan-700 transition shadow-md">
          + Add Shop
        </button>
      </div>

      <div className="mb-6">
        <p className="text-lg text-gray-800">
          Total Shops:{" "}
          <span className="font-bold text-cyan-600">{shopCount}</span>
        </p>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by shop name..."
        className="w-full max-w-md mb-6 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-indigo-100 text-cyan-600 text-md uppercase tracking-wide">
            <tr>
              <th className="py-4 px-6 text-center">Sr. No.</th>
              <th className="px-6 py-4 text-center">Shop ID</th>
              <th className="px-6 py-4 text-center">Shop Name</th>
              <th className="px-6 py-4 text-center">Shop Type</th>
              <th className="px-6 py-4 text-center">Owner</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.length > 0 ? (
              filteredShops.map((shop, index) => (
                <tr
                  key={shop._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center">{shop.shopId}</td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-800">
                    {shop.shopName}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {shop.shopType}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {shop.ownerName}
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        shop.verified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {shop.verified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={() => openModal(shop)}
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
                <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
                  No shops found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {isModalOpen && selectedShop && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl relative">
            <h2 className="text-2xl font-bold text-cyan-700 mb-6">
              📋 Shop Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <div>
                <p className="font-semibold">Shop ID:</p>
                <p>{selectedShop.shopId}</p>
              </div>
              <div>
                <p className="font-semibold">Shop Name:</p>
                <p>{selectedShop.shopName}</p>
              </div>
              <div>
                <p className="font-semibold">Shop Type:</p>
                <p>{selectedShop.shopType}</p>
              </div>
              <div>
                <p className="font-semibold">Owner Name:</p>
                <p>{selectedShop.ownerName}</p>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <p>{selectedShop.address}</p>
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <p>{selectedShop.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{selectedShop.email}</p>
              </div>
              <div>
                <p className="font-semibold">Website:</p>
                <p>{selectedShop.website}</p>
              </div>
              <div>
                <p className="font-semibold">Opening Time:</p>
                <p>{selectedShop.openingTime}</p>
              </div>
              <div>
                <p className="font-semibold">Closing Time:</p>
                <p>{selectedShop.closingTime}</p>
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

export default ManageShops;
