import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
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
        const shopId = sessionStorage.getItem("shopId");
        const response = await axios.get(
          `${apiUrl}/products/by-shop/${shopId}`
        );
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
      // shopId: "vaibhav-motos-a6f540",
      shopId: sessionStorage.getItem("shopId"),
      size: newProduct.size.split(",").map((s) => s.trim()),
      color: newProduct.color.split(",").map((c) => c.trim()),
      // shopId: "vaibhav-motos-a6f540",
    };

    try {
      const response = await axios.post(
        `${apiUrl}/products/create`,
        productData
      );

      if (response.status === 201 || response.status === 200) {
        const createdProduct = response.data.product;
        console.log("Product creation response:", response.data);

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-500">Inventory</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-md shadow transition duration-200"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-cyan-50">
            <tr>
              {[
                "Sr. No.",
                "Product Name",
                "Code",
                "Category",
                "Size",
                "Color",
                "Quantity",
                "Price",
                "Status",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventory.map((product, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="px-4 py-2">{product.code}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.size}</td>
                <td className="px-4 py-2">{product.color}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  ₹{product.price}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Add New Product
            </h2>

            {[
              { name: "name", placeholder: "Product Name" },
              { name: "code", placeholder: "Product Code" },
              { name: "category", placeholder: "Category" },
              { name: "quantity", placeholder: "Quantity", type: "number" },
              { name: "price", placeholder: "Price", type: "number" },
              {
                name: "size",
                placeholder: "Sizes (comma separated, e.g., S, M, L)",
              },
              {
                name: "color",
                placeholder: "Colors (comma separated, e.g., Red, Blue)",
              },
            ].map(({ name, placeholder, type = "text" }) => (
              <input
                key={name}
                type={type}
                name={name}
                value={newProduct[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            ))}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition"
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
