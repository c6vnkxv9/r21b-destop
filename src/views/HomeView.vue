<template>
  <div class="home">
    <GameSetting/>
    <FooterCopyright/>
  </div>
</template>

<script lang="ts">
import FooterCopyright from '@/components/FooterCopyright.vue';
import GameSetting from '@/components/GameSetting.vue';
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {
    GameSetting,
    FooterCopyright
  }
})
export default class HomeView extends Vue {}
</script>
<style scoped>
.home{
  width: 100vw;
  min-height: 100vh;
}
</style>
