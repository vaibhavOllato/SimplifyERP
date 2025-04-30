import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useNotification } from "../context/NotificationProvider";

const CustomerListPage = () => {
  const { triggerNotification } = useNotification();
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const shopId = sessionStorage.getItem("shopId");

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/customers/all`, {
        params: { shopId },
      });
      setCustomers(res.data.customers || []);
    } catch (err) {
      triggerNotification({
        type: "error",
        message: "Failed to fetch customers!",
      });
    }
  };

  useEffect(() => {
    if (shopId) fetchCustomers();
  }, [shopId]);

  // Filtered list
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Add
  const handleAddCustomer = async () => {
    const { name, phone, email } = formData;
    if (!name || !phone || !email) {
      // toast.warning("All fields are required");
      triggerNotification({
        type: "error",
        message: "All fields are required",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/customers/create`, {
        name,
        phone,
        email,
        shopId,
      });
      // toast.success("Customer added successfully");
      triggerNotification({
        type: "success",
        message: "Customer added successfully",
      });
      setFormData({ name: "", phone: "", email: "" });
      setShowForm(false);
      fetchCustomers();
    } catch (err) {
      // toast.error(err.response?.data?.message || "Error adding customer");
      triggerNotification({
        type: "error",
        message: err.response?.data?.message || "Error adding customer",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Customer List</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <FaPlus />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by Name or Customer ID"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              className="border px-4 py-2 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border px-4 py-2 rounded"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border px-4 py-2 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded disabled:opacity-50"
            onClick={handleAddCustomer}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Customer"}
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-cyan-600 text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Sr. No.</th>
              <th className="px-6 py-4 text-left">Customer ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr
                  key={customer._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{customer._id}</td>
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerListPage;
