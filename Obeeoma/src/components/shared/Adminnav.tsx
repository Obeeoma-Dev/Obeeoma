import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Overview", path: "/system-admin" },
  { label: "Organizations", path: "/system-admin/organizations" },
  { label: "Client Engagement", path: "/system-admin/client-engagement" },
  { label: "AI Management", path: "/system-admin/ai-management" },
  { label: "Hotline Activity", path: "/system-admin/hotline-activity" },
  { label: "Subscriptions", path: "/system-admin/subscriptions" },
  { label: "Reports", path: "/system-admin/reports" },
];

const Adminnav = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <h2 className="text-xl font-bold mb-6 text-green-600">System Admin</h2>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Adminnav;