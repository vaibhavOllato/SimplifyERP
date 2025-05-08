import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";

const orders = [
  {
    id: "ORD001",
    customer: "Amit Sharma",
    phone: "9876543210",
    address: "123 Main Street, Mumbai",
    pincode: "400001",
    date: "2025-04-18",
    status: "Pending",
    total: 2398,
  },
  {
    id: "ORD002",
    customer: "Sneha Patel",
    phone: "9123456789",
    address: "56 Park Lane, Pune",
    pincode: "411001",
    date: "2025-04-17",
    status: "Completed",
    total: 1599,
  },
  {
    id: "ORD003",
    customer: "Rahul Verma",
    date: "2025-04-17",
    status: "Cancelled",
    total: 799,
  },
];

const OrderPage = () => {
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewOrderModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Order Management</h2>
        <button
          onClick={() => setCreateOrderModal(true)}
          className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
        >
          <PlusCircle size={20} />
          New Order
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Orders" value="320" />
        <Card title="Pending Orders" value="45" />
        <Card title="Revenue (₹)" value="₹89,320" />
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap mb-4">
        <input
          type="text"
          placeholder="Search Order ID or Customer"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
        />
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Status</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-cyan-600 text-white">
            <tr>
              <th className="text-left px-6 py-3">Order ID</th>
              <th className="text-left px-6 py-3">Customer</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Total</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{order.id}</td>
                <td className="px-6 py-3">{order.customer}</td>
                <td className="px-6 py-3">{order.date}</td>
                <td className="px-6 py-3">
                  <span
                    className={`text-sm px-2 py-1 rounded-full font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3">₹{order.total}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => handleView(order)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button className="text-red-600 hover:underline">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-xl relative transform transition-all duration-300 ease-in-out scale-95 opacity-0 hover:scale-100 hover:opacity-100">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setViewOrderModal(false)}
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-semibold mb-6 text-cyan-600">
              Order Details - {selectedOrder.id}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-medium text-lg">Customer:</p>
                <p className="text-gray-600">
                  {selectedOrder.customer || "N/A"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-lg">Phone:</p>
                <p className="text-gray-600">{selectedOrder.phone || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-lg">Address:</p>
                <p className="text-gray-600">
                  {selectedOrder.address || "N/A"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-lg">Pincode:</p>
                <p className="text-gray-600">
                  {selectedOrder.pincode || "N/A"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-lg">Status:</p>
                <p
                  className={`font-semibold text-lg ${
                    selectedOrder.status === "Completed"
                      ? "text-green-600"
                      : selectedOrder.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedOrder.status}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setViewOrderModal(false)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all duration-200"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-200">
                Edit Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {createOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Create New Order
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Order Total"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option>Status</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateOrderModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-start">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-cyan-600">{value}</p>
  </div>
);

export default OrderPage;
