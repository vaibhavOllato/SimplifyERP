// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaSearch, FaPlus } from "react-icons/fa";
// // import { useNotification } from "../context/NotificationProvider";
// import { useNotification } from "../context/NotificationProvider";

// const CustomerListPage = () => {
//   const { triggerNotification } = useNotification();
//   const [customers, setCustomers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
//   const [loading, setLoading] = useState(false);

//   const apiUrl = import.meta.env.VITE_API_BASE_URL;
//   const shopId = sessionStorage.getItem("shopId");

//   // Fetch customers
//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/customers/all`, {
//         params: { shopId },
//       });
//       setCustomers(res.data.customers || []);
//     } catch (err) {
//       // triggerNotification({
//       //   type: "error",
//       //   message: "Failed to fetch customers!",
//       // });
//       triggerNotification("Failed to fetch customers!", "error");
//     }
//   };

//   useEffect(() => {
//     if (shopId) fetchCustomers();
//   }, [shopId]);

//   // Filtered list
//   const filteredCustomers = customers.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       c._id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handle Add
//   const handleAddCustomer = async () => {
//     const { name, phone, email } = formData;
//     if (!name || !phone || !email) {
//       // toast.warning("All fields are required");
//       // triggerNotification({
//       //   type: "error",
//       //   message: "All fields are required",
//       // });
//       triggerNotification("All fields are required", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post(`${apiUrl}/customers/create`, {
//         name,
//         phone,
//         email,
//         shopId,
//       });
//       // toast.success("Customer added successfully");
//       // triggerNotification({
//       //   type: "success",
//       //   message: "Customer added successfully",
//       // });
//       triggerNotification("Customer added successfully", "success");
//       setFormData({ name: "", phone: "", email: "" });
//       setShowForm(false);
//       fetchCustomers();
//     } catch (err) {
//       // toast.error(err.response?.data?.message || "Error adding customer");
//       // triggerNotification({
//       //   type: "error",
//       //   message: err.response?.data?.message || "Error adding customer",
//       // });
//       triggerNotification(err.response?.data?.message || "Error adding customer", "success");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* <ToastContainer position="top-right" autoClose={3000} /> */}

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-500">Customer List</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
//         >
//           <FaPlus />
//           Add Customer
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative w-full md:w-96">
//           <input
//             type="text"
//             placeholder="Search by Name or Customer ID"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
//         </div>
//       </div>

//       {/* Form */}
//       {showForm && (
//         <div className="mb-6 p-4 border rounded-lg bg-gray-50">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input
//               type="text"
//               placeholder="Customer Name"
//               className="border px-4 py-2 rounded"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Phone Number"
//               className="border px-4 py-2 rounded"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="border px-4 py-2 rounded"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />
//           </div>
//           <button
//             className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded disabled:opacity-50"
//             onClick={handleAddCustomer}
//             disabled={loading}
//           >
//             {loading ? "Adding..." : "Add Customer"}
//           </button>
//         </div>
//       )}

//       {/* Table */}
//       <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
//         <table className="min-w-full text-sm text-gray-700">
//           <thead className="bg-cyan-600 text-white uppercase text-xs">
//             <tr>
//               <th className="px-6 py-4 text-center">Sr. No.</th>
//               <th className="px-6 py-4 text-center">Customer ID</th>
//               <th className="px-6 py-4 text-center">Name</th>
//               <th className="px-6 py-4 text-center">Phone</th>
//               <th className="px-6 py-4 text-center">Email</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filteredCustomers.length > 0 ? (
//               filteredCustomers.map((customer, index) => (
//                 <tr
//                   key={customer._id}
//                   className="hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-4 text-center">{index + 1}</td>
//                   <td className="px-6 py-4 text-center">{customer.customerId}</td>
//                   <td className="px-6 py-4 text-center">{customer.name}</td>
//                   <td className="px-6 py-4 text-center">{customer.phone}</td>
//                   <td className="px-6 py-4 text-center">{customer.email}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
//                   No customers found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CustomerListPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaSearch, FaPlus } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { useNotification } from "../context/NotificationProvider";

