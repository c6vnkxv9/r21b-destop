<template lang="pug">
.d-flex.justify-content-center
    .card-wrap(v-for='item in data')
        p {{ item.label }}
        p {{ item.desc }}
        img(:src='getImageSrc(item.pair)')
</template>
<script lang="ts">
import { computed, defineComponent,PropType } from 'vue'
import Role from '@/interfaces/RoleInterface';
export default defineComponent({
  name: 'CardSection',
  props: {
        data: {
            type: Array as PropType<Role[]>,
            required: true
        },
    },
  setup (props, { emit }) {
    function getImageSrc(src:string) {
        let images = require.context('@/assets/', false, /\.jpg$/);
    return  `https://picsum.photos/id/${src}/200/300`
  }
    return {getImageSrc}
  }
})
</script>
<style scoped>
.home{
width: 100vw;
height: 100vh;
}
</style>
  