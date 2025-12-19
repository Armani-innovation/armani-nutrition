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
      '/api/**': {
        proxy: `http://85.198.11.236:9005/**`
      }
    }
  }

});