const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "https://kamiiliu.github.io/r21b-destop/" : "/",
  transpileDependencies: true,
  outputDir: 'dist',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/main.scss";`
      },
    },
  },
})
