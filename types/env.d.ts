/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_LOCAL_COOKIE: string
  VITE_BASE_URL: string
  VITE_USE_REAL_IP: boolean
  VITE_REAL_IP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
