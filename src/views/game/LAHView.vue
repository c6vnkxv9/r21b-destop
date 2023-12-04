<template lang="pug">
.wrap
    LahPanel
</template>
<script lang="ts">
import LahPanel from '@/components/lah/LahPanel.vue'
import { ref, watch, defineComponent } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import _ from 'lodash';
export default defineComponent({
    name: 'GameDashboard',
    components: {
        LahPanel,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        watch(store.state.gameSetting, (newValue:object) => {
            if (_.isEmpty(newValue)) {
                router.push({ name: 'home' });
            }
        },{immediate:true});
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
