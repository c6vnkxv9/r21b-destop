<template lang="pug">
.wrap.position-relative
    .d-flex.h-100
        NavigationSidebar.pannel-wrap( v-for='(item,i) in data'  :data='item.value' :cardWidth='cardWidth')
    GameConfigurationSection(:configBgc='config.configBgc').position-absolute.config-wrap
</template>
<script lang="ts">
import NavigationSidebar from '@/components/common/NavigationSidebar.vue';
import GameConfigurationSection from '@/components/GameConfigurationSection.vue';
import Config from '@/interfaces/ConfigInterface';
import Role from '@/interfaces/RoleInterface';
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
export default defineComponent({
    name: 'LayoutContainer',
    components: {
        GameConfigurationSection,
        NavigationSidebar
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
    setup({data,config}) {
        const screenWidth = ref(window.innerWidth);
        const cardWidth =  computed(() => {
            let _unit=screenWidth.value>1280?48:12
            let _count=config.space*2
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
    background-color: rgb(128, 128, 128);

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
}
</style>