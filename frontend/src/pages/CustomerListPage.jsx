import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const customers = [
  {
    id: "CUST001",
    name: "John Doe",
    phone: "9876543210",
    address: "123 Elm Street, New York",
    pincode: "10001",
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    phone: "9123456789",
    address: "456 Maple Avenue, Los Angeles",
    pincode: "90001",
  },
  {
    id: "CUST003",
    name: "Amit Sharma",
    phone: "9876543210",
    address: "789 Oak Road, Mumbai",
    pincode: "400001",
  },
];

const CustomerListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer List</h2>
      </div>

      {/* Search Input */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search by Name or Customer ID"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-4 text-gray-500" />
        </div>
      </div>

      {/* Customer Table */}
      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-cyan-600 text-white">
            <tr>
              <th className="text-left px-6 py-3">Customer ID</th>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Phone</th>
              <th className="text-left px-6 py-3">Address</th>
              <th className="text-left px-6 py-3">Pincode</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{customer.id}</td>
                <td className="px-6 py-3">{customer.name}</td>
                <td className="px-6 py-3">{customer.phone}</td>
                <td className="px-6 py-3">{customer.address}</td>
                <td className="px-6 py-3">{customer.pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerListPage;
