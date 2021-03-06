module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': ' #f5f5f7',
      'dark-gray': '#161617',
      'light-gray': '#f5f5f7'
     })
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'plugins/**/*.js', 'nuxt.config.js']
  }
}
