import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopDetails from "./ShopDetails";
// import ShopRegisterForm from "./ShopRegisterForm";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        console.log("User ID from sessionStorage:", userId);

        if (!userId) {
          console.error("No userId found in sessionStorage.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${apiUrl}/shops/user/${userId}`);
        console.log("API Response Data:", res.data);

        const shopData = res.data?.shops?.[0] || null;
        console.log("Shop Data Found:", shopData); // Log the found shop data

        setShop(shopData);

        if (shopData) {
          sessionStorage.setItem("shopRegistered", "true"); 
          sessionStorage.setItem("shopId", shopData.shopId);
          console.log();
          
        } else {
          sessionStorage.removeItem("shopRegistered"); 
          sessionStorage.removeItem("shopId");

        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, []);

  if (loading) return <div className="p-4 text-gray-600">Loading...</div>;

  return (
    <div className="p-4">
      {shop ? (
        // Only show ShopDetails if shop data is found
        <div className="max-w-5xl bg-gray-100 shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold text-gray-400 mb-1">
            Shop Details
          </h2>
          <ShopDetails shop={shop} />
        </div>
      ) : (
        <div className="max-w-5xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-500 mb-6">
            Shop Registration
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            It seems like you haven't registered your shop yet. To get started,
            please provide your shop details below.
          </p>

          <div className="text-center">
            <p className="text-gray-500 mb-4">
              Register your shop to access full features and start managing your
              store!
            </p>

            {/* Register Button */}
            <button
              className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-all duration-300 focus:outline-none"
              onClick={() => navigate("/shop-register-form")}
            >
              Register Your Shop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
