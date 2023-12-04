<template lang="pug">
.wrap.position-relative
    .d-flex.h-100
        GroupedCharPannel.pannel-wrap( v-for='(item,i) in groupedChar'  :data='item.value' :color='COLOR_LIST[i]')
    GameConfigurationSection.position-absolute.config-wrap
</template>
<script lang="ts">
import _ from 'lodash';
import GroupedCharPannel from '@/components/normal/GroupedCharPannel.vue'
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import { ref, Ref, computed, defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex';
import Role from '@/interfaces/RoleInterface';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
export default defineComponent({
    name: 'NormalPanel',
    components: {
        GameConfigurationSection,
        GroupedCharPannel
    },
    setup() {
        const store = useStore();
        const leftRound = ref<Role[]>([])
        const rightRound = ref<Role[]>([])
        const COLOR_LIST = ['#CC333C', '#5595D5']
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
            const more = blueRoles?.length + greyRoles?.length - 10
            if (more > 0) {
                const _rest = 10 - blueRoles.length || 0
                leftRound.value = [...redRoles, ...greyRoles.slice(0).slice(_rest, 100)]
                rightRound.value = [...blueRoles, ...greyRoles.slice(0).slice(0, _rest)]
            } else {
                leftRound.value = [...redRoles]
                rightRound.value = [...blueRoles, ...greyRoles]
            }
            return [leftRound, rightRound]
        }

        const screenWidth = ref(window.innerWidth);
        const cardGroupCount =  computed(() => {
            const uniqueColors = _.uniqBy(store.state.gameSetting?.roles, 'color');
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
        return {
            groupedChar, COLOR_LIST
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