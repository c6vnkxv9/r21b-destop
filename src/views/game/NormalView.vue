<template lang="pug">
LayoutContainer(:data='groupedChar' :config='config')
</template>
<script lang="ts">
import LayoutContainer from '@/components/common/LayoutContainer.vue'
import Role from '@/interfaces/RoleInterface';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
import { ref, watch, defineComponent, Ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import _ from 'lodash';
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
        const count = computed(() => store.state.gameSetting?.roles?.some(role => role.color === 'grey') ? 2 : 1);

        function filterRolesByColor(roles: GroupedRoles[], color: string) {
            return _.flatMap(roles, item => _.filter(item.roles, { color }));
        }
        function groupedRoles(roles: GroupedRoles[]) {
            const blueRoles = filterRolesByColor(roles, 'blue');
            const redRoles = filterRolesByColor(roles, 'red');
            const greyRoles = filterRolesByColor(roles, 'grey');
            const more = blueRoles?.length + greyRoles?.length - 10
            if (more > 0) {
                const _rest = 10 - blueRoles.length || 0
                leftRound.value = setCardSection([...redRoles, ...greyRoles.slice(0).slice(_rest, 100)])
                rightRound.value = setCardSection([...blueRoles, ...greyRoles.slice(0).slice(0, _rest)])
            } else {
                leftRound.value = setCardSection([...redRoles])
                rightRound.value = setCardSection([...blueRoles, ...greyRoles])
            }
            return [leftRound, rightRound]
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
