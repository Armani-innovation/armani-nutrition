import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css : ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
    public: {}
  },

  modules: ["@nuxt/image"],
});