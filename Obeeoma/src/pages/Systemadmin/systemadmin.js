import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Adminnav from "@/components/shared/Adminnav";
const SystemadminLayout = () => {
    return (_jsxs("div", { className: "flex h-screen bg-gray-100", children: [_jsx(Adminnav, {}), _jsx("div", { className: "flex-grow overflow-y-auto p-6", children: _jsx(Outlet, {}) })] }));
};
export default SystemadminLayout;
