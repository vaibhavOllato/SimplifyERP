import React, { useState } from 'react';
import axios from 'axios';

const ApproveShop = () => {
  const [shopId, setShopId] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleApprove = async () => {
    if (!shopId) {
      setError('Shop ID is required');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const token = localStorage.getItem('token'); // Admin JWT
      const res = await axios.put(
        `http://localhost:5000/api/admin/approve-shop/${shopId}`,
        {
          approvedBy: approvedBy || 'admin123',
          message: message || 'Approved by super admin',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Approve Shop</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Shop ID</label>
        <input
          type="text"
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          placeholder="Enter Shop ID (e.g. SiERP-SHOP-XXXXXXX)"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Approved By</label>
        <input
          type="text"
          value={approvedBy}
          onChange={(e) => setApprovedBy(e.target.value)}
          placeholder="admin123"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Approval Message</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Approved by super admin"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <button
        onClick={handleApprove}
        disabled={loading}
        className="w-full bg-cyan-600 text-white font-semibold py-2 rounded hover:bg-cyan-700 transition disabled:opacity-50"
      >
        {loading ? 'Approving...' : 'Approve Shop'}
      </button>

      {response && (
        <div className="p-3 bg-green-100 text-green-700 rounded mt-4">
          ✅ {response.message}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded mt-4">
          ❌ {error}
        </div>
      )}
    </div>
  );
};

export default ApproveShop;
