import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing all that is under pages. 
import * as Pages from "./pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Pages.Index />} />

          {/* Employer Dashboard */}
          <Route path="/employer-dashboard" element={<Pages.EmployerDashboard />} />

          {/* System Admin Dashboard */}
          <Route path="/system-admin" element={<Pages.Dashboard />}>
            <Route index element={<Pages.Overview />} />
            <Route path="organizations" element={<Pages.Organizations />} />
            {/* Add other routes here */}
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Pages.NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
