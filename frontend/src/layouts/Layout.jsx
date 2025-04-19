// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { useState } from "react";
// import { Outlet } from "react-router-dom"; // Used for rendering content based on route

// const Layout = () => {
//   const [selected, setSelected] = useState("Dashboard");

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar onSelect={setSelected} selected={selected} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header />
        
//         {/* Content based on the route */}
//         <main className="flex-1 overflow-y-auto p-4">
//           <Outlet /> {/* Renders the matched route's component */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;



import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom"; // This will render the specific page content based on the route

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        {/* Content rendered based on route */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet /> {/* This will display the content of the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
