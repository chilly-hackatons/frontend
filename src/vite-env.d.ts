/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_AUTH_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
