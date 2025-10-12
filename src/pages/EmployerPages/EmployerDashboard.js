import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Users, FileCheck, TrendingUp, AlertTriangle, LayoutDashboard, Users as UsersIcon, CreditCard, Settings, Search, Bell, Menu, X, } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, } from "recharts";
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
        {
            text: "A new wellness test was completed in",
            department: "Engineering",
            time: "2 hours ago",
        },
        {
            text: "Department Marketing completed monthly assessments",
            department: "",
            time: "1 day ago",
        },
        {
            text: "New wellness resources added to the platform",
            department: "",
            time: "2 days ago",
        },
    ];
    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", active: true },
        { icon: UsersIcon, label: "Employees", active: false },
        { icon: CreditCard, label: "Subscription", active: false },
        { icon: Settings, label: "Settings", active: false },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-muted/30", children: [isSidebarOpen && (_jsx("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden", onClick: () => setIsSidebarOpen(false) })), _jsxs("aside", { className: `fixed top-0 left-0 h-full bg-background border-r border-border w-64 z-50 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`, children: [_jsxs("div", { className: "p-6 flex items-center justify-between", children: [_jsxs("button", { onClick: () => navigate("/"), className: "flex items-center gap-2", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center", children: _jsx("span", { className: "text-primary-foreground font-bold text-lg", children: "O" }) }), _jsx("span", { className: "text-xl font-bold text-primary", children: "Obeeoma" })] }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "lg:hidden", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("nav", { className: "px-4 mt-8", children: [_jsx("p", { className: "text-xs text-muted-foreground mb-4 px-3", children: "Menu" }), menuItems.map((item) => (_jsxs("button", { className: `w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-2 transition-colors ${item.active
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground hover:bg-muted"}`, children: [_jsx(item.icon, { className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: item.label })] }, item.label)))] })] }), _jsxs("div", { className: "lg:ml-64", children: [_jsxs("header", { className: "bg-background border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30", children: [_jsx("button", { onClick: () => setIsSidebarOpen(true), className: "lg:hidden p-2", children: _jsx(Menu, { className: "w-6 h-6" }) }), _jsx("div", { className: "flex-1 max-w-xl mx-4", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { type: "search", placeholder: "Search...", className: "pl-10 bg-muted/50" })] }) }), _jsxs("button", { className: "relative p-2", children: [_jsx(Bell, { className: "w-5 h-5" }), _jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" })] })] }), _jsxs("main", { className: "p-4 sm:p-6 lg:p-8", children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold mb-6", children: "Organization Overview" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6", children: statsData.map((stat) => (_jsx(Card, { className: "hover:shadow-lg transition-shadow", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `${stat.iconBg} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`, children: _jsx(stat.icon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-1", children: stat.title }), _jsx("p", { className: "text-3xl font-bold mb-1", children: stat.value }), _jsx("p", { className: "text-xs text-muted-foreground", children: stat.description })] })] }) }) }, stat.title))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-6", children: "Tests by Type" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: testsByType, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }), _jsx(XAxis, { dataKey: "name", tick: { fill: "hsl(var(--foreground))" } }), _jsx(YAxis, { tick: { fill: "hsl(var(--foreground))" } }), _jsx(Bar, { dataKey: "value", fill: "hsl(var(--primary))", radius: [8, 8, 0, 0] })] }) })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-6", children: "Tests by Department" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: testsByDepartment, cx: "50%", cy: "50%", labelLine: false, label: ({ name, value }) => `${name}: ${value}%`, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: testsByDepartment.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Legend, {})] }) })] }) })] }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Recent Activity" }), _jsx(Button, { variant: "ghost", className: "text-primary hover:text-primary", children: "View All" })] }), _jsx("div", { className: "space-y-4", children: recentActivity.map((activity, index) => (_jsxs("div", { className: "flex items-start gap-4 py-3 border-b last:border-0", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" }), _jsx("div", { className: "flex-1", children: _jsxs("p", { className: "text-sm", children: [activity.text, " ", activity.department && (_jsx("span", { className: "font-medium", children: activity.department }))] }) }), _jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: activity.time })] }, index))) })] }) })] })] })] }));
=======
import {
  Users,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  LayoutDashboard,
  Users as UsersIcon,
  CreditCard,
  Settings,
  Search,
  Bell,
  Menu,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
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
    {
      text: "A new wellness test was completed in",
      department: "Engineering",
      time: "2 hours ago",
    },
    {
      text: "Department Marketing completed monthly assessments",
      department: "",
      time: "1 day ago",
    },
    {
      text: "New wellness resources added to the platform",
      department: "",
      time: "2 days ago",
    },
  ];
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: UsersIcon, label: "Employees", active: false },
    { icon: CreditCard, label: "Subscription", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];
  return _jsxs("div", {
    className: "min-h-screen bg-muted/30",
    children: [
      isSidebarOpen &&
        _jsx("div", {
          className:
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden",
          onClick: () => setIsSidebarOpen(false),
        }),
      _jsxs("aside", {
        className: `fixed top-0 left-0 h-full bg-background border-r border-border w-64 z-50 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`,
        children: [
          _jsxs("div", {
            className: "p-6 flex items-center justify-between",
            children: [
              _jsxs("button", {
                onClick: () => navigate("/"),
                className: "flex items-center gap-2",
                children: [
                  _jsx("div", {
                    className:
                      "w-10 h-10 rounded-full bg-primary flex items-center justify-center",
                    children: _jsx("span", {
                      className: "text-primary-foreground font-bold text-lg",
                      children: "O",
                    }),
                  }),
                  _jsx("span", {
                    className: "text-xl font-bold text-primary",
                    children: "Obeeoma",
                  }),
                ],
              }),
              _jsx("button", {
                onClick: () => setIsSidebarOpen(false),
                className: "lg:hidden",
                children: _jsx(X, { className: "w-5 h-5" }),
              }),
            ],
          }),
          _jsxs("nav", {
            className: "px-4 mt-8",
            children: [
              _jsx("p", {
                className: "text-xs text-muted-foreground mb-4 px-3",
                children: "Menu",
              }),
              menuItems.map((item) =>
                _jsxs(
                  "button",
                  {
                    className: `w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-2 transition-colors ${
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`,
                    children: [
                      _jsx(item.icon, { className: "w-5 h-5" }),
                      _jsx("span", {
                        className: "font-medium",
                        children: item.label,
                      }),
                    ],
                  },
                  item.label,
                ),
              ),
            ],
          }),
        ],
      }),
      _jsxs("div", {
        className: "lg:ml-64",
        children: [
          _jsxs("header", {
            className:
              "bg-background border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30",
            children: [
              _jsx("button", {
                onClick: () => setIsSidebarOpen(true),
                className: "lg:hidden p-2",
                children: _jsx(Menu, { className: "w-6 h-6" }),
              }),
              _jsx("div", {
                className: "flex-1 max-w-xl mx-4",
                children: _jsxs("div", {
                  className: "relative",
                  children: [
                    _jsx(Search, {
                      className:
                        "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground",
                    }),
                    _jsx(Input, {
                      type: "search",
                      placeholder: "Search...",
                      className: "pl-10 bg-muted/50",
                    }),
                  ],
                }),
              }),
              _jsxs("button", {
                className: "relative p-2",
                children: [
                  _jsx(Bell, { className: "w-5 h-5" }),
                  _jsx("span", {
                    className:
                      "absolute top-1 right-1 w-2 h-2 bg-primary rounded-full",
                  }),
                ],
              }),
            ],
          }),
          _jsxs("main", {
            className: "p-4 sm:p-6 lg:p-8",
            children: [
              _jsx("h1", {
                className: "text-2xl sm:text-3xl font-bold mb-6",
                children: "Organization Overview",
              }),
              _jsx("div", {
                className:
                  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6",
                children: statsData.map((stat) =>
                  _jsx(
                    Card,
                    {
                      className: "hover:shadow-lg transition-shadow",
                      children: _jsx(CardContent, {
                        className: "p-6",
                        children: _jsxs("div", {
                          className: "flex items-start gap-4",
                          children: [
                            _jsx("div", {
                              className: `${stat.iconBg} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`,
                              children: _jsx(stat.icon, {
                                className: "w-6 h-6 text-white",
                              }),
                            }),
                            _jsxs("div", {
                              className: "flex-1 min-w-0",
                              children: [
                                _jsx("p", {
                                  className:
                                    "text-sm text-muted-foreground mb-1",
                                  children: stat.title,
                                }),
                                _jsx("p", {
                                  className: "text-3xl font-bold mb-1",
                                  children: stat.value,
                                }),
                                _jsx("p", {
                                  className: "text-xs text-muted-foreground",
                                  children: stat.description,
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    },
                    stat.title,
                  ),
                ),
              }),
              _jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6",
                children: [
                  _jsx(Card, {
                    children: _jsxs(CardContent, {
                      className: "p-6",
                      children: [
                        _jsx("h3", {
                          className: "text-lg font-semibold mb-6",
                          children: "Tests by Type",
                        }),
                        _jsx(ResponsiveContainer, {
                          width: "100%",
                          height: 300,
                          children: _jsxs(BarChart, {
                            data: testsByType,
                            children: [
                              _jsx(CartesianGrid, {
                                strokeDasharray: "3 3",
                                stroke: "hsl(var(--border))",
                              }),
                              _jsx(XAxis, {
                                dataKey: "name",
                                tick: { fill: "hsl(var(--foreground))" },
                              }),
                              _jsx(YAxis, {
                                tick: { fill: "hsl(var(--foreground))" },
                              }),
                              _jsx(Bar, {
                                dataKey: "value",
                                fill: "hsl(var(--primary))",
                                radius: [8, 8, 0, 0],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                  _jsx(Card, {
                    children: _jsxs(CardContent, {
                      className: "p-6",
                      children: [
                        _jsx("h3", {
                          className: "text-lg font-semibold mb-6",
                          children: "Tests by Department",
                        }),
                        _jsx(ResponsiveContainer, {
                          width: "100%",
                          height: 300,
                          children: _jsxs(PieChart, {
                            children: [
                              _jsx(Pie, {
                                data: testsByDepartment,
                                cx: "50%",
                                cy: "50%",
                                labelLine: false,
                                label: ({ name, value }) =>
                                  `${name}: ${value}%`,
                                outerRadius: 80,
                                fill: "#8884d8",
                                dataKey: "value",
                                children: testsByDepartment.map(
                                  (entry, index) =>
                                    _jsx(
                                      Cell,
                                      { fill: entry.color },
                                      `cell-${index}`,
                                    ),
                                ),
                              }),
                              _jsx(Legend, {}),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              _jsx(Card, {
                children: _jsxs(CardContent, {
                  className: "p-6",
                  children: [
                    _jsxs("div", {
                      className: "flex items-center justify-between mb-6",
                      children: [
                        _jsx("h3", {
                          className: "text-lg font-semibold",
                          children: "Recent Activity",
                        }),
                        _jsx(Button, {
                          variant: "ghost",
                          className: "text-primary hover:text-primary",
                          children: "View All",
                        }),
                      ],
                    }),
                    _jsx("div", {
                      className: "space-y-4",
                      children: recentActivity.map((activity, index) =>
                        _jsxs(
                          "div",
                          {
                            className:
                              "flex items-start gap-4 py-3 border-b last:border-0",
                            children: [
                              _jsx("div", {
                                className:
                                  "w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0",
                              }),
                              _jsx("div", {
                                className: "flex-1",
                                children: _jsxs("p", {
                                  className: "text-sm",
                                  children: [
                                    activity.text,
                                    " ",
                                    activity.department &&
                                      _jsx("span", {
                                        className: "font-medium",
                                        children: activity.department,
                                      }),
                                  ],
                                }),
                              }),
                              _jsx("span", {
                                className:
                                  "text-xs text-muted-foreground whitespace-nowrap",
                                children: activity.time,
                              }),
                            ],
                          },
                          index,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
>>>>>>> tests
};
export default EmployerDashboard;
