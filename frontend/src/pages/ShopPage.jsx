import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopDetails from "./ShopDetails";
// import { useNotification } from "../context/NotificationProvider";

const ShopPage = () => {
  // const { triggerNotification } = useNotification();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/shops/myShop`, {
          withCredentials: true,
        });
        console.log("Response Data:", response.data); 

        // Assuming response.data is an array of shops, get the first shop
        const shopData = Array.isArray(response.data)
          ? response.data[0]
          : response.data.shop;
        console.log("Shop Data:", shopData);
        setShop(shopData);
      } catch (error) {
        console.error("Error fetching shop details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, []);

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;

  return (
    <div className="p-4">
      {shop ? (
        <div className="max-w-3xl mx-auto bg-gray-200 shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-600">Shop Details</h2>
          <ShopDetails shop={shop} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
          <p className="text-lg text-gray-500">No shop details found.</p>
          <p className="text-sm text-gray-400">
            Make sure your account is properly registered with shop details.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
