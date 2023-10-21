<template lang="pug">
.d-flex.justify-content-center.align-items-center
  .d-flex.justify-content-center.flex-column
    .d-flex.justify-content-center
      .boom-style
        BoomIcon(:btnIsActive='btnIsActive')
      p.lg-text.dark-font(v-if="timeDuration > 0" :class="{active:btnIsActive}") {{ formattedTime }}
      i.bi(:class='timeStatus.icon' @click="pressCountdownButton")
</template>
<script lang="ts">
// 暫停倒數計時
// 修正字體
// 開始倒數計時，顏色要標亮
// 版型設計
// 時間到，畫面會抖一下？
import BoomIcon from '@/components/BoomIcon.vue'
import { ref, computed, Ref, defineComponent } from 'vue'
const COUNT_DOWN_TIMER_STATUS = [
  {
    key: 'START',
    icon: 'bi-alarm'
  },
  {
    key: 'PAUSE',
    icon: 'bi-pause-fill'
  },
  {
    key: 'CONTINUE',
    icon: 'skip-start-fill'
  }
]
interface ButtonStyle {
  icon: string
  key: string
}
export default defineComponent({
  name: 'CountdownTimer',
  components: {
    BoomIcon
  },
  setup () {
    const minuteUnit: number = 5 // 總共五分鐘
    const timeCountDownUnit: number = 5 // 每五秒倒數一次
    const timeUnit: number = (60 * minuteUnit) / timeCountDownUnit
    const timeDuration: Ref<number> = ref(timeUnit)
    const timeStatus: Ref<ButtonStyle> = ref({
      icon: COUNT_DOWN_TIMER_STATUS[0].icon,
      key: COUNT_DOWN_TIMER_STATUS[0].key
    })
    const btnIsActive: Ref<boolean> = ref(false)
    function pressCountdownButton (): void {
      btnIsActive.value = !btnIsActive.value
      startCountdown()
      playMusic ()
    }
    function playMusic ():void{
      const audio = new Audio('/bgm.mp3');
      audio.play();
    };
    function startCountdown (): void {
      const interval = setInterval(() => {
        if (timeDuration.value > 0) {
          timeDuration.value--
        } else {
          clearInterval(interval)
          timeDuration.value = timeUnit
          btnIsActive.value = false
        }
      }, timeCountDownUnit * 1000)
    }
    const formattedTime = computed(() => {
      const minutes = Math.floor((timeDuration.value * timeCountDownUnit) / 60)
        .toString()
        .padStart(2, '0')
      const seconds = Math.floor((timeDuration.value * timeCountDownUnit) % 60)
        .toString()
        .padStart(2, '0')
      return `${minutes}:${seconds}`
    })

    return {
      timeDuration,
      formattedTime,
      pressCountdownButton,
      timeStatus,
      btnIsActive
    }
  }
})
</script>
<style scoped lang="scss">
$lighten-grey: #919191;
$mid-grey: #353535;
$dark-grey: #222222;
.lg-text {
  font-size: 4rem;
}
.text-style {
  font-size: 1.5rem;
}
.dark-font {
  color: $mid-grey;
  &.active{
    color: $dark-grey;
  }
}
.button-style{
  background-color: transparent;
  padding: 0.5rem;
  border-radius: 2rem;
  border: $dark-grey 2px solid;
  &.active,
  &:hover{
    color: #fff;
    background-color: $dark-grey;
  }
}
.boom-style{
  margin-right: 1rem;
  width: 100px;
  height: 100px;
}
</style>
