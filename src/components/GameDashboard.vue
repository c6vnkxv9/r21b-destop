<template lang="pug">
.wrap
  GameConfigurationSection
  NormalPanel
</template>
<script lang="ts">
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import NormalPanel from '@/components/normal/NormalPanel.vue'
import { ref,Ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'GameDashboard',
  components: {
    NormalPanel,
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
