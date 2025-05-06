import { useEffect, useState } from "react";
import adminAxios from "../utils/axiosInstance";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [shopCount, setShopCount] = useState(null);

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

    fetchStats();
    fetchShopCount();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {stats ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded">
            Total Shops: {stats.totalShops}
          </div>
          <div className="p-4 bg-white shadow rounded">
            Total Users: {stats.totalUsers}
          </div>
          <div className="p-4 bg-white shadow rounded">
            Total Orders: {stats.totalOrders}
          </div>
          <div className="p-4 shadow rounded col-span-2 md:col-span-1 bg-cyan-100 font-semibold">
            Verified Shop Count: {shopCount !== null ? shopCount : "Loading..."}
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
};

export default Dashboard;
