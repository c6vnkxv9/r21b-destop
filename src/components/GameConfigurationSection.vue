<template lang="pug">
.position-relative.configuration-wrap
  CountdownTimer.position-absolute.timer-wrap(:gameRound='gameRound ' @addGameRound='addGameRound')
  .position-absolute.ver-wrap.d-flex.flex-column
    .w-100.d-flex.justify-content-center.bi-number-style-wrap.pb-50.h-50.align-items-center
      div
        .title-style {{ gameMode.label }}局
        .subtitle-style.rb-fz {{ gameMode.text.toUpperCase() }}
        .subtitle-style.rb-fz ROUND
        .number-style-wrap.icon-text-style.mt-1
          i.bi.bi-number-style.cursor(v-for='i in 5' :class='i==gameRound+1?`bi-${i}-circle-fill`:`bi-${i}-circle`' @click='changeGameRound(i)')
    .w-100.pt-50.h-50.d-flex.justify-content-center.align-items-center
      .px-6
        p.text-start.icon-text-style 討論時間結束後
          span.d-block 請室長在1分鐘內
          span.d-block 選出 
            span.fw-bold {{quantity}} 
            |  位人質
        .hostage-icon-container
          i.bi.bi-person-walking(v-for="i in quantity")
          i.bi.bi-door-open.door
  .position-absolute.ho-wrap.d-flex
    .w-50.pr-25(:style="{'background-color':leftColor}")
      .mx-auto.pic-wrap
        img.d-block(src='@/assets/pic/logo-red.png')
    .w-50.pl-25(:style="{'background-color':rightColor}")
      p.player-style.rb-fz {{ playerCount }}
        span.ml-2 Players
</template>
<script lang="ts">
import CountdownTimer from '@/components/CountdownTimer.vue'
import { ref, Ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
import exchangeSetting from '@/assets/data/exchangeSetting.json'
export default defineComponent({
  name: 'GameConfigurationSection',
  props: {
    leftColor: {
      type: String,
      default: '#942121'
    },
    rightColor: {
      type: String,
      default: '#3C55A5'
    }
  },
  components: {
    CountdownTimer,
  },
  setup() {
    const store = useStore();
    const gameRound = ref<number>(0)
    const quantity = computed(() => {
      return exchangeSetting[gameRound.value]
    })
    const playerCount = store.state.gameSetting.count
    const gameMode = store.state.gameSetting.gameMode
    function changeGameRound(i: number) {
      gameRound.value = i - 1
    }
    function addGameRound(i: number) {
      gameRound.value++
    }
    return {
      playerCount, gameMode, quantity, gameRound, changeGameRound,addGameRound
    }
  }
})
</script>

<style lang='scss' scoped>
$configuration-width: 200px;
$configuration-height: 100px;
$clock-rect: 340px;

.configuration-wrap {
  width: 100vw;
  height: 100vh;
}
.timer-wrap{
  width: $clock-rect;
  height: $clock-rect;
  left: calc(50% - $clock-rect/2);
  top: calc(50% - $clock-rect/2);
  z-index: 3;
}
.ver-wrap {
  width: $configuration-width;
  height: 100vh;
  background-color: #282828;
  z-index: 1;
  top: 0;
  left: calc(50% - ($configuration-width/2));
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  .title-style {
    color: #FFF;
    font-size: 40px;
    font-weight: 700;
  }

  .subtitle-style {
    color: #BFBFBF;
    font-size: 16px;
    font-weight: 400;
  }

  .icon-text-style {
    color: #FFF;
    font-size: 20px;
    font-weight: 400;
    i+i{
      margin-left: 4px;
    }
  }

  .hostage-icon-container {
    font-size: 24px;
    color: #FFF;
  }
}

.px-6 {
  padding: 0 24px;
}

.pl-25 {
  padding-left: calc($clock-rect/2);
}

.pr-25 {
  padding-right: calc($clock-rect/2);
}

.pb-50 {
  padding-bottom: calc($clock-rect/2);
}

.pt-50 {
  padding-top: calc($clock-rect/2);
}

.ml-2 {
  margin-left: 8px;
}

.clock {
  font-family: 'ClockStyle', sans-serif;
}

.ho-wrap {
  width: 100vw;
  height: $configuration-height;
  background-color: #942121;
  z-index: 1;
  top: calc(50% - ($configuration-height/2));
  left: 0;

  .player-style {
    color: #FFF;
    font-size: 48px;
    font-weight: 700;
    line-height: $configuration-height;
  }

  .pic-wrap {
    width: 40%;
    height: $configuration-height;

    img {
      max-width: 100%;
      height: 100%;
    }
  }
}</style>
