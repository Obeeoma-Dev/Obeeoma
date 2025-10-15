// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordSignIn from "./auth/ResetPasswordin";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route -> Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-xl">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </Router>
  );
}
