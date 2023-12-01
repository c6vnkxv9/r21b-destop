const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "https://kamiiliu.github.io/R21B/" : "/",
  transpileDependencies: true,
  outputDir: 'dist',
    // css: {
    //   loaderOptions: {
    //     sass: {
    //       additionalData: `@import "@/assets/scss/main.scss";`
    //     },
    //   },
    // },
})
