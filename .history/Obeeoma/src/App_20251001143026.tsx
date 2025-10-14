import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner"; // Only import what's exported
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import { Index } from "./pages/index"; // Use named import since Index is not default exported
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordSignin from "./pages/auth/ResetPasswordSignin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password-signin" element={<ResetPasswordSignin />} />

            {/* Employee dashboard */}
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

            {/* Index page */}
            <Route path="/index" element={<Index />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}