import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Adminnav from "@/components/shared/Adminnav";
const SystemadminLayout = () => {
    return (_jsxs("div", { className: "flex h-screen bg-gray-100", children: [_jsx(Adminnav, {}), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsx(Outlet, {}) })] }));
};
export default SystemadminLayout;
