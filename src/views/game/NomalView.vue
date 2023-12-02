<template lang="pug">
NomalPannel
</template>
<script lang="ts">
import NomalPannel from '@/components/nomal/NomalPannel.vue'
import { ref, watch, defineComponent } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import _ from 'lodash';
export default defineComponent({
    name: 'GameDashboard',
    components: {
        NomalPannel
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
