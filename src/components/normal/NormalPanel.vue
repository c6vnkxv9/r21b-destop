<template lang="pug">
.wrap.position-relative
    .d-flex.h-100
        GroupedCharPanel.pannel-wrap( v-for='(item,i) in data'  :data='item.value' :color='config.bgc[i]')
    GameConfigurationSection(:configBgc='config.configBgc').position-absolute.config-wrap
</template>
<script lang="ts">
import _ from 'lodash';
import GroupedCharPanel from '@/components/normal/GroupedCharPanel.vue'
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
        const cardGroupCount =  computed(() => {
            const _flattenArray=_.flatten(data)
            const uniqueColors = _.uniqBy(_flattenArray, 'color');
            return uniqueColors.length;
        });
        const cardWidth =  computed(() => {
            let _unit=screenWidth.value>1280?48:12
            let _count=cardGroupCount.value*2
            return (screenWidth.value-200-_unit*_count)/5;
        })
        const updateScreenWidth = () => {
            screenWidth.value = window.innerWidth;
        };

        onMounted(() => {
            window.addEventListener('resize', updateScreenWidth);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateScreenWidth);
        });
        //config.cardWidth
        return {
            
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