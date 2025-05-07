import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useNotification } from "../context/NotificationProvider";
import { useNavigate } from "react-router-dom";

const ShopRegisterForm = () => {
  const { triggerNotification } = useNotification();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taxRates: [{ category: "", rate: "" }],
      paymentMethods: [],
      secondaryCategories: [],
    },
    mode: "onSubmit",
  });

  const {
    fields: taxFields,
    append: appendTaxRate,
    remove: removeTaxRate,
  } = useFieldArray({
    control,
    name: "taxRates",
  });

  // if (sessionStorage.getItem("shopRegistered") === "true") {
  //   return (
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
  //         <img
  //           src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
  //           alt="Registered"
  //           className="w-20 h-20 mx-auto mb-4"
  //         />
  //         <h2 className="text-2xl font-bold text-cyan-600 mb-2">
  //           Shop Already Registered
  //         </h2>
  //         <p className="text-gray-600">
  //           You have already registered your shop. Thank you!
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const userID = userProfile?.userId;

    const payload = { ...data, userId: userID };
    try {
      await axios.post(`${apiUrl}/shops/register`, payload, {
        withCredentials: true,
      });
      triggerNotification({
        type: "success",
        message: "Shop registered successfully!",
      });
      sessionStorage.setItem("shopRegistered", "true");
      reset();

      // Redirect after a 3-second delay
      setTimeout(() => {
        navigate("/my-shop");
      }, 3000);
    } catch (err) {
      console.error("Error registering shop:", err);
      // triggerNotification("Error registering shop");
      triggerNotification({
        type: "error",
        message: "Error registering shop",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
          Shop Registration
        </h2>

        {/* <input {...register('userId')} defaultValue="" type="hidden" /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("shopName", { required: true })}
            placeholder="Shop Name"
            className="input"
          />
          <input
            {...register("shopType", { required: true })}
            placeholder="Shop Type"
            className="input"
          />
          <input
            {...register("ownerName")}
            placeholder="Shop owner name"
            className="input"
          />
          <input
            {...register("address")}
            placeholder="Address"
            className="input"
          />
          <input {...register("phone")} placeholder="Phone" className="input" />
          <input {...register("email")} placeholder="Email" className="input" />
          <input
            {...register("website")}
            placeholder="Website"
            className="input"
          />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            {...register("socialLinks.instagram")}
            placeholder="Instagram URL"
            className="input"
          />
          <input
            {...register("socialLinks.facebook")}
            placeholder="Facebook URL"
            className="input"
          />
          <input
            {...register("socialLinks.twitter")}
            placeholder="Twitter URL"
            className="input"
          />
        </div> */}

        {/* <div className="grid grid-cols-2 gap-4">
          <input
            {...register("location.lat", { valueAsNumber: true })}
            placeholder="Latitude"
            className="input"
          />
          <input
            {...register("location.lng", { valueAsNumber: true })}
            placeholder="Longitude"
            className="input"
          />
        </div> */}

        <div className="grid grid-cols-2 gap-4">
          <input {...register("openingTime")} type="time" className="input" />
          <input {...register("closingTime")} type="time" className="input" />
        </div>

        {/* <div>
          <label className="block font-semibold mb-1">Payment Methods</label>
          <div className="flex gap-4 flex-wrap">
            {["Cash", "Card", "UPI"].map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={method}
                  {...register("paymentMethods")}
                />
                {method}
              </label>
            ))}
          </div>
        </div> */}

        <div>
          <label className="block font-semibold mb-1">
            Secondary Categories
          </label>
          <input
            {...register("secondaryCategories")}
            placeholder="e.g., Snacks,Beverages"
            className="input"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">GST Number</label>
          <input
            {...register("gstNumber")}
            placeholder="GST Number"
            className="input"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Tax Rates</label>
          {taxFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 mb-2">
              <input
                {...register(`taxRates.${index}.category`)}
                placeholder="Category"
                className="input"
              />
              <input
                {...register(`taxRates.${index}.rate`, { valueAsNumber: true })}
                placeholder="Rate %"
                className="input"
                type="number"
              />
              <button
                type="button"
                onClick={() => removeTaxRate(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendTaxRate({ category: "", rate: "" })}
            className="text-blue-500"
          >
            + Add Tax Rate
          </button>
        </div>

        {/* <div>
          <label className="block font-semibold mb-2">Manager Details</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              {...register("manager.name")}
              placeholder="Manager Name"
              className="input"
            />
            <input
              {...register("manager.phone")}
              placeholder="Manager Phone"
              className="input"
            />
            <input
              {...register("manager.email")}
              placeholder="Manager Email"
              className="input"
            />
          </div>
        </div> */}

        {/* <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("verified")} />
            Verified
          </label>
          <select {...register("status")} className="input">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div> */}

        <button
          type="submit"
          className="mt-6 w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
        >
          {/* Register Shop */}
          {isSubmitting ? "Registering..." : "Register Shop"}
        </button>
      </form>
    </div>
  );
};

export default ShopRegisterForm;
