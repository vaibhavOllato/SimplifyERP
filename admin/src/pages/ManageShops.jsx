import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNotification } from "../context/NotificationProvider";


const ManageShops = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { triggerNotification } = useNotification();
  const [shops, setShops] = useState([]);
  const [shopCount, setShopCount] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activatingShopId, setActivatingShopId] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io(baseURL, {
      transports: ["websocket"],
    });

    setSocket(socketConnection);

    socketConnection.on("shopActivated", (shop) => {
      console.log("Real-time activation:", shop);
      setShops((prevShops) =>
        prevShops.map((s) =>
          s._id === shop._id ? { ...s, isActive: true } : s
        )
      );
    });

    return () => socketConnection.disconnect();
  }, [baseURL]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const [countRes, shopRes] = await Promise.all([
          axios.get(`${baseURL}/admin/shop-count-admin`),
          axios.get(`${baseURL}/admin/shops-admin`),
        ]);
        setShopCount(countRes.data.count);
        setShops(Array.isArray(shopRes.data) ? shopRes.data : []);
      } catch (err) {
        console.error("Error fetching shops:", err);
        
      }
    };

    fetchShops();
  }, [baseURL]);

  const handleActivateShop = async (shopId) => {
    setActivatingShopId(shopId);
    const token = localStorage.getItem("adminToken");

    try {
      const res = await axios.post(
        `${baseURL}/admin/activate-shop/${shopId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        // alert("Shop activated successfully!");
        triggerNotification("Shop activated successfully!", "success");
        setShops((prevShops) =>
          prevShops.map((s) =>
            s._id === shopId ? { ...s, isActive: true } : s
          )
        );
      }
    } catch (err) {
      console.error("Activation failed:", err.response || err.message);
      alert("Failed to activate shop.");
      triggerNotification("Failed to activate shop.", "error");
    } finally {
      setActivatingShopId(null);
    }
  };

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
          Total Shops: <span className="font-bold text-white">{shopCount}</span>
        </button>
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
              <th className="py-4 px-6 text-center">#</th>
              <th className="px-6 py-4 text-center">Shop ID</th>
              <th className="px-6 py-4">Shop Name</th>
              <th className="px-6 py-4 text-center">Shop Type</th>
              <th className="px-6 py-4 text-center">Owner</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.length > 0 ? (
              filteredShops.map((shop, index) => (
                <tr key={shop._id} className="border-b">
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center">{shop.shopId}</td>
                  <td className="py-3 px-6">{shop.shopName}</td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {shop.shopType}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {shop.ownerName}
                  </td>

                  <td className="px-6 py-4 text-center text-gray-700">
                    {!shop.isActive ? (
                      <button
                        onClick={() => handleActivateShop(shop._id)}
                        disabled={activatingShopId === shop._id}
                        className={`px-3 py-1 rounded text-white text-sm ${
                          activatingShopId === shop._id
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-cyan-600 hover:bg-cyan-700"
                        }`}
                      >
                        {activatingShopId === shop._id
                          ? "Activating..."
                          : "Activate"}
                      </button>
                    ) : (
                      <span className="text-sm text-green-600">✔ Actived</span>
                    )}
                  </td>
                  <td className="py-3 px-6 flex gap-2">
                    <button
                      onClick={() => openModal(shop)}
                      className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
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
                <p className="font-semibold text-gray-500">Shop ID:</p>
                <p>{selectedShop.shopId}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Shop Name:</p>
                <p>{selectedShop.shopName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Shop Type:</p>
                <p>{selectedShop.shopType}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Owner Name:</p>
                <p>{selectedShop.ownerName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Address:</p>
                <p>{selectedShop.address}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Phone:</p>
                <p>{selectedShop.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Email:</p>
                <p>{selectedShop.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Website:</p>
                <p>{selectedShop.website}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Opening Time:</p>
                <p>{selectedShop.openingTime}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Closing Time:</p>
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
