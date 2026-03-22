import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./polyfills"; // Import polyfills first
import { setupServerAuthInterceptor } from "./utils/serverAuthInterceptor";

// Setup server-side authentication interceptor for MAXIMUM protection
setupServerAuthInterceptor();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
