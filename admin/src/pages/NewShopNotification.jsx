import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewShopNotification = () => {
  const [newShopNotification, setNewShopNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the new shop registration status from API
  const fetchNewShopNotification = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get Admin JWT token
      const response = await axios.get('http://localhost:5000/api/admin/notify-new-shop', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.newShop) {
        setNewShopNotification(response.data.newShop);
      }
    } catch (error) {
      console.error('Error fetching new shop notification:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewShopNotification();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      {loading ? (
        <div className="text-gray-500">Loading new shop notifications...</div>
      ) : (
        <>
          {newShopNotification ? (
            <div className="p-3 bg-yellow-100 text-yellow-800 rounded mt-4">
              <h3 className="font-semibold text-lg">New Shop Registration:</h3>
              <p>
                A new shop has been registered. Shop ID: <strong>{newShopNotification.shopId}</strong>
              </p>
              <p>
                Please verify and approve the shop by checking the details in the <strong>Manage Shops</strong> section.
              </p>
            </div>
          ) : (
            <div className="text-gray-500">
              No new shops pending approval at the moment.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewShopNotification;
