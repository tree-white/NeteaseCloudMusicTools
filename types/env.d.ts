/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_LOCAL_COOKIE: string
  VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
