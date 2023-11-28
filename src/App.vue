<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: 'Noto Sans CJK TC', Helvetica, Arial, sans-serif; 
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
