<template lang="pug">
.d-flex.justify-content-center.flex-column.wrapper
  .d-flex.justify-content-center.align-items-center
    p.title-font-style Round {{roundNumber }}
    i.bi.bi-slash-lg.bi-slash-lg-style
    div
      CountdownTimer
    i.bi.bi-slash-lg.bi-slash-lg-style
    .exchange-wrap
      ExchangeIcon(:quantity='hostageQuantity')
  .d-flex.justify-content-center.bi-number-style-wrap
    i.bi.bi-number-style(v-for='item in GameRoundSettingPanel' :key='item.key' :class='item.active?`bi-${item.key}-circle-fill`:`bi-${item.key}-circle`' @click='changeGameRound(item.key)')
</template>

<script lang="ts">
import ExchangeIcon from '@/components/ExchangeIcon.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import { ref, Ref, defineComponent,computed } from 'vue'
interface GameRoundSetting {
  key: number,
  hostageQuantity: number,
  desc: string,
  active: boolean
}
export default defineComponent({
  name: 'GameConfigurationSection',
  components: {
    CountdownTimer,
    ExchangeIcon
  },
  setup() {
    const GameRoundSettingPanel: Ref<GameRoundSetting[]> = ref([
      {
        key: 1,
        hostageQuantity: 3,
        desc: '',
        active: true
      }, {
        key: 2,
        hostageQuantity: 2,
        desc: '',
        active: false
      }, {
        key: 3,
        hostageQuantity: 2,
        desc: '',
        active: false
      }, {
        key: 4,
        hostageQuantity: 1,
        desc: '',
        active: false
      }, {
        key: 5,
        hostageQuantity: 1,
        desc: '',
        active: false
      }
    ])
    const roundNumber = computed(() => {
      return GameRoundSettingPanel.value.find(x=>x.active===true)?.key
    })
    const hostageQuantity = computed(() => {
      return GameRoundSettingPanel.value.find(x=>x.active===true)?.hostageQuantity
    })
    function changeGameRound(params:number) {
      GameRoundSettingPanel.value.forEach((x)=>{
        if(x.key===params){
          x.active=true
        }else{
          x.active=false
        }
      })
    }
    return {
      GameRoundSettingPanel,
      roundNumber,
      hostageQuantity,
      changeGameRound
    }
  }
})
</script>

<style scoped>
.bi-slash-lg-style {
  font-size: 2rem;
  margin: 0 24px;
}
.bi-number-style-wrap{
  gap: 0 1rem;
}
.bi-number-style{
  font-size: 1.5rem;
}
.title-font-style {
  font-size: 2.5rem;
  font-weight: 700;
}
.wrapper{
  height: 100%;
}
</style>
