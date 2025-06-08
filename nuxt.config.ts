
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
 
  app: {
    head: {
      title: 'alireza-dev', 
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css'
        }
      ]
    }
  },

  modules: ['@nuxtjs/supabase', '@pinia/nuxt'],
  supabase: {
    // redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/mydashboard'],
      exclude: [],
      saveRedirectToCookie: true,
    }
  }
})