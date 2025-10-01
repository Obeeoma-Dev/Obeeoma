import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { day: "Mon", minutes: 20 },
  { day: "Tue", minutes: 35 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 45 },
  { day: "Fri", minutes: 18 },
  { day: "Sat", minutes: 33 },
  { day: "Sun", minutes: 28 },
];

const moodTrend = [
  { week: "Week 1", mood: 2 },
  { week: "Week 2", mood: 1 },
  { week: "Week 3", mood: 3 },
  { week: "Week 4", mood: 4 },
  { week: "Week 5", mood: 5 },
  { week: "Week 6", mood: 4 },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-6 text-green-600">Obeeoma</h1>
        <nav className="flex flex-col gap-4 text-gray-700">
          <a href="#" className="font-medium text-green-600">Dashboard</a>
          <a href="AiAssistant">AI Assistant</a>
          <a href="Resources">Resources</a>
          <a href="MyProgress">My Progress</a>
          <a href="MyPrograms">My Programs</a>
          <a href="Rewards">Rewards</a>
          <a href="Subscription">Subscription</a>
        </nav>
          {/* Use Link for navigation and remove unnecessary curly braces around emoji */}
          <Link to="/Settings" className="flex items-center gap-2 text-gray-600">
            <span>⚙️</span> Settings
          </Link>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Welcome back, Emma!</h2>
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 bg-gray-100 rounded-full">🔔</button>
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md text-sm p-4">
                <p className="font-medium">Notifications</p>
                <ul className="mt-2 space-y-2">
                  <li>New session available in Anxiety Management <span className="text-xs text-gray-500">2h ago</span></li>
                  <li>You earned a 7-day streak badge! <span className="text-xs text-gray-500">1d ago</span></li>
                  <li>New recommended resource for you <span className="text-xs text-gray-500">2d ago</span></li>
                </ul>
                <a href="#" className="text-green-600 text-xs block mt-2">View all notifications</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <span className="text-sm">Builder<br /><span className="text-gray-500">Patient Dashboard</span></span>
            </div>
          </div>
        </header>

        {/* Progress alert */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
          ✅ You’re making great progress! You completed 3 activities this week, 40% more than last week.
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div className="p-4 bg-white rounded-lg shadow">7 days<br /><span className="text-sm text-gray-500">Current Streak</span></div>
          <div className="p-4 bg-white rounded-lg shadow">5h 23m<br /><span className="text-sm text-gray-500">Time in Programs</span></div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium mb-4">Weekly Engagement (minutes)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium mb-4">Mood Trend (1–5 scale)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moodTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today’s Plan & Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium mb-4">Today’s Plan</h3>
            <div className="border-b pb-2 mb-2">
              <p className="font-medium">Anxiety Management: Session 4</p>
              <p className="text-sm text-gray-500">Breathing techniques for acute anxiety</p>
              <button className="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded-md">Start Session</button>
            </div>
            <div>
              <p className="font-medium">Daily Mood Check-in</p>
              <p className="text-sm text-gray-500">Track your mood and symptoms</p>
              <button className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md">Check In</button>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium mb-4">Recommended for You</h3>
            <div className="border-b pb-2 mb-2">
              <p className="font-medium">5-Minute Calming Exercise</p>
              <p className="text-sm text-gray-500">Quick technique for stress relief</p>
              <a href="#" className="text-green-600 text-sm">View →</a>
            </div>
            <div>
              <p className="font-medium">Understanding Anxiety Triggers</p>
              <p className="text-sm text-gray-500">Learn to identify your personal triggers</p>
              <a href="#" className="text-green-600 text-sm">View →</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
