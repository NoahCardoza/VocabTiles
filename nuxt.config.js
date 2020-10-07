export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'HardDaysNight',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/tachyons@4/css/tachyons.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['vuesax/dist/vuesax.css', './styles/index.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/vuesax'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // https://firebase.nuxtjs.org/tutorials/ssr/
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],
  router: {
    middleware: ['isAuthenticated'],
  },
  firebase: {
    config: {
      apiKey: 'AIzaSyBGtskG5mn_rq1TM5dVRd67HxWB7J4T_FY',
      authDomain: 'harddaysnight-bd33c.firebaseapp.com',
      databaseURL: 'https://harddaysnight-bd33c.firebaseio.com',
      projectId: 'harddaysnight-bd33c',
      storageBucket: 'harddaysnight-bd33c.appspot.com',
      messagingSenderId: '99469010859',
      appId: '1:99469010859:web:403a4000d1e3b456f994ee',
      measurementId: 'G-M6C1EXP82F',
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChangedAction',
        },
        ssr: true,
      },
    },
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:1337',
      pathRewrite: {
        '^/api': '',
      },
    },
  },

  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js',
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: true,
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
