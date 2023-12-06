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
        let LENGTH=5
        watch(store.state.gameSetting, (newValue:object) => {
            if (_.isEmpty(newValue)) {
                router.push({ name: 'home' });
            }
        },{immediate:true});

        const leftRound = ref<Role[][]>([])
        const rightRound = ref<Role[][]>([])
        const BACKGROUND_COLOR = ['#CC333C', '#5595D5']
        const groupedChar = computed(() => {
            let roles: GroupedRoles[] = store.state.gameSetting?.roles
            if (roles) {
                return groupedRoles(roles)
            }
            return [[], []]
        });
        const count = computed(() => {
            const flag=store.state.gameSetting?.roles?.some((x: { color: string; })=>x.color=='grey')
            return flag?2:1
        });
        function groupedRoles(roles: GroupedRoles[]) {
            const blueRoles = _.flatMap(roles, item => _.filter(item.roles, { color: 'blue' }));
            const redRoles = _.flatMap(roles, item => _.filter(item.roles, { color: 'red' }));
            const greyRoles = _.flatMap(roles, item => _.filter(item.roles, { color: 'grey' }));
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
        function setCardSection(data:Role[]){
        if(data){
            return[data.slice(0).slice(0,LENGTH),data.slice(0).slice(LENGTH,1000)]
        }
        return [[],[]]
    };
        const config:object={
            space:count.value,
            maxCardCount:LENGTH
        }
        return {config,groupedChar
        }
    }
})
</script>
<style lang="scss" scoped>
</style>
