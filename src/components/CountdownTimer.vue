<template lang="pug">
.position-relative.boom-style
  .boom-wrap.d-flex.justify-content-center.align-items-center
    .boom-inner-warp.d-flex.justify-content-center.align-items-center
      .text-center
        p.rb-fz.fz-6.mb-12 ROUND {{ gameRound +1}}
        p.fz-5.mb-12 討論時間
        .timer-banner.mb-12
          p.mb-0.fz-15.clock-fz {{formattedTime}}
        .play-wrap.cursor(@click='toggleCountdown')
          i(class="bi" :class="btnIsActive?'bi-pause-circle-fill':'bi-play-circle-fill'")
</template>
<script lang="ts">
import { ref,watch, onBeforeUnmount,computed, Ref, defineComponent } from 'vue'
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
    const minuteUnit: number = 5 // 總共五分鐘
    const timeCountDownUnit: number = 1 // 每五秒倒數一次
    const timeUnit: number = (60 * minuteUnit) / timeCountDownUnit
    const timeDuration: Ref<number> = ref(timeUnit)
    const timeStatus: Ref<ButtonStyle> = ref({
      icon: COUNT_DOWN_TIMER_STATUS[1].icon,
      key: COUNT_DOWN_TIMER_STATUS[1].key
    })
    const btnIsActive: Ref<boolean> = ref(false)
    const audio = new Audio('/bgm.mp3');
    let intervalRef:number| undefined = undefined ;
    function toggleCountdown(): void {
      btnIsActive.value = !btnIsActive.value
      if (btnIsActive.value) {
        startCountdown();
        playMusic();
      } else {
        stopCountdown();
        pauseMusic();
      }
    }
    function clearTimer(){
      clearInterval(intervalRef);
        intervalRef = undefined;
    }
    function stopCountdown() { 
      if (intervalRef !== undefined) {
        clearTimer()
      }
    }
    function resetMusic() { 
      audio.currentTime = 0//重返秒數為0
      audio.pause()
    }
    function resetTime() { 
      timeDuration.value = timeUnit;
      btnIsActive.value = false;
      
    }
    function startCountdown() {
      if (intervalRef == undefined ) {
      intervalRef = setInterval(() => {
        if (timeDuration.value > 0) {
          timeDuration.value--;
        } else {
          clearTimer()
          resetTime() 
          //resetMusic()
          emit('addGameRound');
        }
      }, timeCountDownUnit * 1000);
      }
    }
    watch(() => props.gameRound, () => {
        clearTimer()
        resetTime() 
        resetMusic()
        });
        
    function playMusic(): void {
      audio.play();
    };
    function pauseMusic(): void {
      audio.pause();
    };
    const formattedTime = computed(() => {
      const minutes = Math.floor((timeDuration.value * timeCountDownUnit) / 60)
        .toString()
        .padStart(2, '0')
      const seconds = Math.floor((timeDuration.value * timeCountDownUnit) % 60)
        .toString()
        .padStart(2, '0')
      return `${minutes} : ${seconds}`
    })
    onBeforeUnmount(() => {
      resetMusic()
});
    return {
      timeDuration,
      formattedTime,
      toggleCountdown,
      timeStatus,
      btnIsActive
    }
  }
})
</script>
這是我目前的方法，我希望可以按一下的時候開始計時，再按一下時，暫停計時
請問這樣寫的話，有甚麼需要調整的地方
以及//TODO:如何停止計時該怎麼寫?
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
  background-color: $boom-color;
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
  border: 9px solid $boom-color;
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
