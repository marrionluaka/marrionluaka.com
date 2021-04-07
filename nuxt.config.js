export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Marrion Luaka',
    script: [
      { 
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': 'ca-pub-5157989864167195',
        defer: true
      }
    ],
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'monetization', content: '$ilp.uphold.com/7fNpxDJkxMmq' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      {
        hid: "description",
        name: "description",
        content: "Marrion Luaka is a Software Developer."
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Marrion Luaka is a Software Developer."
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Marrion Luaka"
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://www.marrionluaka.com"
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // loading: "~/components/Preloader.vue",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/webfonts.css',
    '@/assets/css/styles.css'
  ],

  //Resources loader
  styleResources: {
    stylus: [
      '~assets/styl/_variables.styl',
      '~assets/styl/_mixins.styl',
      '~assets/styl/_typography.styl'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/composition.js',
    '~/plugins/disqus'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/analytics-module
    ['@nuxtjs/google-analytics', { id: 'UA-87349469-1' }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    [
      'storyblok-nuxt',
      { 
        accessToken: process.env.STORYBLOK_API_KEY, 
        cacheProvider: 'memory' 
      }
    ],
    ['nuxt-fontawesome', {
      imports: [
       {
         set: '@fortawesome/free-solid-svg-icons',
         icons: ['fas']
       },
       {
         set:'@fortawesome/free-brands-svg-icons',
         icons: ['fab']
       }
     ]
    }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      config.module.rules.forEach((rule) => {
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.optimizeSSR = false
        }
      })
    }
  }
}
