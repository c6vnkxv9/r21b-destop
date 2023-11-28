<template lang="pug">
GameDashboard
</template>
<script lang="ts">
import GameDashboard from '@/components/GameDashboard.vue'
import { Options, Vue } from 'vue-class-component'
@Options({
  components: {
    GameDashboard
  }
})
export default class GameView extends Vue {}
</script>
<style>

</style>