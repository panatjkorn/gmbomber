export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'gmbomber',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  tailwindcss: {
    jit: true,
    exposeConfig: true,
  },

  router: {
    middleware: ['auth']
  },

  // publicRuntimeConfig: {
  //       axios: {
  //           browserBaseURL: process.env.BASE_URL_API
  //       },
  //       game3rdBaseURL:
  //           process.env.GAME_3RD_URL_API ||
  //           'https://staging-gamemun-3rd-qhqdywr4hq-as.a.run.app'
  //   },
  //   privateRuntimeConfig: {
  //       axios: {
  //           baseURL: process.env.BASE_URL_API
  //       },
  //       game3rdBaseURL:
  //           process.env.GAME_3RD_URL_API ||
  //           'https://staging-gamemun-3rd-qhqdywr4hq-as.a.run.app'
  //   },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  axios: {
    baseURL: process.env.BASE_URL_API
  },
  build: {
    babel:{
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
        // [
        //   'component', {
        //     libraryName: 'maz-ui',
        //     styleLibraryName: 'css'
        //   }
        // ]
      ]
    }
  },

  auth: {
    localStorage: false,
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      }
    },
    redirect: {
      login: '/',
      logout: '/login'
  },
    strategies: {
        local: {
          token: {
            property: 'accessToken'
          },
          endpoints: {
            login: {
              url: '/users/login',
              method: 'post'
            },
            user: { url: "/users/me", method: "get" },
            logout: false,
          },
          user: {
            property: 'data',
            autoFetch: true
          }
        }
    },
  },
}
