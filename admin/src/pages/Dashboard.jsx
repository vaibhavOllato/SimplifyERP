import { useEffect, useState } from "react";
import { FaStore, FaUsers } from "react-icons/fa";
import adminAxios from "../utils/axiosInstance";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [shopCount, setShopCount] = useState(null);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAxios.get("/dashboard-stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    };

    const fetchShopCount = async () => {
      try {
        const res = await adminAxios.get("/shop-count-admin");
        setShopCount(res.data.count);
      } catch (err) {
        console.error("Failed to load shop count", err);
      }
    };

    const fetchUserCount = async () => {
      try {
        const res = await adminAxios.get("/users-count");
        setUserCount(res.data.count);
      } catch (err) {
        console.error("Failed to load user count", err);
      }
    };

    fetchStats();
    fetchShopCount();
    fetchUserCount();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-500 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Shops Card */}
        <div className="flex items-center p-6 bg-cyan-100 rounded-xl shadow hover:shadow-md transition">
          <div className="p-4 bg-cyan-600 text-white rounded-full mr-4">
            <FaStore className="text-2xl" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Total Shops</p>
            <p className="text-2xl font-bold text-cyan-800">
              {shopCount !== null ? shopCount : "Loading..."}
            </p>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="flex items-center p-6 bg-emerald-100 rounded-xl shadow hover:shadow-md transition">
          <div className="p-4 bg-emerald-600 text-white rounded-full mr-4">
            <FaUsers className="text-2xl" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Total Users</p>
            <p className="text-2xl font-bold text-emerald-800">
              {userCount !== null ? userCount : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
