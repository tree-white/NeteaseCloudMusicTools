/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_LOCAL_COOKIE: string
  VITE_BASE_URL: string
  VITE_BASE_RESERVE_URL: string
  VITE_USE_REAL_IP: boolean
  VITE_REAL_IP: string
  VITE_REQUEST_TIMEOUT: number
  VITE_CAPTCHA_COOLING_TIME: number
  CUSTOM_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
