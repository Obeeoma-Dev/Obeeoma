import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/**
 * Dummy chart data (Weeks vs Usage)
 */
const chartData = [
  { week: "Week 1", usage: 3000 },
  { week: "Week 2", usage: 3200 },
  { week: "Week 3", usage: 3400 },
  { week: "Week 4", usage: 3600 },
  { week: "Week 5", usage: 3800 },
  { week: "Week 6", usage: 4200 },
];

/**
 * Dashboard Component
 */
const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-green-600">Obeooma</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              "Overview",
              "Organizations",
              "Client Engagement",
              "AI Management",
              "Hotline Activity",
              "Subscriptions",
              "Reports",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                    item === "Overview"
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            Settings
          </button>
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md mt-2">
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">System Adim Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600">
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                2
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">System Administrator</span>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-500 text-sm">Total Organizations</p>
              <p className="text-2xl font-bold">42</p>
              <p className="text-green-500 text-xs">+3 this month</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-500 text-sm">Total Clients</p>
              <p className="text-2xl font-bold">1,284</p>
              <p className="text-green-500 text-xs">+124 this month</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-500 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold">$25,800</p>
              <p className="text-green-500 text-xs">+5.3% this month</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-500 text-sm">Hotline Calls Today</p>
              <p className="text-2xl font-bold">42</p>
              <p className="text-red-500 text-xs">+8% vs yesterday</p>
            </div>
          </div>

          {/* Chart section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-700 font-medium mb-4">
              Weekly Platform Usage
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-700 font-medium mb-4">
              Recent Activities
            </h3>
            <ul className="divide-y divide-gray-200">
              {[
                {
                  type: "New Organization",
                  detail: "Wellness Center Inc. joined the platform",
                  time: "2 hours ago",
                },
                {
                  type: "AI Recommendation",
                  detail: "New anxiety resource added with 92% effectiveness",
                  time: "3 hours ago",
                },
                {
                  type: "Hotline Activity",
                  detail: "Spike in call volume (32% increase)",
                  time: "5 hours ago",
                },
                {
                  type: "Patient Engagement",
                  detail: "Monthly engagement up by 15%",
                  time: "1 day ago",
                },
                {
                  type: "Subscription",
                  detail: "University Counseling Center upgraded to Premium",
                  time: "1 day ago",
                },
              ].map((item, idx) => (
                <li key={idx} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{item.type}</p>
                    <p className="text-sm text-gray-500">{item.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Organizations</p>
              <p className="text-2xl font-bold">42</p>
              <a href="#" className="text-green-500 text-sm">
                View all organizations →
              </a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">AI Recommendations</p>
              <p className="text-2xl font-bold">1,245</p>
              <a href="#" className="text-green-500 text-sm">
                View AI analytics →
              </a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Hotline</p>
              <p className="text-2xl font-bold">324</p>
              <a href="#" className="text-green-500 text-sm">
                View hotline activity →
              </a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Subscriptions</p>
              <p className="text-2xl font-bold">$25.8K</p>
              <a href="#" className="text-green-500 text-sm">
                View subscription details →
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