// const CustomerListPage = () => {
//   const { triggerNotification } = useNotification();
//   const [customers, setCustomers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
//   const [loading, setLoading] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   const apiUrl = import.meta.env.VITE_API_BASE_URL;
//   const shopId = sessionStorage.getItem("shopId");

//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/customers/all`, {
//         params: { shopId },
//       });
//       setCustomers(res.data.customers || []);
//     } catch (err) {
//       triggerNotification("Failed to fetch customers!", "error");
//     }
//   };

//   useEffect(() => {
//     if (shopId) fetchCustomers();
//   }, [shopId]);

//   const filteredCustomers = customers.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       c._id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddCustomer = async () => {
//     const { name, phone, email } = formData;
//     if (!name || !phone || !email) {
//       triggerNotification("All fields are required", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post(`${apiUrl}/customers/create`, {
//         name,
//         phone,
//         email,
//         shopId,
//       });
//       triggerNotification("Customer added successfully", "success");
//       setFormData({ name: "", phone: "", email: "" });
//       setShowForm(false);
//       fetchCustomers();
//     } catch (err) {
//       triggerNotification(
//         err.response?.data?.message || "Error adding customer",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-500">Customer List</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
//         >
//           <FaPlus />
//           Add Customer
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative w-full md:w-96">
//           <input
//             type="text"
//             placeholder="Search by Name or Customer ID"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
//         </div>
//       </div>

//       {/* Add Form */}
//       {showForm && (
//         <div className="mb-6 p-4 border rounded-lg bg-gray-50">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input
//               type="text"
//               placeholder="Customer Name"
//               className="border px-4 py-2 rounded"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Phone Number"
//               className="border px-4 py-2 rounded"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="border px-4 py-2 rounded"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />
//           </div>
//           <button
//             className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded disabled:opacity-50"
//             onClick={handleAddCustomer}
//             disabled={loading}
//           >
//             {loading ? "Adding..." : "Add Customer"}
//           </button>
//         </div>
//       )}

//       {/* Card List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCustomers.length > 0 ? (
//           filteredCustomers.map((customer, index) => (
//             <div
//               key={customer._id}
//               className="bg-white border rounded-lg p-4 flex items-start gap-4 shadow hover:shadow-lg transition-shadow duration-200"
//             >
//               {/* Avatar */}
//               <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 font-bold">
//                 {customer.name[0]}
//               </div>

//               {/* Info */}
//               <div className="flex-1">
//               <h3 className="text-lg font-semibold text-cyan-800">
//                   {customer.name}
//                 </h3>
//                 <p className="text-sm text-gray-500">{customer.email}</p>

//                 <hr className="my-2" />
//                 <div className="flex justify-between text-sm text-gray-700">
//                   <span>📞 {customer.phone}</span>
//                   <button
//                     onClick={() => setSelectedCustomer(customer)}
//                     className="text-cyan-600 hover:underline font-medium"
//                   >
//                     See Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">
//             No customers found
//           </p>
//         )}
//       </div>

//       {/* Details Modal */}
//       {selectedCustomer && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
//             <button
//               onClick={() => setSelectedCustomer(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <MdClose size={22} />
//             </button>
//             <h2 className="text-xl font-bold mb-4 text-cyan-700">
//               Customer Details
//             </h2>
//             <p>
//               <strong>Customer ID:</strong> {selectedCustomer.customerId}
//             </p>
//             <p>
//               <strong>Name:</strong> {selectedCustomer.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {selectedCustomer.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {selectedCustomer.phone}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerListPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaSearch, FaPlus } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { useNotification } from "../context/NotificationProvider";

