<template lang="pug">
.bomb-container(:class="{active:btnIsActive}")
  .bomb
    .spark
</template>
<script lang="ts">
/* eslint-disable */
import {defineComponent } from 'vue'
export default defineComponent({
  name: 'BoomIcon',
  props: {
    btnIsActive: {
      type: Boolean,
      required: true
    },
  },
  setup() {
    // return {
    //   btnIsActive
    // }
  }
})
</script>
<style lang="scss" scoped>
$lighten-grey: #919191;
$mid-grey: #353535;
$dark-grey: #222222;

@keyframes swing {
  0%, 100% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes sparkFlicker {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.bomb-container {
  position: relative; 
  width: 100%;
  height: 100%;
}
.bomb-container.active{
  animation: swing 2s infinite;
  .bomb{
    animation: heartbeat 0.5s infinite;
  }
  .spark{
    animation: sparkFlicker 0.3s infinite;
  }
}
.bomb {
  position: relative;
  background-color: $dark-grey;
  border-radius: 50%;
  border: 5px solid $lighten-grey;
  width: 100%;
  height: 100%;
}

.bomb::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 40px;
  background-color: $lighten-grey;
  border-radius: 5px;
}

.bomb::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 20px;
  background-color: $lighten-grey;
  border-radius: 5px;
}

.bomb .spark {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background-color: #f00;
  border-radius: 50%;
}
</style>
