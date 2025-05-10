// import React from "react";

// const Loader = ({ message = "Loading, please wait..." }) => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white text-center px-4">
//       {/* Glowing Spinner */}
//       <div className="relative w-16 h-16">
//         <div className="absolute inset-0 rounded-full border-4 border-cyan-600 animate-spin border-t-transparent"></div>
//         <div className="absolute inset-0 rounded-full border-4 border-cyan-300 blur-sm opacity-50 animate-ping"></div>
//       </div>

//       {/* Optional App Name / Branding */}
//       <h1 className="mt-6 text-xl font-bold text-cyan-700 tracking-wide animate-pulse">
//         SimplifyERP
//       </h1>

//       {/* Loading Message */}
//       <p className="mt-2 text-cyan-600 text-sm font-medium animate-pulse">
//         {message}
//       </p>
//     </div>
//   );
// };

// export default Loader;



import React from "react";

const Loader = ({ message = "Loading your dashboard..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      {/* 3D Style Glowing Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-cyan-600 border-r-cyan-400 border-b-cyan-300 border-l-transparent shadow-xl shadow-cyan-200"></div>
        <div className="absolute inset-2 bg-white rounded-full shadow-inner"></div>
      </div>

      {/* Brand or App Title */}
      <h1 className="mt-8 text-3xl font-extrabold tracking-wide text-cyan-700 drop-shadow-md">
        SimplifyERP
      </h1>

      {/* Loading Message */}
      <p className="mt-2 text-sm text-gray-600 font-medium tracking-wide animate-pulse">
        {message}
      </p>

      {/* Optional subtle loader bar */}
      <div className="w-40 mt-6 h-1 rounded-full bg-cyan-100 overflow-hidden">
        <div className="h-full bg-cyan-500 animate-loaderBar rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
