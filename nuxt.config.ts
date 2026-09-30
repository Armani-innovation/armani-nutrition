import tailwindcss from "@tailwindcss/vite";

// SSR/Nitro proxy target (baked at build time). Prefer the dedicated SSR var so
// NUXT_PUBLIC_API_BASE can stay origin-relative (/api) for the browser.
const SSR_API_BASE =
  process.env.NUXT_SSR_API_BASE ||
  (process.env.NUXT_PUBLIC_API_BASE?.startsWith("http")
    ? process.env.NUXT_PUBLIC_API_BASE
    : undefined) ||
  "http://backend:8000";

export default defineNuxtConfig({
  modules: ["@nuxt/image", '@nuxtjs/i18n'],
  compatibilityDate: "2025-07-15",
  devtools: {enabled: true},
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
    public: {
      // Browser-facing base; apiFetch also hardcodes /api which nginx proxies.
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
    }
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'fa',

    detectBrowserLanguage: false ,

    locales: [
      {code: 'fa', name: 'Persian', file: 'fa.json'},
      {code: 'en', name: 'English', file: 'en.json'},
      {code: 'ar', name: 'Arabic', file: 'ar.json'}
    ],

    langDir: 'locales/'
  },
  nitro: {
    routeRules: {
      // SSR-side proxy: forward /api/** to the backend, stripping /api.
      // (The browser also calls /api/** which nginx handles directly.)
      '/api/**': {
        proxy: `${SSR_API_BASE}/**`
      }
    }
  }

});
