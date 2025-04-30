import React from 'react';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'Go to your account settings and click on "Reset Password". Follow the instructions sent to your email.'
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach us via the contact form below or email us at support@example.com.'
  },
  {
    question: 'Can I update my shop information?',
    answer: 'Yes, navigate to your dashboard and go to Shop Settings to update your shop details.'
  }
];

const HelpCenter = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-500 mb-8">Help Center</h1>

      {/* Search Bar */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search help articles..."
          className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg text-cyan-700">{faq.question}</h3>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-cyan-50 border border-cyan-200 p-6 rounded-lg shadow-sm text-center">
        <h3 className="text-xl font-semibold text-cyan-800 mb-2">Still need help?</h3>
        <p className="text-gray-700 mb-4">Contact our support team and we’ll get back to you shortly.</p>
        <button className="bg-cyan-600 text-white px-5 py-2 rounded hover:bg-cyan-700 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpCenter;
