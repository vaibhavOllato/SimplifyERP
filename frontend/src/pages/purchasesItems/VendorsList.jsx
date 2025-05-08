import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  BuildingStorefrontIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useNotification } from "../../context/NotificationProvider";

const VendorsList = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // const [shopId, setShopId] = useState(() => sessionStorage.getItem("shopId"));

  const { triggerNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shopId = sessionStorage.getItem("shopId");

  // Move fetchVendors outside of useEffect
  const fetchVendors = async () => {
    try {
      const response = await axios.post(`${apiUrl}/vendors/shop`, { shopId });
      // console.log(shopId);
      console.log("shopId before fetch:", shopId);

      if (Array.isArray(response.data)) {
        setVendors(response.data);
      } else if (
        response.data.vendors &&
        Array.isArray(response.data.vendors)
      ) {
        setVendors(response.data.vendors);
      } else {
        setError("Unexpected response format");
        triggerNotification("Unexpected vendor response format", "warning");
      }
    } catch (err) {
      setError(err.message);
      triggerNotification("Failed to fetch vendors", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch vendors on mount (initial data fetching)
  useEffect(() => {
    if (shopId) {
      fetchVendors();
    }
  }, [shopId]);

  const onSubmit = async (data) => {
    // Convert comma-separated values into arrays
    data.shopId = shopId;
    data.operations.inventoryTypes = data.operations.inventoryTypes
      .split(",")
      .map((s) => s.trim());
    data.operations.shippingMethods = data.operations.shippingMethods
      .split(",")
      .map((s) => s.trim());

    try {
      // Send the data to the backend to register the vendor
      await axios.post(`${apiUrl}/vendors/register-vendor`, data);

      // Close the modal and reset the form
      setOpen(false);
      reset();

      // Refetch the vendor list after registration
      fetchVendors(); // This will reload the vendors list
      triggerNotification("Vendor registered successfully", "success");
    } catch (error) {
      console.error("Vendor registration failed:", error);
      triggerNotification("Vendor registration failed", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">Loading vendors...</div>
    );
  if (error)
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {!shopId ? (
        <p className="text-red-500 text-lg">Please register your shop first.</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-cyan-700 mb-8 flex justify-between items-center">
            <span>Vendors Directory</span>

            <button
              onClick={() => setOpen(true)}
              className="bg-cyan-600 text-white text-xl px-4 py-1 rounded"
            >
              Add Vendor
            </button>
          </h1>

          {open && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
                <h2 className="text-2xl font-bold mb-4 text-cyan-600">
                  Register Vendor
                </h2>
                <button
                  className="absolute top-2 right-4 text-gray-600 text-xl hover:text-red-600"
                  onClick={() => setOpen(false)}
                >
                  &times;
                </button>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
                >
                  {/* Basic Info */}
                  <input type="hidden" {...register("shopId")} value={shopId} />
                  <input
                    type="text"
                    {...register("vendorName")}
                    placeholder="Vendor Name"
                    className="border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    {...register("businessName")}
                    placeholder="Business Name"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className="border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    {...register("phone")}
                    placeholder="Phone"
                    className="border rounded px-3 py-2"
                    required
                  />

                  {/* Address */}
                  <input
                    {...register("address.street")}
                    placeholder="Street"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("address.city")}
                    placeholder="City"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("address.state")}
                    placeholder="State"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("address.postalCode")}
                    placeholder="Postal Code"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("address.country")}
                    placeholder="Country"
                    className="border rounded px-3 py-2"
                  />

                  {/* Business Details */}
                  <input
                    {...register("businessDetails.businessType")}
                    placeholder="Business Type"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("businessDetails.category")}
                    placeholder="Category"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("businessDetails.gstin")}
                    placeholder="GSTIN"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("businessDetails.panNumber")}
                    placeholder="PAN Number"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("businessDetails.registrationNumber")}
                    placeholder="Registration Number"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    {...register("businessDetails.yearsInOperation")}
                    placeholder="Years in Operation"
                    className="border rounded px-3 py-2"
                  />

                  {/* Banking */}
                  <input
                    {...register("banking.accountHolderName")}
                    placeholder="Account Holder Name"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("banking.accountNumber")}
                    placeholder="Account Number"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("banking.ifscCode")}
                    placeholder="IFSC Code"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("banking.bankName")}
                    placeholder="Bank Name"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("banking.branchName")}
                    placeholder="Branch Name"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("banking.upiId")}
                    placeholder="UPI ID"
                    className="border rounded px-3 py-2"
                  />

                  {/* Operations */}
                  <input
                    {...register("operations.inventoryTypes")}
                    placeholder="Inventory Types (comma-separated)"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("operations.shippingMethods")}
                    placeholder="Shipping Methods (comma-separated)"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("operations.paymentTerms")}
                    placeholder="Payment Terms"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("operations.deliveryTimeline")}
                    placeholder="Delivery Timeline"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("operations.returnPolicy")}
                    placeholder="Return Policy"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    {...register("operations.supportContact")}
                    placeholder="Support Contact"
                    className="border rounded px-3 py-2"
                  />

                  <div className="md:col-span-2 mt-4">
                    <button
                      type="submit"
                      className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition"
                    >
                      Register Vendor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {vendors.length === 0 ? (
            <p className="text-center text-gray-500">
              No vendors found for this shop.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vendors.map((vendor) => (
                <div
                  key={vendor._id}
                  className="bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BuildingStorefrontIcon className="h-6 w-6 text-cyan-600" />
                      <h2 className="text-xl font-semibold text-gray-800">
                        {vendor.vendorName}
                      </h2>
                    </div>

                    <div className="mb-4 space-y-1 text-sm text-gray-700">
                      <p className="flex items-center gap-2">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-500" />
                        {vendor.vendorId}
                      </p>
                      <p className="flex items-center gap-2">
                        <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                        {vendor.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <PhoneIcon className="h-5 w-5 text-gray-500" />
                        {vendor.phone}
                      </p>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <h3 className="font-semibold text-cyan-600 mb-1">
                        Business
                      </h3>
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {vendor.businessName}
                      </p>
                      <p>
                        <span className="font-medium">Type:</span>{" "}
                        {vendor.businessDetails.businessType}
                      </p>
                      <p>
                        <span className="font-medium">Category:</span>{" "}
                        {vendor.businessDetails.category}
                      </p>
                      <p>
                        <span className="font-medium">GSTIN:</span>{" "}
                        {vendor.businessDetails.gstin}
                      </p>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <h3 className="font-semibold text-cyan-600 mb-1">
                        Address
                      </h3>
                      <p>
                        {vendor.address.street}, {vendor.address.city}
                      </p>
                      <p>
                        {vendor.address.state} - {vendor.address.postalCode}
                      </p>
                      <p>{vendor.address.country}</p>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <h3 className="font-semibold text-cyan-600 mb-1">
                        Banking
                      </h3>
                      <p>
                        <span className="font-medium">Bank:</span>{" "}
                        {vendor.banking.bankName}
                      </p>
                      <p>
                        <span className="font-medium">Holder:</span>{" "}
                        {vendor.banking.accountHolderName}
                      </p>
                      <p>
                        <span className="font-medium">Acc No:</span>{" "}
                        {vendor.banking.accountNumber}
                      </p>
                      <p>
                        <span className="font-medium">IFSC:</span>{" "}
                        {vendor.banking.ifscCode}
                      </p>
                    </div>

                    <div className="text-sm text-gray-600">
                      <h3 className="font-semibold text-cyan-600 mb-1">
                        Operations
                      </h3>
                      <p>
                        <span className="font-medium">Inventory:</span>{" "}
                        {vendor.operations.inventoryTypes.join(", ")}
                      </p>
                      <p>
                        <span className="font-medium">Shipping:</span>{" "}
                        {vendor.operations.shippingMethods.join(", ")}
                      </p>
                      <p>
                        <span className="font-medium">Timeline:</span>{" "}
                        {vendor.operations.deliveryTimeline}
                      </p>
                      <p>
                        <span className="font-medium">Return:</span>{" "}
                        {vendor.operations.returnPolicy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VendorsList;
