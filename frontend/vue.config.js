const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')
const path = require('path')

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/r21b-destop/" : "/",
  transpileDependencies: true,
  outputDir: 'dist',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/main.scss";`
      },
    },
  },
  chainWebpack: config => {
    config.plugin('copy').tap(options => {
      options[0].patterns.push({
        from: path.resolve(__dirname, 'public/gh-pages-readme.md'),
        to: path.resolve(__dirname, 'dist/README.md'),
        toType: 'file',
      })
      return options
    })
  }
})
