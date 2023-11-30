<template lang="pug">
BModal(
    v-model='showLoc',
    hide-footer,
    hide-header,
    centered,
    modalClass='backdrop-blur',
    dialog-class='rounded-0 w-100 h-100 m-0 p-0',
    body-class='rounded-0 m-0 p-0',
    content-class='border-0 rounded-0 w-100 h-100'
)
  i.text-center.exclamation-octagon-fill.fs-6 
  p.mb-0 角色人數已達上限20人，無法再新增角色。
  p.mb-0 如需更改角色，請取消不需要的角色再新增其他角色。
    //-   hide-header-close,
    //- no-close-on-backdrop,
    //- no-close-on-esc,
    //- no-enforce-focus,
    //- scrollable,
    //- no-fade,
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
    return {showLoc
    }
  }
})
</script>

<style lang="scss" scoped>
.backdrop-blur {
  will-change: backdrop-filter;
  backdrop-filter: blur(5px);
}
</style>