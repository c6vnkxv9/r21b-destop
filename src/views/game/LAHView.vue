<template lang="pug">
.wrap
    GameConfigurationSection
    NomalPannel
</template>
<script lang="ts">
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import NomalPannel from '@/components/nomal/NomalPannel.vue'
import { ref, watch, defineComponent } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import _ from 'lodash';
export default defineComponent({
    name: 'GameDashboard',
    components: {
        NomalPannel,
        GameConfigurationSection
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        watch(store.state.gameSetting, (newValue) => {
            if (_.isEmpty(newValue)) {
                router.push({ path: `/setting` });
            }
        });

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
}
</style>
