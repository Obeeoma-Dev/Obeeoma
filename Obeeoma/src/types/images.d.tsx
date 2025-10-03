// src/images.d.ts
/**
 * Module declarations for static image imports
 *
 * This allows TypeScript to understand imports like:
 * import heroImage from "@/assets/Images/headerimage.png";
 *
 * Without this, TS will throw:
 * "Cannot find module ... or its corresponding type declarations"
 */

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export { ReactComponent };
  const src: string;
  export default src;
}
