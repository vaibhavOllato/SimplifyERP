// import React, { useState } from "react";
// import { PlusCircle, X } from "lucide-react";
// import axios from "axios";

// const InventoryPage = () => {
//   const [inventory, setInventory] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     code: "",
//     category: "",
//     size: "",
//     color: "",
//     quantity: 0,
//     price: 0,
//   });
//   const [selectedRows, setSelectedRows] = useState([]);

//   const handleCheckboxChange = (code) => {
//     setSelectedRows((prev) =>
//       prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
//     );
//   };

//   const handleDeleteSelected = () => {
//     setInventory((prev) =>
//       prev.filter((item) => !selectedRows.includes(item.code))
//     );
//     setSelectedRows([]);
//   };

//   const handleAddProduct = async () => {
//     const quantity = parseInt(newProduct.quantity);
//     const price = parseFloat(newProduct.price);
//     const status =
//       quantity === 0
//         ? "Out of Stock"
//         : quantity < 10
//         ? "Low Stock"
//         : "In Stock";

//     const productData = {
//       productName: newProduct.name.trim(),
//       productCode: newProduct.code.trim(),
//       category: newProduct.category.trim(),
//       price,
//       quantity,
//       shopId: "vaibhav-motos-a6f540", // replace dynamically if needed
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/products/create",
//         productData
//       );

//       if (response.status === 201 || response.status === 200) {
//         setInventory((prev) => [
//           ...prev,
//           {
//             ...newProduct,
//             quantity,
//             price,
//             status,
//           },
//         ]);
//         setShowModal(false);
//         setNewProduct({
//           name: "",
//           code: "",
//           category: "",
//           size: "",
//           color: "",
//           quantity: 0,
//           price: 0,
//         });
//       }
//     } catch (error) {
//       if (
//         error?.response?.data?.message ===
//         "Product with this code already exists for the shop"
//       ) {
//         alert("This product code already exists for the shop.");
//       } else {
//         console.error("Error adding product:", error);
//         alert("Failed to add product. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-500">
//           Inventory Management
//         </h2>
//         <div className="flex gap-3">
//           <button
//             onClick={handleDeleteSelected}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
//             disabled={selectedRows.length === 0}
//           >
//             Delete Selected
//           </button>
//           <button
//             className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
//             onClick={() => setShowModal(true)}
//           >
//             <PlusCircle size={20} />
//             Add Product
//           </button>
//         </div>
//       </div>

//       {/* Analytics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {/* <Card title="Total Products" value={inventory.length} /> */}
//         <Card title="Total Products" value={inventory.length} />

