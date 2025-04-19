// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import LandingPage from './LandingPage'; 
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard';

// const App = () => {
//   return (
//     <Routes>
//       {/* Define your routes here */}
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//     </Routes>
//   );
// };

// export default App;



import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Layout from './layouts/Layout'; // Import the Layout component
import InventoryPage from './pages/InventoryPage';
import Setting from './pages/Setting';
// import Orders from './pages/Orders';
import OrderPage from './pages/OrderPage';
import Settings from './pages/Setting';
import CustomerListPage from './pages/CustomerListPage';

const App = () => {
  return (
    <Routes>
      {/* Landing Page does not need Layout, so we keep it separate */}
      <Route path="/" element={<LandingPage />} />
      
      {/* For Login and Register pages, use them separately without the layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Apply the layout to Dashboard and any other pages that require Sidebar and Header */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="setting" element={<Settings />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="customers" element={<CustomerListPage />} />
        {/* <Route path="orders" element={<Orders />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
