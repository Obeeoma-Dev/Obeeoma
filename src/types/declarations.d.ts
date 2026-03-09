// Type declarations for external modules

import { QueryClient } from "@tanstack/query-core";

declare module "@tanstack/react-query" {
  export { QueryClient };
  export * from "@tanstack/react-query";
}

declare module "framer-motion" {
  export * from "framer-motion";
}
