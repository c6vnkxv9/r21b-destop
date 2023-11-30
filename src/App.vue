<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';//npm install -D sass-loader node-sass
//https://hoyis-note.coderbridge.io/2021/08/16/Vue3%E5%AE%89%E8%A3%9DSCSS%E7%B7%A8%E8%AD%AF%E5%99%A8/
#app {
  font-family: 'Noto Sans CJK TC', Helvetica, Arial, sans-serif; 
  text-align: center;
  color: #2c3e50;
  .rb-fz{
    letter-spacing: 0.1rem;
    font-family: 'R2B1Style', Helvetica, Arial, sans-serif; 
  }
  .clock-fz{
    font-family: 'ClockStyle', Helvetica, Arial, sans-serif;;
  }
  .cursor {
        cursor: pointer;
    }
}
</style>
