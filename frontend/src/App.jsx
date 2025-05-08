import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Layout from "./layouts/Layout"; // Import the Layout component
import InventoryPage from "./pages/InventoryPage";
import Setting from "./pages/Setting";
// import Orders from './pages/Orders';
import OrderPage from "./pages/OrderPage";
import Settings from "./pages/Setting";
import CustomerListPage from "./pages/CustomerListPage";
import { NotificationProvider } from "./context/NotificationProvider";
import { AuthProvider } from "./context/AuthContext";
import ShopPage from "./pages/ShopPage";
import ShopRegisterForm from "./pages/ShopRegisterForm";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import HelpCenter from "./pages/HelpCenter";
import { ProductProvider } from "./context/ProductContext";
import VendorsList from "./pages/purchasesItems/VendorsList";
import PaymentCredits from "./pages/purchasesItems/PaymentCredits";
import PurchasesOrders from "./pages/purchasesItems/PurchasesOrders";
import PurchasesReceived from "./pages/purchasesItems/PurchasesReceived";
import Bills from "./pages/purchasesItems/Bills";
// import { ShopProvider } from './context/ShopContext';

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ProductProvider>
          <Routes>
            {/* Landing Page does not need Layout, so we keep it separate */}
            <Route path="/" element={<LandingPage />} />

            {/* For Login and Register pages, use them separately without the layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />

            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="setting" element={<Settings />} />
              <Route path="orders" element={<OrderPage />} />
              <Route path="customers" element={<CustomerListPage />} />
              <Route path="my-shop" element={<ShopPage />} />
              <Route path="shop-register-form" element={<ShopRegisterForm />} />
              <Route path="helpCenter" element={<HelpCenter />} />

              <Route path="vendors" element={<VendorsList />} />
              <Route path="payment-credits" element={<PaymentCredits />} />
              <Route path="purchase-orders" element={<PurchasesOrders />} />
              <Route
                path="purchases-received"
                element={<PurchasesReceived />}
              />
              <Route path="bills" element={<Bills />} />
            </Route>
          </Routes>
        </ProductProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
