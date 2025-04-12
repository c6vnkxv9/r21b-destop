<template lang="pug">
.wrap.position-relative
    .d-flex.h-100
        NavigationSidebar.pannel-wrap( v-for='(item,i) in groupedChar'  :data='item.value' :color='BACKGROUND_COLOR')
    GameConfigurationSection.position-absolute.config-wrap(:leftColor='CONFIGURATION_COLOR',:rightColor='CONFIGURATION_COLOR')
</template>
<script lang="ts">
import _ from 'lodash';
import NavigationSidebar from '@/components/common/NavigationSidebar.vue'
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import { ref, Ref, computed, defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex';
import Role from '@/interfaces/RoleInterface';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
export default defineComponent({
    name: 'LahPanel',
    components: {
        GameConfigurationSection,
        NavigationSidebar
    },
    setup() {
        const store = useStore();
        const leftRound = ref<Role[]>([])
        const rightRound = ref<Role[]>([])
        const CONFIGURATION_COLOR:string = '#636564'
        const BACKGROUND_COLOR:string = '#808080'
        const groupedChar = computed(() => {
            let roles: GroupedRoles[] = store.state.gameSetting?.roles
            if (roles) {
                return groupedRoles(roles)
            }
            return [[], []]
        });
        function groupedRoles(roles: GroupedRoles[]) {
            const blueRoles = _.flatMap(roles, item => _.filter(item.roles, { color: 'blue' }));
            const redRoles = _.flatMap(roles, item => _.filter(item.roles, { color: 'red' }));
            const greyRoles = _.flatMap(roles, item => _.filter(item.roles, { color: 'grey' }));
            const more:Boolean = greyRoles?.length>12?true:false
            if (more) {
                const _rest = greyRoles.length-12
                leftRound.value = [...redRoles,...blueRoles,...greyRoles.slice(0).slice(12, 100) ]
                rightRound.value = [...greyRoles.slice(0).slice(0, 12)]
            } else {
                leftRound.value = [...redRoles,...blueRoles ]
                rightRound.value = [...greyRoles]
            }
            return [leftRound, rightRound]
        }

        // const screenWidth = ref(window.innerWidth);
        // const cardGroupCount =  computed(() => {
        //     const uniqueColors = _.uniqBy(store.state.gameSetting?.roles, 'color');
        //     return uniqueColors.length;
        // });
        // const cardWidth =  computed(() => {
        //     let _unit=screenWidth.value>1280?48:12
        //     let _count=cardGroupCount.value*2
        //     return (screenWidth.value-200-_unit*_count)/5;
        // })
        // const updateScreenWidth = () => {
        //     screenWidth.value = window.innerWidth;
        // };

        // onMounted(() => {
        //     window.addEventListener('resize', updateScreenWidth);
        // });

        // onBeforeUnmount(() => {
        //     window.removeEventListener('resize', updateScreenWidth);
        // });
        return {
            groupedChar, BACKGROUND_COLOR,CONFIGURATION_COLOR
        }


    }
})
</script>

<style lang="scss" scoped>
.wrap {
    width: 100vw;
    height: 100vh;

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