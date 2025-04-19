import { Link } from "react-router-dom";

const TryItNow = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-cyan-50 to-white py-24 px-6 overflow-hidden">
      {/* Glass Background Box with Cyan Tint */}
      <div className="relative z-10 max-w-5xl mx-auto bg-cyan-600 border border-cyan-100 rounded-3xl shadow-2xl px-10 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
          Boost Your Business with <span className="text-white/90">SimplifyERP</span>
        </h2>
        <p className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl mx-auto">
          Take control of your operations with an all-in-one ERP system designed to streamline, automate, and scale your business — no matter the industry.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-cyan-600 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-cyan-100"
          >
            Try it Now
          </Link>
          <Link
            to="/features"
            className="px-8 py-4 text-white border-2 border-white rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white/10"
          >
            Explore Features
          </Link>
        </div>
      </div>

      {/* Fancy Blobs in BG */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob -z-10"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>
    </section>
  );
};

export default TryItNow;
