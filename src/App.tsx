// import { Toaster } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Pages
// import Index from "./pages/Index";
// import Login from "./pages/auth/Login";
// import CreateAccount from "./pages/auth/Register";
// import ResetPassword from "./pages/auth/ResetPassword";
// import ResetPasswordSignin from "./pages/auth/ResetPasswordSignin";
// import EmployeeDashboard from "./pages/EmployeeDashboard";
// import NotFound from "./pages/NotFound";
// import EmployerDashboard from "./pages/EmployerDashboard";

// const queryClient = new QueryClient();

// export default function App(): React.ReactElement {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <BrowserRouter>
//           <Routes>
//             {/* Default route */}
//             <Route path="/" element={<Navigate to="/Index" replace />} />

//             {/* Auth routes */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<CreateAccount />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/reset-password-signin" element={<ResetPasswordSignin />} />

//             {/* Employee dashboard */}
//             <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

//             {/* Employer dashboard */}
//             <Route path="/employer-dashboard" element={<EmployerDashboard />} />

//             {/* Index page */}
//             <Route path="/index" element={<Index />} />

//             {/* Catch-all */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }
import React from 'react';
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your AuthProvider and ProtectedRoute
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";


// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordSignin from "./pages/auth/ResetPasswordSignin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          {/* AuthProvider wraps all routes to provide auth context */}
          <AuthProvider>
            <Routes>
              {/* === PUBLIC ROUTES === */}
              {/* These routes are accessible to everyone */}
              <Route path="/" element={<Navigate to="/index" replace />} />
              <Route path="/index" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<CreateAccount />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password-signin" element={<ResetPasswordSignin />} />

              {/* === PROTECTED ROUTES === */}
              {/* These routes are only accessible to logged-in users */}
              <Route element={<ProtectedRoute />}>
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              </Route>

              {/* === CATCH-ALL ROUTE === */}
              {/* This must be the last route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}