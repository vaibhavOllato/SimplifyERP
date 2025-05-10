import { useState } from "react";
import { lazy, Suspense } from "react";

// Lazy load the individual components
const VendorsList = lazy(() => import("../pages/purchasesItems/VendorsList"));
const PurchasesOrders = lazy(() => import("../pages/purchasesItems/PurchasesOrders"));
const PurchasesReceived = lazy(() => import("../pages/purchasesItems/PurchasesReceived"));
const Bills = lazy(() => import("../pages/purchasesItems/Bills"));

const PurchasesPage = () => {
  const [activeTab, setActiveTab] = useState("vendors");

  const tabs = [
    { name: "Vendors", value: "vendors" },
    { name: "Purchase Orders", value: "purchaseOrders" },
    { name: "Purchases Received", value: "purchasesReceived" },
    { name: "Bills", value: "bills" },
  ];

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === tab.value
                ? "bg-cyan-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <Suspense fallback={<div>Loading...</div>}>
          {activeTab === "vendors" && <VendorsList />}
          {activeTab === "purchaseOrders" && <PurchasesOrders />}
          {activeTab === "purchasesReceived" && <PurchasesReceived />}
          {activeTab === "bills" && <Bills />}
        </Suspense>
      </div>
    </div>
  );
};

export default PurchasesPage;
