<template lang='pug'>
.char-panel
    CardSection.card-section-wrap(v-for='(item,i) in data' :data='item' :cardWidth='cardWidth')
</template>
<script lang="ts">
import { ref, Ref, computed, defineComponent, PropType } from 'vue'
import CardSection from '@/components/normal/CardSection.vue'
import Role from '@/interfaces/RoleInterface';
export default defineComponent({
    name: 'GroupedCharPannel',
    components: {
        CardSection
    },
    props: {
    data: {
        type: Array as PropType<Role[]>,
        required: true
    },
    cardWidth: {
        type: Number,
        default: 100 // 或者您想要的任何預設值
    },
},
    setup({ data }) {
    }
})
</script>
<style lang='scss' scoped>
.char-panel {

    .card-section-wrap {
        height: calc(50% - ($configuration-height/2));
        width: 100%;
        
    }

    .card-section-wrap+.card-section-wrap {
        margin-top: $configuration-height;
    }
}
</style>
    