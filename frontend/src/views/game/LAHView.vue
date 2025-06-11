<template lang="pug">
LayoutContainer(:data='groupedChar' :config='config')
</template>
<script lang="ts">
import LayoutContainer from '@/components/common/LayoutContainer.vue'
import Role from '@/interfaces/RoleInterface';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
import { ref, watch, defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import _ from 'lodash';
export default defineComponent({
    name: 'GameDashboard',
    components: {
        LayoutContainer,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        let MAX_ROLES_PER_QUADRANT = 6
        watch(store.state.gameSetting, (newValue: object) => {
            if (_.isEmpty(newValue)) {
                router.push({ name: 'home' });
            }
        }, { immediate: true });

        const leftRound = ref<Role[][]>([])
        const rightRound = ref<Role[][]>([])
        const groupedChar = computed(() => {
            let roles: GroupedRoles[] = store.state.gameSetting?.roles
            if (roles) {
                return groupedRoles(roles)
            }
            return [[], []]
        });
        function groupedRoles(roles: GroupedRoles[]) {
            const filterRolesByColor = (color:string) => _.flatMap(roles, item => _.filter(item.roles, { color }));
            const blueRoles = filterRolesByColor('blue');
            const redRoles = filterRolesByColor('red');
            const greyRoles = _.flatMap(roles, item => _.filter(item.roles, { color: 'grey' }))
                .sort((a, b) => a.pair - b.pair);
            const [specialGreyRoles, normalGreyRoles] = _.partition(greyRoles, role => [18, 19].includes(role.pair));
            const firstQuadrantData = [...redRoles, ...blueRoles];
            const [secondQuadrantData ,thirdQuadrantData]= _.partition(normalGreyRoles, role => [12, 13,14].includes(role.pair));
            const fourthQuadrantData = specialGreyRoles;

            leftRound.value = [firstQuadrantData, fourthQuadrantData];
            rightRound.value = [secondQuadrantData, thirdQuadrantData];
            return [leftRound, rightRound];
        }

        const config: object = {
            space: 1,
            maxCardCount: MAX_ROLES_PER_QUADRANT,
            configBgc: ['#636564', '#636564']
        }
        return {
            config, groupedChar
        }
    }
})
</script>
<style lang="scss" scoped>
.wrap {
    width: 100vw;
    height: 100vh;
    //background-color: #666;
}
</style>
