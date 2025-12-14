import tailwindcss from "@tailwindcss/vite";

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
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'fa',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: 'fa'
    },

    locales: [
      {code: 'fa', name: 'Persian', file: 'fa.json'},
      {code: 'en', name: 'English', file: 'en.json'},
      {code: 'ar', name: 'Arabic', file: 'ar.json'}
    ],

    langDir: 'locales/'
  },
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: `http://127.0.0.1:8000/**`
      }
    }
  }

});