<template lang="pug">
.position-relative.boom-style
  .boom-wrap.d-flex.justify-content-center.align-items-center
    .boom-inner-warp.d-flex.justify-content-center.align-items-center
      .text-center
        p.rb-fz.fz-6.mb-12 ROUND {{ gameRound +1}}
        p.fz-5.mb-12 討論時間
        .timer-banner.mb-12
          p.fz-15.clock-fz {{formattedTime}}
        .play-wrap.cursor(@click='pressCountdownButton')
          i(class="bi bi-play-circle-fill")
</template>
<script lang="ts">
// 暫停倒數計時
// 修正字體
// 開始倒數計時，顏色要標亮
// 版型設計
// 時間到，畫面會抖一下？
//一次只能按一次倒數按鈕，不會因為多按要倒數很多次
//渲染的不是很順
import { ref, computed, Ref, defineComponent } from 'vue'
const COUNT_DOWN_TIMER_STATUS = [
  {
    key: 'START',
    icon: 'bi-alarm'
  },
  {
    key: 'PAUSE',
    icon: 'bi-play-circle'
  },
  {
    key: 'CONTINUE',
    icon: 'bi-play-circle-fill'
  }
]
interface ButtonStyle {
  icon: string
  key: string
}
export default defineComponent({
  name: 'CountdownTimer',
  components: {
    
  }, props: {
    gameRound: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const minuteUnit: number = 1 // 總共五分鐘
    const timeCountDownUnit: number = 1 // 每五秒倒數一次
    const timeUnit: number = (60 * minuteUnit) / timeCountDownUnit
    const timeDuration: Ref<number> = ref(timeUnit)
    const timeStatus: Ref<ButtonStyle> = ref({
      icon: COUNT_DOWN_TIMER_STATUS[1].icon,
      key: COUNT_DOWN_TIMER_STATUS[1].key
    })
    const btnIsActive: Ref<boolean> = ref(false)
    function pressCountdownButton(): void {
      btnIsActive.value = !btnIsActive.value
      startCountdown()
      // playMusic()
    }
    function playMusic(): void {
      const audio = new Audio('/bgm.mp3');
      audio.play();
    };
    let intervalRef:number| undefined = undefined ;
    function startCountdown() {
      if (intervalRef !== undefined ) {
        // 如果定時器已經存在，則不創建新的定時器
        return;
      }
      intervalRef = setInterval(() => {
        if (timeDuration.value > 0) {
          timeDuration.value--;
        } else {
          clearInterval(intervalRef);
          intervalRef = undefined ; // 清除定時器引用
          timeDuration.value = timeUnit;
          btnIsActive.value = false;
          emit('addGameRound');
        }
      }, timeCountDownUnit * 1000);
    }
    const formattedTime = computed(() => {
      const minutes = Math.floor((timeDuration.value * timeCountDownUnit) / 60)
        .toString()
        .padStart(2, '0')
      const seconds = Math.floor((timeDuration.value * timeCountDownUnit) % 60)
        .toString()
        .padStart(2, '0')
      return `${minutes} : ${seconds}`
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
.fz-6 {
  font-size: 24px;
  line-height: 1em;
}

.fz-5 {
  font-size: 20px;
  line-height: 1em;
}

.fz-15 {
  font-size: 60px;
  line-height: 1em;
}

.mb-12 {
  margin-bottom: 12px;
}
.boom-style::before,
.boom-style::after {
  content: '';
  display: block;
  width: $boom-bot-w;
  height: $boom-bot-h;
  border-radius: 9px;
  background-color: #3F1212;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  z-index: -1;
}

.boom-style::before {
  top: 0;
  right: calc(50% - ($boom-bot-w * 2));
  transform: rotate(45deg)
}

.boom-style::after {
  top: 0;
  left: calc(50% - ($boom-bot-w * 2));
  transform: rotate(-45deg)
}

.boom-wrap {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 9px solid #3F1212;
  background: #942121;
}

.boom-inner-warp {
  width: $boom-rect;
  height: $boom-rect;
  border-radius: $boom-rect;
  border: 7px solid #FFF;
  background: #282828;
  color: #fff;

  .timer-banner {
    border-radius: 4px;
    border: 1px solid #FFF;
    padding: 10px 16px 2px;
    width: 240px;

    p {
      line-height: normal;
    }
  }
}

.play-wrap {
  color: #CC333C;
  font-size: 3rem;
  position: relative;
  margin: 0 auto;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #fff;
    top: calc(50% - 0.75rem);
    left: calc(50% - 0.75rem);
    z-index: -1;
  }
}</style>
