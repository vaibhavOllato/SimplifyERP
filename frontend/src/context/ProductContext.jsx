import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const shopId = sessionStorage.getItem("shopId");
        if (!shopId) return;

        const response = await axios.get(
          `${apiUrl}/products/by-shop/${shopId}`
        );
        const products = response.data.products;
        setTotalProducts(products.length);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    };

    fetchTotalProducts();
  }, []); // Runs once on context init

  return (
    <ProductContext.Provider value={{ totalProducts, setTotalProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
