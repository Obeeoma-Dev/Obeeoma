import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Pages from "./pages";
const queryClient = new QueryClient();
const App = () => (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Pages.Index, {}) }), _jsx(Route, { path: "/employer-dashboard", element: _jsx(Pages.EmployerDashboard, {}) }), _jsx(Route, { path: "/system-admin", element: _jsx(Pages.Systemadmin, {}) }), _jsx(Route, { path: "*", element: _jsx(Pages.NotFound, {}) })] }) })] }) }));
export default App;
