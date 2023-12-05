<template lang="pug">
.wrap.position-relative
    .d-flex.h-100
        GroupedCharPanel.pannel-wrap( v-for='(item,i) in data'  :data='item.value' :cardWidth='cardWidth')
    GameConfigurationSection(:configBgc='config.configBgc').position-absolute.config-wrap
</template>
<script lang="ts">
import _ from 'lodash';
import GroupedCharPanel from '@/components/normal/GroupedCharPannel.vue'
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import Role from '@/interfaces/RoleInterface';
import Config from '@/interfaces/ConfigInterface';
import {  ref,computed,defineComponent,onMounted,onBeforeUnmount,PropType } from 'vue'
export default defineComponent({
    name: 'NormalPanel',
    components: {
        GameConfigurationSection,
        GroupedCharPanel
    },
    props: {
        data: {
            type: Array as PropType<Role[][]>,
            required: true
        },
        config: {
            type: Object as PropType<Config>,
            required: true
        },
    },
    //:data='groupedChar' :config='config'
    setup({data,config}) {
        const screenWidth = ref(window.innerWidth);
        const cardWidth =  computed(() => {
            let _unit=screenWidth.value>1280?48:12
            let _count=config.space*2
            console.log(_unit, _count);
            return (((screenWidth.value-200)/2)-(_unit*_count*2))/(config.maxCardCount);
        })
        const updateScreenWidth = () => {
            screenWidth.value = window.innerWidth;
            console.log(cardWidth.value);
        };

        onMounted(() => {
            window.addEventListener('resize', updateScreenWidth);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateScreenWidth);
        });
        return {
            cardWidth
        }


    }
})
</script>

<style lang="scss" scoped>
.wrap {
    width: 100vw;
    height: 100vh;
    background-color: #666;

    .h-100 {
        height: 100%;
    }
}

.pannel-wrap {
    width: calc(50% - ($configuration-width/2));
}

.pannel-wrap+.pannel-wrap {
    margin-left: $configuration-width;
}

.config-wrap {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}</style>