<template lang="pug">
.w-100
  .d-flex.justify-content-center
    .card-wrap.position-relative(v-for='item in data' :class='item.color' :style="`background-image: url('./${item.src}')`")
      .card-panel.d-flex.justify-content-center
          p.ver-text.card-title.m-0 {{ item.label }}
          p.ver-text.card-desc.m-0(:class='item.color') {{ item.desc }}
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
    return  `./${src}`
  }
    return {getImageSrc}
  }
})
</script>
<style scoped lang="scss">
// 定义颜色和阴影变量
$red: $info-red;
$blue: $info-blue;
$grey: $info-grey;
$shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);

.home {
    width: 100vw;
    height: 100vh;
}
.card-wrap{
    width: 20%;
    height: calc((100vh - (48px * 4) - 100px) / 2);
    background-size: cover;
    background-position: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: $shadow;
    border:1px solid #fff;
}
.card-panel {
    width: 100%;
    height: 100%;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    padding: 24px 16px 0px 16px;
    &.red {
        border-color: $red;
    }

    &.blue {
        border-color: $blue;
    }

    &.grey {
        border-color: $grey;
    }

    @media screen and (max-width: 1280px) {
        height: calc((100vh - (12px * 4) - 100px) / 2);
        padding: 32px 16px 0px 16px;
    }
}

.card-title {
    color: #FFF;
    font-size: 20px;
    font-weight: 500;
}

.card-desc {
    font-size: 14px;
    font-weight: 400;

    &.red {
        color: $red;
    }

    &.blue {
        color: $blue;
    }

    &.grey {
        color: $grey;
    }
}

.ver-text {
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;
}
</style>
