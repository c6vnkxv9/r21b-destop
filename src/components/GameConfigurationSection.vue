<template lang="pug">
div
  .position-relative.configuration-wrap
    CountdownTimer.position-absolute.timer-wrap(:gameRound='gameRound ' @addGameRound='addGameRound')
    .position-absolute.ver-wrap.d-flex.flex-column
      .w-100.d-flex.justify-content-center.bi-number-style-wrap.pb-50.h-50.align-items-center
        .text-center
          .d-flex.align-items-center
            .title-style {{ gameMode.label }}局
            i.d-block.bi.bi-pencil-square.pencil-icon.cursor(@click="returnSetting")
          .subtitle-style.rb-fz {{ gameMode.name.toUpperCase() }}
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
      .w-50.pr-25.d-flex.justify-content-center(:style="{'background-color':configBgc[0]}")
        .mx-auto.pic-wrap.py-8px
          img.d-block(src='@/assets/pic/logo.svg')
      .w-50.pl-25(:style="{'background-color':configBgc[1]}")
        p.player-style.rb-fz.text-center {{ playerCount }}
          span.ml-2 Players
</template>
<script lang="ts">
import CountdownTimer from '@/components/CountdownTimer.vue'
import { ref, Ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import exchangeSetting from '@/assets/data/exchangeSetting.json'
import script from '@/assets/data/script.json'
export default defineComponent({
  name: 'GameConfigurationSection',
  props: {
    configBgc: {
      type: Array,
      default: function () {
        return ['#942121', '#3C55A5'];//使用一個函數來返回預設值
      }
    }
  },
  components: {
    CountdownTimer,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const gameRound = ref<number>(0)
    const quantity = computed(() => {
      return exchangeSetting[gameRound.value]
    })
    const playerCount = store.state.gameSetting.count
    const gameMode = computed(() => {
      const modeId = store.state.gameSetting?.mode || 0
      const { name, label } = script[modeId]
      return { name, label }
    });
    function changeGameRound(i: number) {
      gameRound.value = i - 1
    }
    function addGameRound(i: number) {
      if (gameRound.value < 4) {
        gameRound.value++
      }
    }
    function returnSetting() {
      router.push({ name: 'home' });
    }
    return {
      playerCount, gameMode, quantity, gameRound, returnSetting, changeGameRound, addGameRound
    }
  }
})
</script>

<style lang='scss' scoped>
.pencil-icon {
  color: #6866DE;
  font-size: 20px;
  line-height: 40px;
  margin-left: 8px;
}

.configuration-wrap {
  width: 100vw;
  height: 100vh;
}

.timer-wrap {
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

    i+i {
      margin-left: 4px;
    }
  }

  .hostage-icon-container {
    font-size: 24px;
    color: #FFF;
  }
}

.py-8px {
  padding: 8px 0;
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
    height: $configuration-height;

    img {
      max-width: 100%;
      height: 100%;
    }
  }
}</style>
