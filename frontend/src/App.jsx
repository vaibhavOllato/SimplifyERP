import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationProvider";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import Loader from "./components/Loader";
import PurchasesPage from "./pages/PurchasesPage";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Layout = lazy(() => import("./layouts/Layout"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const Setting = lazy(() => import("./pages/Setting"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const CustomerListPage = lazy(() => import("./pages/CustomerListPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ShopRegisterForm = lazy(() => import("./pages/ShopRegisterForm"));
const ForgotPasswordPage = lazy(() => import("./components/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./components/ResetPasswordPage"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const VendorsList = lazy(() => import("./pages/purchasesItems/VendorsList"));
const PaymentCredits = lazy(() => import("./pages/purchasesItems/PaymentCredits"));
const PurchasesOrders = lazy(() => import("./pages/purchasesItems/PurchasesOrders"));
const PurchasesReceived = lazy(() => import("./pages/purchasesItems/PurchasesReceived"));
const Bills = lazy(() => import("./pages/purchasesItems/Bills"));

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ProductProvider>
          <Suspense fallback={<Loader message="Loading SimplifyERP..." />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

              <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="setting" element={<Setting />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="customers" element={<CustomerListPage />} />
                <Route path="my-shop" element={<ShopPage />} />
                <Route path="shop-register-form" element={<ShopRegisterForm />} />
                <Route path="helpCenter" element={<HelpCenter />} />
                <Route path="vendors" element={<VendorsList />} />
                <Route path="payment-credits" element={<PaymentCredits />} />
                <Route path="purchase-orders" element={<PurchasesOrders />} />
                <Route path="purchases-received" element={<PurchasesReceived />} />
                <Route path="bills" element={<Bills />} />
                <Route path="/purchases" element={<PurchasesPage />} />
              </Route>
            </Routes>
          </Suspense>
        </ProductProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
