declare module "vite/client" {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Also add the global declarations
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly SERVER_API_KEY: string;
  readonly CLIENT_CLIENT_ID: string;
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
