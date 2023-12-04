<template lang="pug">
NormalPanel
</template>
<script lang="ts">
import NormalPanel from '@/components/normal/NormalPanel.vue'
import { ref, watch, defineComponent } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import _ from 'lodash';
export default defineComponent({
    name: 'GameDashboard',
    components: {
        NormalPanel
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        watch(store.state.gameSetting, (newValue) => {
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
</style>
