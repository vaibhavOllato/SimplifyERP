import React, { useState, useEffect } from "react";
import axios from "axios";

const BillGenerator = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [shopId, setShopId] = useState("");
  const [products, setProducts] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);

  useEffect(() => {
    const storedShopId =
      sessionStorage.getItem("shopId");
    setShopId(storedShopId);
  }, []);

  const totalAmount = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleCustomerChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, e) => {
    const updated = [...products];
    updated[index][e.target.name] =
      e.target.name === "quantity" || e.target.name === "price"
        ? Number(e.target.value)
        : e.target.value;
    setProducts(updated);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: 1, price: 0 }]);
  };

  const removeProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      customerData,
      shopId,
      products,
      totalAmount,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bills/create-bill",
        data
      );
      alert("✅ Bill generated successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to generate bill.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 min-h-screen">
      {/* Left Side: Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-md"
      >
        <h2 className="text-xl font-bold mb-4 text-blue-700">Customer Info</h2>
        {["name", "phone", "email", "address"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={customerData[field]}
            onChange={handleCustomerChange}
            placeholder={`Customer ${field}`}
            className="w-full mb-3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          />
        ))}

        <h2 className="text-xl font-bold mt-6 mb-4 text-blue-700">Products</h2>
        {products.map((product, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 mb-2">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Product name"
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Qty"
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Price"
              className="p-2 border rounded"
              required
            />
            {products.length > 1 && (
              <button
                type="button"
                onClick={() => removeProduct(index)}
                className="text-red-500 text-sm col-span-3"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addProduct}
          className="mt-2 mb-4 text-cyan-700 hover:underline"
        >
          + Add Product
        </button>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded mt-4 font-semibold"
        >
          Generate Bill
        </button>
      </form>

      {/* Right Side: Bill Preview */}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-md print:p-0 print:shadow-none">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-700">Bill Preview</h2>
          <button
            onClick={handlePrint}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1 rounded print:hidden"
          >
            🖨️ Print 
          </button>
        </div>
        <p>
          <strong>Shop ID:</strong> {shopId}
        </p>
        <p>
          <strong>Customer:</strong> {customerData.name}
        </p>
        <p>
          <strong>Phone:</strong> {customerData.phone}
        </p>
        <p>
          <strong>Email:</strong> {customerData.email}
        </p>
        <p>
          <strong>Address:</strong> {customerData.address}
        </p>

        <hr className="my-4" />

        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Product</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">₹{item.price}</td>
                <td className="border px-2 py-1">
                  ₹{item.quantity * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="my-4" />
        <p className="text-xl font-semibold text-right">
          Total: ₹{totalAmount}
        </p>
      </div>
    </div>
  );
};

export default BillGenerator;
