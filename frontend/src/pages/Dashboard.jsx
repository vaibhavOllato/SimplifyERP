// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  ShoppingBag,
  Truck,
  Users,
  BarChart,
  PieChart,
} from "lucide-react"; // Icons
import { Line, Pie, Bar } from "react-chartjs-2"; // Import chart components
import {
  Chart as ChartJS,
  ArcElement,
  Filler,
  Tooltip,
  CategoryScale,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { useProductContext } from "../context/ProductContext";

// Register necessary chart components
ChartJS.register(
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale, // Register CategoryScale for x-axis
  LinearScale, // Register LinearScale for y-axis
  PointElement, // Register PointElement for the Line chart
  LineElement, // Register LineElement for line chart elements
  BarElement // Register BarElement for bar charts
);

const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { totalProducts } = useProductContext();

    // Just for debug: check value
    console.log("Total Products from Context:", totalProducts);

    
  const stats = [
    {
      title: "Total Stocks",
      value: totalProducts,
      icon: <Package size={32} className="text-cyan-600" />,
    },
    {
      title: "Total Orders",
      value: 320,
      icon: <ShoppingBag size={32} className="text-cyan-600" />,
    },
    {
      title: "Total Delivered",
      value: 280,
      icon: <Truck size={32} className="text-cyan-600" />,
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: <Users size={32} className="text-cyan-600" />,
    },
  ];

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const shopId = sessionStorage.getItem("shopId");

        if (!shopId) {
          console.error("Shop ID is not available in session storage.");
          return;
        }

        const response = await axios.get(
         `${apiUrl}/customers/counts-by-shop`,
          {
            params: {
              shopId: shopId, // Pass the dynamic shopId from session
            },
          }
        );

        // Ensure the response format is correct
        const customerCount =
          response.data.shopCustomerCounts?.[0]?.totalCustomers || 0;
        console.log("Customer count:", customerCount); // Verify the customer count

        setTotalCustomers(customerCount); // Set state with customer count
      } catch (error) {
        console.error("Error fetching customer count:", error);
      }
    };

    fetchCustomerCount();
  }, []);

  const additionalStats = [
    {
      title: "Order Overview",
      description: "Quick look at your order status.",
      icon: <BarChart size={32} className="text-cyan-600" />,
    },
    {
      title: "Sales Analytics",
      description: "View detailed sales statistics.",
      icon: <PieChart size={32} className="text-cyan-600" />,
    },
  ];

  // Dummy data for the charts
  const orderOverviewData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Date-wise labels
    datasets: [
      {
        label: "Orders",
        data: [50, 75, 80, 120, 95, 140, 160], // Dummy data for orders per month
        borderColor: "rgba(38, 182, 249, 1)",
        backgroundColor: "rgba(38, 182, 249, 0.2)",
        fill: true,
      },
    ],
  };

  const salesAnalyticsData = {
    labels: ["Electronics", "Clothing", "Food", "Home", "Toys"], // Sales categories
    datasets: [
      {
        data: [30, 40, 15, 10, 5], // Dummy sales data
        backgroundColor: [
          "#2cb0f5",
          "#f57c00",
          "#34a853",
          "#e4e4e4",
          "#fbbc05",
        ],
      },
    ],
  };

  // New dummy data for additional graphs
  const salesGraphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1500, 1800, 2000, 2500, 2700, 3200],
        borderColor: "rgba(0, 123, 255, 1)",
        backgroundColor: "rgba(0, 123, 255, 0.3)",
        fill: true,
      },
    ],
  };

  const purchaseAnalyticsData = {
    labels: ["Electronics", "Clothing", "Food", "Home", "Toys"],
    datasets: [
      {
        label: "Purchases",
        data: [20, 30, 15, 25, 10],
        backgroundColor: [
          "#2cb0f5",
          "#f57c00",
          "#34a853",
          "#e4e4e4",
          "#fbbc05",
        ],
        borderColor: ["#2cb0f5", "#f57c00", "#34a853", "#e4e4e4", "#fbbc05"],
        borderWidth: 1,
      },
    ],
  };

  // Sales Overview data
  const salesInfo = {
    totalSales: "$10,000",
    salesThisMonth: "$2,500",
    salesToday: "$300",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-500 mb-6">
        Dashboard Overview
      </h2>

      {/* Grid layout for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              {stat.icon}
              <h3 className="text-base font-semibold text-gray-600">
                {stat.title}
              </h3>
            </div>
            <p className="text-3xl font-bold text-cyan-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Sales Overview Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-5 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <BarChart size={32} className="text-cyan-600" />
          <h3 className="text-lg font-semibold text-gray-600">
            Sales Overview
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col justify-between">
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-3xl font-bold text-cyan-600">
              {salesInfo.totalSales}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-sm text-gray-600">Sales This Month</p>
            <p className="text-3xl font-bold text-cyan-600">
              {salesInfo.salesThisMonth}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-sm text-gray-600">Sales Today</p>
            <p className="text-3xl font-bold text-cyan-600">
              {salesInfo.salesToday}
            </p>
          </div>
        </div>
        <div className="h-48">
          <Bar
            data={salesGraphData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* Additional Stats for Order Overview, Sales Analytics, and New Graphs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-6">
        {/* Order Overview Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between max-h-96 overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            {additionalStats[0].icon}
            <h3 className="text-lg font-semibold text-gray-600">
              {additionalStats[0].title}
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            {additionalStats[0].description}
          </p>
          <div className="h-48">
            <Line
              data={orderOverviewData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Sales Analytics Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between max-h-96 overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            {additionalStats[1].icon}
            <h3 className="text-lg font-semibold text-gray-600">
              {additionalStats[1].title}
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            {additionalStats[1].description}
          </p>
          <div className="h-48">
            <Pie
              data={salesAnalyticsData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Purchase Analytics Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between max-h-96 overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <PieChart size={32} className="text-cyan-600" />
            <h3 className="text-lg font-semibold text-gray-600">
              Purchase Analytics
            </h3>
          </div>
          <Bar
            data={purchaseAnalyticsData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        {/* Top selling Products */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between max-h-96 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
            <PieChart size={32} className="text-cyan-600" />
            <h3 className="text-lg font-semibold text-gray-600">
              Top Selling Products
            </h3>
          </div>
          <table className="w-full text-left text-sm mt-0">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Product Name</th>
                <th className="py-2">Code</th>
                <th className="py-2">Orders</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                { name: "Wireless Headphones", code: "WH1001", orders: 120 },
                { name: "Cotton T-Shirt", code: "CT234", orders: 95 },
                { name: "Organic Apples", code: "OA321", orders: 75 },
                { name: "LED Bulb 12W", code: "LB12", orders: 60 },
                { name: "Action Figure", code: "AF786", orders: 55 },
                { name: "Action Figure", code: "AF786", orders: 55 },
                { name: "Action Figure", code: "AF786", orders: 55 },
                { name: "Action Figure", code: "AF786", orders: 55 },
                { name: "Action Figure", code: "AF786", orders: 55 },
              ].map((product, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.code}</td>
                  <td className="py-2 font-semibold text-cyan-600">
                    {product.orders}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
