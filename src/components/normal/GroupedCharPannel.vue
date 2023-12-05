<template lang='pug'>
.char-panel(:style="{ backgroundColor: color}")
    CardSection.card-section-wrap(v-for='(item,i) in groupedChar' :data='item')
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
        color: {
            type: String,
            required: true
        },
    },
    setup({ data }) {
        //return {groupedChar}
    }
})
</script>
<style lang='scss' scoped>
.char-panel {

    .card-section-wrap {
        height: calc(50% - ($configuration-height/2));
        width: 100%;
        padding: $lg-length;

        @media screen and (max-width: 1280px) {
            padding: $sm-length;
        }
    }

    .card-section-wrap+.card-section-wrap {
        margin-top: $configuration-height;
    }
}
</style>
    