<template lang="pug">
.wrap
  GameConfigurationSection
  NomalPannel
</template>
<script lang="ts">
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import NomalPannel from '@/components/nomal/NomalPannel.vue'
import { ref,Ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'GameDashboard',
  components: {
    NomalPannel,
    GameConfigurationSection
  },
  setup () {

    return {
    }
  }
})
</script>
<style lang="scss" scoped>
.wrap{
  width: 100vw;
  height: 100vh;
  background-color: #666;
}
</style>
