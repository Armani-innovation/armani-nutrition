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
    public: {}
  },

  i18n: {
    defaultLocale: 'fa',
    locales: [
      { code: 'fa', name: 'Persian', file: 'fa.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ar', name: 'Arabic', file: 'ar.json' }
    ]
  }

});