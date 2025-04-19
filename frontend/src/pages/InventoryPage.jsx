// import React from "react";
// import { PlusCircle } from "lucide-react";

// const inventoryData = [
//   {
//     name: "Blue Shirt",
//     code: "BS1001",
//     category: "Shirts",
//     size: "M",
//     color: "Blue",
//     quantity: 5,
//     price: 699,
//     status: "Low Stock",
//   },
//   {
//     name: "Denim Jeans",
//     code: "DJ2001",
//     category: "Pants",
//     size: "32",
//     color: "Blue",
//     quantity: 0,
//     price: 1199,
//     status: "Out of Stock",
//   },
//   {
//     name: "Casual T-Shirt",
//     code: "TS3001",
//     category: "T-Shirts",
//     size: "L",
//     color: "Black",
//     quantity: 25,
//     price: 499,
//     status: "In Stock",
//   },
// ];

// const InventoryPage = () => {
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
//         <button className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700">
//           <PlusCircle size={20} />
//           Add Product
//         </button>
//       </div>

//       {/* Analytics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <Card title="Total Products" value="150" />
//         <Card title="Low Stock Items" value="12" />
//         <Card title="Out of Stock" value="5" />
//         <Card title="Inventory Value" value="₹1,20,000" />
//       </div>

//       {/* Filters and Search */}
//       <div className="flex flex-wrap items-center gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by name or code"
//           className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
//         />
//         <select className="border border-gray-300 rounded-lg px-4 py-2">
//           <option>All Categories</option>
//           <option>Shirts</option>
//           <option>Pants</option>
//           <option>T-Shirts</option>
//         </select>
//         <select className="border border-gray-300 rounded-lg px-4 py-2">
//           <option>Status</option>
//           <option>In Stock</option>
//           <option>Low Stock</option>
//           <option>Out of Stock</option>
//         </select>
//       </div>

//       {/* Inventory Table */}
//       <div className="overflow-auto rounded-lg shadow">
//         <table className="min-w-full bg-white">
//           <thead className="bg-cyan-600 text-white sticky top-0">
//             <tr>
//               <th className="text-left px-6 py-3">Product Name</th>
//               <th className="text-left px-6 py-3">Code</th>
//               <th className="text-left px-6 py-3">Category</th>
//               <th className="text-left px-6 py-3">Size</th>
//               <th className="text-left px-6 py-3">Color</th>
//               <th className="text-left px-6 py-3">Quantity</th>
//               <th className="text-left px-6 py-3">Price</th>
//               <th className="text-left px-6 py-3">Status</th>
//               <th className="text-left px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {inventoryData.map((item, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-3">{item.name}</td>
//                 <td className="px-6 py-3">{item.code}</td>
//                 <td className="px-6 py-3">{item.category}</td>
//                 <td className="px-6 py-3">{item.size}</td>
//                 <td className="px-6 py-3">{item.color}</td>
//                 <td className="px-6 py-3">{item.quantity}</td>
//                 <td className="px-6 py-3">₹{item.price}</td>
//                 <td className="px-6 py-3">
//                   <span
//                     className={`text-sm font-medium px-2 py-1 rounded-full ${
//                       item.status === "In Stock"
//                         ? "bg-green-100 text-green-600"
//                         : item.status === "Low Stock"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-3 space-x-2">
//                   <button className="text-blue-600 hover:underline">Edit</button>
//                   <button className="text-red-600 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-start">
//     <p className="text-sm text-gray-500">{title}</p>
//     <p className="text-2xl font-bold text-cyan-600">{value}</p>
//   </div>
// );

// export default InventoryPage;


import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";

const initialInventoryData = [
  {
    name: "Blue Shirt",
    code: "BS1001",
    category: "Shirts",
    size: "M",
    color: "Blue",
    quantity: 5,
    price: 699,
    status: "Low Stock",
  },
  {
    name: "Denim Jeans",
    code: "DJ2001",
    category: "Pants",
    size: "32",
    color: "Blue",
    quantity: 0,
    price: 1199,
    status: "Out of Stock",
  },
  {
    name: "Casual T-Shirt",
    code: "TS3001",
    category: "T-Shirts",
    size: "L",
    color: "Black",
    quantity: 25,
    price: 499,
    status: "In Stock",
  },
];

const InventoryPage = () => {
  const [inventory, setInventory] = useState(initialInventoryData);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    code: "",
    category: "",
    size: "",
    color: "",
    quantity: 0,
    price: 0,
  });
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (code) => {
    setSelectedRows((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  };

  const handleDeleteSelected = () => {
    setInventory((prev) => prev.filter((item) => !selectedRows.includes(item.code)));
    setSelectedRows([]);
  };

  const handleAddProduct = () => {
    const quantity = parseInt(newProduct.quantity);
    const status =
      quantity === 0
        ? "Out of Stock"
        : quantity < 10
        ? "Low Stock"
        : "In Stock";

    setInventory((prev) => [
      ...prev,
      {
        ...newProduct,
        quantity,
        price: parseFloat(newProduct.price),
        status,
      },
    ]);
    setShowModal(false);
    setNewProduct({
      name: "",
      code: "",
      category: "",
      size: "",
      color: "",
      quantity: 0,
      price: 0,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Inventory Management</h2>
        <div className="flex gap-3">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </button>
          <button
            className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
            onClick={() => setShowModal(true)}
          >
            <PlusCircle size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total Products" value={inventory.length} />
        <Card title="Low Stock Items" value={inventory.filter(i => i.status === "Low Stock").length} />
        <Card title="Out of Stock" value={inventory.filter(i => i.status === "Out of Stock").length} />
        <Card
          title="Inventory Value"
          value={`₹${inventory.reduce((sum, item) => sum + item.price * item.quantity, 0)}`}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-cyan-600 text-white sticky top-0">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked ? inventory.map((item) => item.code) : []
                    )
                  }
                  checked={selectedRows.length === inventory.length}
                />
              </th>
              <th className="text-left px-4 py-3">Product Name</th>
              <th className="text-left px-4 py-3">Code</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Size</th>
              <th className="text-left px-4 py-3">Color</th>
              <th className="text-left px-4 py-3">Quantity</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.code} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.code)}
                    onChange={() => handleCheckboxChange(item.code)}
                  />
                </td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.code}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">{item.size}</td>
                <td className="px-4 py-3">{item.color}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">₹{item.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      item.status === "In Stock"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() =>
                      setInventory((prev) =>
                        prev.filter((prod) => prod.code !== item.code)
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Add New Product</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="text-gray-500 hover:text-red-500" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="border p-2 rounded"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Code"
                value={newProduct.code}
                onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Size"
                value={newProduct.size}
                onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Color"
                value={newProduct.color}
                onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Quantity"
                type="number"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              />
              <input
                className="border p-2 rounded col-span-2"
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddProduct}
                className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
              >
                Save
              </button>
            </div>
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

export default InventoryPage;
