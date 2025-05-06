import { useState, useEffect } from "react";
import axios from "axios";

const ManageShops = () => {
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");
  const [shopCount, setShopCount] = useState(0);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch shops and count on component mount
  useEffect(() => {
    const fetchShopCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/shop-count-admin"
        );
        setShopCount(response.data.count);
      } catch (error) {
        console.error("Error fetching shop count:", error);
      }
    };

    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/shops-admin"
        );
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
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
    setIsModalOpen(false);
    setSelectedShop(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-600">
          Manage Shops
        </h1>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all">
          + Add Shop
        </button>
      </div>

      <div className="mb-4 text-lg text-gray-700">
        <p>
          Total Shops:{" "}
          <span className="font-bold text-indigo-600">{shopCount}</span>
        </p>
      </div>

      <input
        type="text"
        placeholder="Search by shop name..."
        className="w-full p-3 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full table-auto text-gray-700">
          <thead className="bg-indigo-100 text-gray-600">
            <tr>
              <th className="py-4 px-6 text-left">Shop Name</th>
              <th className="py-4 px-6 text-left">Owner</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop) => (
              <tr
                key={shop._id}
                className="border-t hover:bg-gray-100 transition-all duration-300"
              >
                <td className="py-4 px-6">{shop.shopName}</td>
                <td className="py-4 px-6">{shop.userId}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm ${
                      shop.verified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {shop.verified ? "Verified" : "Not Verified"}
                  </span>
                </td>
                <td className="py-4 px-6 space-x-4">
                  <button
                    onClick={() => openModal(shop)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition-all"
                  >
                    View
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800 font-semibold transition-all">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 font-semibold transition-all">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredShops.length === 0 && (
              <tr>
                <td className="py-4 px-6 text-center" colSpan="4">
                  No shops found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing shop details */}
      {isModalOpen && selectedShop && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">
              Shop Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-700">Shop Name:</p>
                <p className="text-lg text-gray-600">{selectedShop.shopName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Shop Type:</p>
                <p className="text-lg text-gray-600">{selectedShop.shopType}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Owner:</p>
                <p className="text-lg text-gray-600">{selectedShop.userId}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Address:</p>
                <p className="text-lg text-gray-600">{selectedShop.address}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Phone:</p>
                <p className="text-lg text-gray-600">{selectedShop.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email:</p>
                <p className="text-lg text-gray-600">{selectedShop.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Website:</p>
                <p className="text-lg text-gray-600">{selectedShop.website}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Opening Time:</p>
                <p className="text-lg text-gray-600">
                  {selectedShop.openingTime}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Closing Time:</p>
                <p className="text-lg text-gray-600">
                  {selectedShop.closingTime}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShops;
