<template lang="pug">
LayoutContainer(:data='groupedChar' :config='config')
</template>
<script lang="ts">
import LayoutContainer from '@/components/common/LayoutContainer.vue';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
import Role from '@/interfaces/RoleInterface';
import _ from 'lodash';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
    name: 'GameDashboard',
    components: {
        LayoutContainer
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        let MAX_CARDS_PER_SECTION = 5
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
        const count = computed(() => store.state.gameSetting?.roles?.some((role:Role) => role.color === 'grey') ? 2 : 1);

        function filterRolesByColor(roles: GroupedRoles[], color: string) {
            return _.flatMap(roles, item => _.filter(item.roles, { color }));
        }
        function groupedRoles(roles: GroupedRoles[]) {
            const roleCount = store.state.gameSetting?.roles?.reduce((acc:number, item:GroupedRoles) => acc + item.roles.length, 0)

            const colorSet = new Set<string>();
            roles.forEach(item => {
                item.roles.forEach(role => {
                    colorSet.add(role.color);
                });
            });
            const colorRoles: Record<string, Role[]> = {};
            colorSet.forEach(color => {
                colorRoles[color] = filterRolesByColor(roles, color);
            });
            const rightSide: Role[] = [];
            const leftSide: Role[] = [];
            leftSide.push(...colorRoles['red'] || [])
            rightSide.push(...colorRoles['blue'] || [])
            
            if (colorRoles['grey']) {
                const greyRoles = colorRoles['grey'];
                const pairedRoles = _.groupBy(greyRoles, 'pair');
                const pairs = Object.values(pairedRoles);
                const halfPairLength = Math.ceil(pairs.length / 2);
                const leftPairs = pairs.slice(0, halfPairLength);
                const rightPairs = pairs.slice(halfPairLength);
                leftSide.push(..._.flatten(leftPairs));
                rightSide.push(..._.flatten(rightPairs));
            }
            leftSide.push(...colorRoles['green'] || [])
            rightSide.push(...colorRoles['purple'] || [])
            leftRound.value = setCardSection(leftSide);
            rightRound.value = setCardSection(rightSide);
            return [leftRound, rightRound];
        }
        function setCardSection(data: Role[]) {
            // 1. 沒有考慮到 data 可能是 undefined 的情況，應該先檢查 data
            if (!data) return [[], []];
            
            // 2. 當 data 是空陣列時，直接返回空的二維陣列
            if (data.length === 0) return [[], []];
            
            // 3. 使用 _.groupBy 時沒有考慮到 pair 可能是 undefined 的情況
            const pairedRoles = _.groupBy(data, role => role.pair || 'unpaired');
            
            const pairs = Object.values(pairedRoles);
            const halfPairLength = Math.ceil(pairs.length / 2);
            const upPairs = _.flatten(pairs.slice(0, halfPairLength));
            const downPairs = _.flatten(pairs.slice(halfPairLength));
            
            // 4. 返回值的格式不一致，應該加上空格提高可讀性
            return [upPairs, downPairs];
        }
        const config: object = {
            space: count.value,
            maxCardCount: MAX_CARDS_PER_SECTION
        }
        return {
            config, groupedChar
        }
    }
})
</script>
<style lang="scss" scoped></style>
