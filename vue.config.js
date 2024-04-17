const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/helpers/_variables.scss";'
      }
    }
  },

  outputDir: 'docs',

  publicPath: '/metawall-front/'
})
