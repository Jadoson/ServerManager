// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'static',
  router: {
    base: '/servermanager/',
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})
