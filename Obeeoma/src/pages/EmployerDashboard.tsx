import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, FileCheck, TrendingUp, AlertTriangle, LayoutDashboard, Users as UsersIcon, CreditCard, Settings, Search, Bell, Menu, X } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const statsData = [
    {
      title: "Total Employees",
      value: "4",
      description: "Active employees in the system",
      icon: Users,
      iconBg: "bg-primary",
    },
    {
      title: "Total Tests",
      value: "6",
      description: "Tests completed",
      icon: FileCheck,
      iconBg: "bg-blue-500",
    },
    {
      title: "Average Score",
      value: "61%",
      description: "Average wellness score",
      icon: TrendingUp,
      iconBg: "bg-amber-500",
    },
    {
      title: "At Risk",
      value: "0",
      description: "Departments with risk factors",
      icon: AlertTriangle,
      iconBg: "bg-red-500",
    },
  ];

  const testsByType = [
    { name: "Well-being Check", value: 2 },
    { name: "Burnout Risk", value: 1 },
  ];

  const testsByDepartment = [
    { name: "Marketing", value: 25, color: "#10b981" },
    { name: "HR", value: 25, color: "#60a5fa" },
    { name: "Finance", value: 25, color: "#f59e0b" },
    { name: "Engineering", value: 25, color: "#ef4444" },
  ];

  const recentActivity = [
    { text: "A new wellness test was completed in", department: "Engineering", time: "2 hours ago" },
    { text: "Department Marketing completed monthly assessments", department: "", time: "1 day ago" },
    { text: "New wellness resources added to the platform", department: "", time: "2 days ago" },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: UsersIcon, label: "Employees", active: false },
    { icon: CreditCard, label: "Subscription", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-background border-r border-border w-64 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-primary">Obeeoma</span>
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 mt-8">
          <p className="text-xs text-muted-foreground mb-4 px-3">Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-2 transition-colors ${
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-background border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 bg-muted/50"
              />
            </div>
          </div>

          <button className="relative p-2">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Organization Overview</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {statsData.map((stat) => (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`${stat.iconBg} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bar Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Tests by Type</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={testsByType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fill: 'hsl(var(--foreground))' }} />
                    <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Tests by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={testsByDepartment}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {testsByDepartment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <Button variant="ghost" className="text-primary hover:text-primary">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 py-3 border-b last:border-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {activity.text}{" "}
                        {activity.department && (
                          <span className="font-medium">{activity.department}</span>
                        )}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
