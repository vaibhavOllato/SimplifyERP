// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <section className="bg-gray-50 pt-24 pb-16">
//       <div className="container mx-auto px-4 text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-500 leading-tight mb-4">
//         Run Your Business Like a Pro – <br /> with <span className="text-cyan-600">  SimplifyERP.</span>
//         </h1>

     
//         <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
//           A powerful ERP system to manage your inventory, sales, and customers — all in one place.
//         </p>
//         <div className="mt-8 flex justify-center gap-4">
//           <Link
//             to="/register"
//             className="px-6 py-3 bg-cyan-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
//           >
//             Get Started
//           </Link>
//           <Link
//             to="/features"
//             className="px-6 py-3 border border-cyan-600 text-cyan-600 rounded-md text-sm font-medium hover:bg-blue-50 transition"
//           >
//             Explore Features
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import { Link } from "react-router-dom";
import img1 from "../../assets/hero-1.png";     
import img2 from "../../assets/hero-2.png";       

const Hero = () => {
  return (
    <section className="bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {/* Left: Text */}
        <div className="md:w-1/2 text-center md:text-left animate-fade-in-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 leading-tight mb-4">
            Run Your Business Like a Pro – <br />
            with <span className="text-cyan-600">SimplifyERP.</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-lg">
            A powerful ERP system to manage your inventory, sales, and customers — all in one place.
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-cyan-600 text-white rounded-md text-sm font-medium hover:bg-cyan-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="px-6 py-3 border border-cyan-600 text-cyan-600 rounded-md text-sm font-medium hover:bg-cyan-50 transition"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Right: Images */}
        <div className="md:w-1/2 relative flex justify-center animate-fade-in-right">
          <img
            src={img2}
            alt="Background"
            className="w-64 h-64 md:w-72 md:h-72 rounded-lg shadow-md object-cover"
          />
          <img
            src={img1}
            alt="Overlay"
            className="absolute top-[-20px] left-10 w-52 h-52 md:w-64 md:h-64 rounded-lg shadow-lg object-cover border-4 border-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
