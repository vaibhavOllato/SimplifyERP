const ReportsAnalytics = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Total Shops</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">38</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Active Users</h2>
            <p className="text-3xl font-bold text-green-500 mt-2">125</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Monthly Revenue</h2>
            <p className="text-3xl font-bold text-blue-500 mt-2">₹75,000</p>
          </div>
        </div>
  
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-2">
            <li className="border-b pb-2">✔️ Shop "Style Zone" registered - 2 hours ago</li>
            <li className="border-b pb-2">🛠 User "Amit" updated shop details - 4 hours ago</li>
            <li className="border-b pb-2">📈 Revenue report generated - Yesterday</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default ReportsAnalytics;
  