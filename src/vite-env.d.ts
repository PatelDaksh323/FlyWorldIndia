/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_PHONE_NUMBER?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_SINGLEFILE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
