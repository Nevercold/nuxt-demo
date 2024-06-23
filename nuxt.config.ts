// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    '/api/**': { proxy: {to: process.env.API_URL+'/api/**'} },
  }
})
