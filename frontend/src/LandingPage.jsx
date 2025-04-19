import React from "react";
import Footer from "./components/landing/Footer";
import FutureIncrements from "./components/landing/FutureIncrements";
import GettingStarted from "./components/landing/GettingStarted";
import Hero from "./components/landing/Hero";
import Mission from "./components/landing/Mission";
import Navbar from "./components/landing/Navbar";
import TryItNow from "./components/landing/TryItNow";
import WhyUs from "./components/landing/WhyUs";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        {/* All Sections */}
        <Hero />
        <FutureIncrements />
        <WhyUs />
        <GettingStarted />
        <Mission />
        <TryItNow />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
