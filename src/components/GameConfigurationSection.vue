<template lang="pug">
.wrapper.d-flex.justify-content-center.align-items-center
  p.title-font-style Round 3
  p /
  div
    CountdownTimer
  p /
  .exchange-wrap
    ExchangeIcon(:quantity='3')
</template>

<script lang="ts">
import ExchangeIcon from '@/components/ExchangeIcon.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'GameConfigurationSection',
  components: {
    CountdownTimer,
    ExchangeIcon
  },
  setup () {
    const title = ref('這是一個標題')
    const description = ref('這是一段描述文字。')

    return {
      title,
      description
    }
  }
})
</script>

<style scoped>
.title-font-style {
  font-size: 2.5rem;
  font-weight: 700;
}
.wrapper{
  padding: 100px;
}
.exchange-wrap{
  margin-left: 4rem;
}
</style>