//         <Card
//           title="Low Stock Items"
//           value={inventory.filter((i) => i.status === "Low Stock").length}
//         />
//         <Card
//           title="Out of Stock"
//           value={inventory.filter((i) => i.status === "Out of Stock").length}
//         />
//         <Card
//           title="Inventory Value"
//           value={`₹${inventory.reduce(
//             (sum, item) => sum + item.price * item.quantity,
//             0
//           )}`}
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-auto rounded-lg shadow">
//         <table className="min-w-full bg-white">
//           <thead className="bg-cyan-600 text-white sticky top-0">
//             <tr>
//               <th className="px-4 py-3">
//                 <input
//                   type="checkbox"
//                   onChange={(e) =>
//                     setSelectedRows(
//                       e.target.checked ? inventory.map((item) => item.code) : []
//                     )
//                   }
//                   checked={selectedRows.length === inventory.length}
//                 />
//               </th>
//               <th className="text-left px-4 py-3">Product Name</th>
//               <th className="text-left px-4 py-3">Code</th>
//               <th className="text-left px-4 py-3">Category</th>
//               <th className="text-left px-4 py-3">Size</th>
//               <th className="text-left px-4 py-3">Color</th>
//               <th className="text-left px-4 py-3">Quantity</th>
//               <th className="text-left px-4 py-3">Price</th>
//               <th className="text-left px-4 py-3">Status</th>
//               <th className="text-left px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {inventory.map((item) => (
//               <tr key={item.code} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.includes(item.code)}
//                     onChange={() => handleCheckboxChange(item.code)}
//                   />
//                 </td>
//                 <td className="px-4 py-3">{item.name}</td>
//                 <td className="px-4 py-3">{item.code}</td>
//                 <td className="px-4 py-3">{item.category}</td>
//                 <td className="px-4 py-3">{item.size}</td>
//                 <td className="px-4 py-3">{item.color}</td>
//                 <td className="px-4 py-3">{item.quantity}</td>
//                 <td className="px-4 py-3">₹{item.price}</td>
//                 <td className="px-4 py-3">
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
//                 <td className="px-4 py-3 space-x-2">
//                   <button className="text-blue-600 hover:underline">
//                     Edit
//                   </button>
//                   <button
//                     className="text-red-600 hover:underline"
//                     onClick={() =>
//                       setInventory((prev) =>
//                         prev.filter((prod) => prod.code !== item.code)
//                       )
//                     }
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold text-gray-700">
//                 Add New Product
//               </h3>
//               <button onClick={() => setShowModal(false)}>
//                 <X className="text-gray-500 hover:text-red-500" />
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Name"
//                 value={newProduct.name}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, name: e.target.value })
//                 }
//               />
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Code"
//                 value={newProduct.code}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, code: e.target.value })
//                 }
//               />
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Category"
//                 value={newProduct.category}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, category: e.target.value })
//                 }
//               />
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Size"
//                 value={newProduct.size}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, size: e.target.value })
//                 }
//               />
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Color"
//                 value={newProduct.color}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, color: e.target.value })
//                 }
//               />
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Quantity"
//                 type="number"
//                 value={newProduct.quantity}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, quantity: e.target.value })
//                 }
//               />
//               <input
//                 className="border p-2 rounded col-span-2"
//                 placeholder="Price"
//                 type="number"
//                 value={newProduct.price}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, price: e.target.value })
//                 }
//               />
//             </div>
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={handleAddProduct}
//                 className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
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


import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    code: "",
    category: "",
    quantity: 0,
    price: 0,
    size: "",
    color: "",
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/");
        setInventory(
          response.data.products.map((product) => ({
            name: product.productName,
            code: product.productCode,
            category: product.category,
            size: product.size.join(", "),
            color: product.color.join(", "),
            quantity: product.quantity,
            price: product.price,
            status: product.status,
          }))
        );
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    const quantity = parseInt(newProduct.quantity);
    const price = parseFloat(newProduct.price);

    const productData = {
      productName: newProduct.name.trim(),
      productCode: newProduct.code.trim(),
      category: newProduct.category.trim(),
      price,
      quantity,
      shopId: "vaibhav-motos-a6f540",
      size: newProduct.size.split(",").map((s) => s.trim()),
      color: newProduct.color.split(",").map((c) => c.trim()),
      shopId: "vaibhav-motos-a6f540",

    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/create",
        productData
      );

      if (response.status === 201 || response.status === 200) {
        const createdProduct = response.data.product;

        setInventory((prev) => [
          ...prev,
          {
            name: createdProduct.productName,
            code: createdProduct.productCode,
            category: createdProduct.category,
            size: createdProduct.size.join(", "),
            color: createdProduct.color.join(", "),
            quantity: createdProduct.quantity,
            price: createdProduct.price,
            status: createdProduct.status,
          },
        ]);

        setShowModal(false);
        setNewProduct({
          name: "",
          code: "",
          category: "",
          quantity: 0,
          price: 0,
          size: "",
          color: "",
        });
      }
    } catch (error) {
      if (
        error?.response?.data?.message ===
        "Product with this code already exists for the shop"
      ) {
        alert("This product code already exists for the shop.");
      } else {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-500">Inventory</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.code}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.size}</td>
                <td className="px-4 py-2">{product.color}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">₹{product.price}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      product.status === "In Stock"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="code"
              value={newProduct.code}
              onChange={handleInputChange}
              placeholder="Product Code"
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="size"
              value={newProduct.size}
              onChange={handleInputChange}
              placeholder="Sizes (comma separated, e.g., S, M, L)"
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="color"
              value={newProduct.color}
              onChange={handleInputChange}
              placeholder="Colors (comma separated, e.g., Red, Blue)"
              className="w-full mb-6 px-4 py-2 border rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-cyan-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

