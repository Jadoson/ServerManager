// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  components: true,
  target: 'static',
  router: {
    base: '/ServerManager/',
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  generate: {
    fallback: true,
  },
}
