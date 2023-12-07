<template lang="pug">
.wrap
  GameConfigurationSection
  LayoutContainer
</template>
<script lang="ts">
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import LayoutContainer from '@/components/common/LayoutContainer.vue'
import { ref,Ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'GameDashboard',
  components: {
    LayoutContainer,
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
