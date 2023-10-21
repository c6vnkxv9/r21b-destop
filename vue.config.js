const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/R2B1/" : "/",
  transpileDependencies: true,
  outputDir: 'dist',
})
