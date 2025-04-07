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
            const leftSide: Role[] = [];
            const rightSide: Role[] = [];
            const colorCounts: Record<string, number> = {};
            colorSet.forEach(color => {
                colorCounts[color] = colorRoles[color].length;
            });
            const sortedColors = Array.from(colorSet).sort((a, b) => colorCounts[b] - colorCounts[a]);
            let leftColorCount = 0;
            let rightColorCount = 0;
            sortedColors.forEach(color => {
                const roles = colorRoles[color];
                
                if (leftColorCount < 2 && leftSide.length + roles.length <= 10) {
                    leftSide.push(...roles);
                    leftColorCount++;
                } else if (rightColorCount < 2 && rightSide.length + roles.length <= 10) {
                    rightSide.push(...roles);
                    rightColorCount++;
                } else {
                    const leftRemaining = 10 - leftSide.length;
                    const rightRemaining = 10 - rightSide.length;
                    
                    if (leftRemaining > 0 && leftSide.length <= rightSide.length) {
                        leftSide.push(...roles.slice(0, leftRemaining));
                        rightSide.push(...roles.slice(leftRemaining));
                    } else if (rightRemaining > 0) {
                        rightSide.push(...roles.slice(0, rightRemaining));
                        leftSide.push(...roles.slice(rightRemaining));
                    }
                }
            });
            leftRound.value = setCardSection(leftSide);
            rightRound.value = setCardSection(rightSide);
            return [leftRound, rightRound];
        }
        function setCardSection(data: Role[]) {
            if (data) {
                return [data.slice(0, MAX_CARDS_PER_SECTION), data.slice(MAX_CARDS_PER_SECTION, 1000)];
            }
            return [[], []];
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
