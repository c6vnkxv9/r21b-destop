<template lang="pug">
.char-panel(:style="{ backgroundColor: color}")
    .block(v-for='(item,i) in groupedChar')
        p {{ item }}
</template>
<script lang="ts">
// import _ from 'lodash';
import { ref, Ref, computed, defineComponent } from 'vue'
import Role from '@/interfaces/RoleInterface';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
export default defineComponent({
    name: 'GroupedCharPannel',
    components: {
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
    setup({data}) {
        const groupedChar = computed(() => {
        let LENGTH=5
        console.log(data.length);
        if(data){
            return[data.slice(0).slice(0,LENGTH),data.slice(0).slice(LENGTH,1000)]
        }
        return [[],[]]
    });

        return {groupedChar
        }
    }
})
</script>
<style lang="scss" scoped>
.char-panel{
    height:100%
}
</style>
    