// const CustomerListPage = () => {
//   const { triggerNotification } = useNotification();
//   const [customers, setCustomers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
//   const [loading, setLoading] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   const apiUrl = import.meta.env.VITE_API_BASE_URL;
//   const shopId = sessionStorage.getItem("shopId");

//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/customers/all`, {
//         params: { shopId },
//       });
//       setCustomers(res.data.customers || []);
//     } catch (err) {
//       triggerNotification("Failed to fetch customers!", "error");
//     }
//   };

//   useEffect(() => {
//     if (shopId) fetchCustomers();
//   }, [shopId]);

//   const filteredCustomers = customers.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       c._id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddCustomer = async () => {
//     const { name, phone, email } = formData;
//     if (!name || !phone || !email) {
//       triggerNotification("All fields are required", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post(`${apiUrl}/customers/create`, {
//         name,
//         phone,
//         email,
//         shopId,
//       });
//       triggerNotification("Customer added successfully", "success");
//       setFormData({ name: "", phone: "", email: "" });
//       setShowAddModal(false);
//       fetchCustomers();
//     } catch (err) {
//       triggerNotification(
//         err.response?.data?.message || "Error adding customer",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-500">Customer List</h2>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
//         >
//           <FaPlus />
//           Add Customer
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative w-full md:w-96">
//           <input
//             type="text"
//             placeholder="Search by Name or Customer ID"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
//         </div>
//       </div>

//       {/* Customer Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCustomers.length > 0 ? (
//           filteredCustomers.map((customer) => (
//             <div
//               key={customer._id}
//               className="bg-white border rounded-lg p-4 flex items-start gap-4 shadow hover:shadow-lg transition-shadow duration-200"
//             >
//               <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 font-bold">
//                 {customer.name[0]}
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-cyan-800">
//                   {customer.name}
//                 </h3>
//                 <p className="text-sm text-gray-500">{customer.email}</p>

//                 <hr className="my-2" />
//                 <div className="flex justify-between text-sm text-gray-700">
//                   <span>📞 {customer.phone}</span>
//                   <button
//                     onClick={() => setSelectedCustomer(customer)}
//                     className="text-cyan-600 hover:underline font-medium"
//                   >
//                     See Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">
//             No customers found
//           </p>
//         )}
//       </div>

//       {/* Add Customer Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
//             <button
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//               onClick={() => setShowAddModal(false)}
//             >
//               <MdClose size={22} />
//             </button>
//             <h3 className="text-xl font-bold mb-4 text-cyan-700">
//               Add New Customer
//             </h3>
//             <div className="grid grid-cols-1 gap-4">
//               <input
//                 type="text"
//                 placeholder="Customer Name"
//                 className="border px-4 py-2 rounded"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 className="border px-4 py-2 rounded"
//                 value={formData.phone}
//                 onChange={(e) =>
//                   setFormData({ ...formData, phone: e.target.value })
//                 }
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="border px-4 py-2 rounded"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//               <button
//                 className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded disabled:opacity-50"
//                 onClick={handleAddCustomer}
//                 disabled={loading}
//               >
//                 {loading ? "Adding..." : "Add Customer"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       {selectedCustomer && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative animate-fade-in">
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedCustomer(null)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
//             >
//               <MdClose size={24} />
//             </button>

//             {/* Header */}
//             <div className="mb-4">
//               <h2 className="text-2xl font-bold text-cyan-700 flex items-center gap-2">
//                 👤 Customer Details
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Detailed view of selected customer
//               </p>
//             </div>

//             <hr className="mb-4 border-t border-gray-200" />

