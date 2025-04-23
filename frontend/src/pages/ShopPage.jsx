import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopDetails from './ShopDetails'; 

const ShopPage = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you have JWT in localStorage
        const response = await axios.get('http://localhost:4000/api/shops/myShop', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming you want the first shop in the array
        setShop(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shop details", error);
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {shop ? (
        <ShopDetails shop={shop} />
      ) : (
        <p>No shop details found.</p>
      )}
    </div>
  );
};

export default ShopPage;
