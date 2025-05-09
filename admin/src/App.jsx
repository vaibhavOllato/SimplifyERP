import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ManageShops from "./pages/ManageShops";
import ManageUsers from "./pages/ManageUsers";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import { NotificationProvider } from "./context/NotificationProvider";
import ApproveShop from "./pages/ApproveShop";
import NewShopNotification from "./pages/NewShopNotification";


function App() {
  return (
    <NotificationProvider>
    <Router>
      <Routes>
        {/* Default redirect or fallback */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        <Route path="/admin/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-shops" element={<ManageShops />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="approveShop" element={<ApproveShop />} />
          <Route path="newNotifyShop" element={<NewShopNotification />} />
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </Router>
    </NotificationProvider>
  );
}

export default App;
