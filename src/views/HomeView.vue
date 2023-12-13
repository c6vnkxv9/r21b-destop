<template>
  <div class="home">
    <GameSetting/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import GameSetting from '@/components/GameSetting.vue'
@Options({
  components: {
    GameSetting
  }
})
export default class HomeView extends Vue {}
</script>
<style scoped>
.home{
  width: 100vw;
  height: 100vh;
}
</style>
