<template lang="pug">
BModal(
    v-model='showLoc',
    hide-footer,
    hide-header,
    centered,
    modalClass='backdrop-blur',
    content-class='p-6 position-relative'
)
  i.bi.bi-x-lg.close-icon.position-absolute.cursor(@click="closeModal")
  i.d-block.text-center.bi.bi-exclamation-octagon-fill.fs-48.icon-color
  p.mb-0.text-center 角色人數已達系統上限20人。
  p.mb-0.text-center 請取消不需要的角色後，再開始遊戲。
</template>
<script lang="ts">
import { BModal } from 'bootstrap-vue-3'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'GameDashboard',
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    BModal
  },
  setup (props, { emit }) {
    const showLoc = computed({
      get: () => props.show,
      set: (v) => emit('update:show', v)
    });
    function closeModal(){
      emit('update:modalShow', false);
      showLoc.value=!showLoc.value
      console.log(showLoc.value);
    }
    return {showLoc ,closeModal}
  }
})
</script>

<style lang="scss" scoped>
.icon-color{
  color:$red-icon-color
}
.close-icon{
  top: 12px;
  right: 12px;
}
.fs-48{
  font-size: 48px;
}
</style>