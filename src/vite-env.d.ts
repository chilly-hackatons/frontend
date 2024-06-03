/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_AUTH_KEY: string
  readonly VITE_API_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