//             {/* Info Grid */}
//             <div className="space-y-4 text-gray-700 text-[15px]">
//               <div className="flex items-start gap-2">
//                 <span className="w-32 font-medium text-gray-600">
//                   Customer ID:
//                 </span>
//                 <span className="break-all">{selectedCustomer.customerId}</span>
//               </div>
//               <div className="flex items-start gap-2">
//                 <span className="w-32 font-medium text-gray-600">Name:</span>
//                 <span>{selectedCustomer.name}</span>
//               </div>
//               <div className="flex items-start gap-2">
//                 <span className="w-32 font-medium text-gray-600">Email:</span>
//                 <span>{selectedCustomer.email}</span>
//               </div>
//               <div className="flex items-start gap-2">
//                 <span className="w-32 font-medium text-gray-600">Phone:</span>
//                 <span>{selectedCustomer.phone}</span>
//               </div>
//             </div>

//             {/* Footer Actions (optional) */}
//             {/* <div className="mt-6 text-right">
//               <button
//                 onClick={() => setSelectedCustomer(null)}
//                 className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg transition"
//               >
//                 Close
//               </button>
//             </div> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerListPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaPlus, FaThList, FaThLarge } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNotification } from "../context/NotificationProvider";

const CustomerListPage = () => {
  const { triggerNotification } = useNotification();
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewType, setViewType] = useState("card"); // 'card' or 'table'

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const shopId = sessionStorage.getItem("shopId");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/customers/all`, {
        params: { shopId },
      });
      setCustomers(res.data.customers || []);
    } catch (err) {
      triggerNotification("Failed to fetch customers!", "error");
    }
  };

  useEffect(() => {
    if (shopId) fetchCustomers();
  }, [shopId]);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = async () => {
    const { name, phone, email } = formData;
    if (!name || !phone || !email) {
      triggerNotification("All fields are required", "error");
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
      triggerNotification("Customer added successfully", "success");
      setFormData({ name: "", phone: "", email: "" });
      setShowAddModal(false);
      fetchCustomers();
    } catch (err) {
      triggerNotification(
        err.response?.data?.message || "Error adding customer",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Customer List</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setViewType("card")}
            className={`p-2 rounded ${
              viewType === "card"
                ? "bg-cyan-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            title="Card View"
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewType("table")}
            className={`p-2 rounded ${
              viewType === "table"
                ? "bg-cyan-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            title="Table View"
          >
            <FaThList />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <FaPlus />
            Add Customer
          </button>
        </div>
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

      {/* Card or Table View */}
      {filteredCustomers.length > 0 ? (
        viewType === "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <div
                key={customer._id}
                className="bg-white border rounded-lg p-4 flex items-start gap-4 shadow hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 font-bold">
                  {customer.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-cyan-800">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>

                  <hr className="my-2" />
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>📞 {customer.phone}</span>
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-cyan-600 hover:underline font-medium"
                    >
                      See Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 font-semibold">
                <tr>
                  <th className="px-4 py-3">Customer ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{customer.customerId}</td>
                    <td className="px-4 py-2">{customer.name}</td>
                    <td className="px-4 py-2">{customer.email}</td>
                    <td className="px-4 py-2">{customer.phone}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-cyan-600 hover:underline text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No customers found
        </p>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={() => setShowAddModal(false)}
            >
              <MdClose size={22} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-cyan-700">
              Add New Customer
            </h3>
            <div className="grid grid-cols-1 gap-4">
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
              <button
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded disabled:opacity-50"
                onClick={handleAddCustomer}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Customer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative animate-fade-in">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
              <MdClose size={24} />
            </button>

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-cyan-700 flex items-center gap-2">
                👤 Customer Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Detailed view of selected customer
              </p>
            </div>

            <hr className="mb-4 border-t border-gray-200" />

            <div className="space-y-4 text-gray-700 text-[15px]">
              <div className="flex items-start gap-2">
                <span className="w-32 font-medium text-gray-600">
                  Customer ID:
                </span>
                <span className="break-all">{selectedCustomer.customerId}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-32 font-medium text-gray-600">Name:</span>
                <span>{selectedCustomer.name}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-32 font-medium text-gray-600">Email:</span>
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-32 font-medium text-gray-600">Phone:</span>
                <span>{selectedCustomer.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerListPage;
