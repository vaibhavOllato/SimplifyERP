import { FaHandsHelping, FaBullseye, FaRocket } from "react-icons/fa";

const missionPoints = [
  {
    title: "Empower Business Owners",
    icon: <FaHandsHelping size={36} />,
    desc: "We empower business owners with easy-to-use tools, enabling them to simplify operations and enhance growth.",
  },
  {
    title: "Innovate Continuously",
    icon: <FaBullseye size={36} />,
    desc: "Our commitment to continuous innovation provides you with the best tools to stay ahead of the competition.",
  },
  {
    title: "Build Trust & Security",
    icon: <FaRocket size={36} />,
    desc: "We build long-lasting relationships by delivering secure and reliable ERP solutions for your business.",
  },
];

const Mission = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-500 mb-6">
          Our <span className="text-cyan-600">Mission</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-14">
          At SimplifyERP, our mission is to change how businesses operate — by providing powerful tools that foster growth, innovation, and trust.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {missionPoints.map((point, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <div className="w-20 h-20 mb-6 mx-auto flex items-center justify-center text-white bg-purple-900 rounded-full shadow-xl">
                {point.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{point.title}</h3>
              <p className="text-white text-sm">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
