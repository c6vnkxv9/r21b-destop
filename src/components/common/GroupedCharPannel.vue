<template lang='pug'>
.char-panel(:style="{ backgroundColor: color}")
    CardSection.card-section-wrap(v-for='(item,i) in groupedChar' :data='item')
        p {{ item }}
</template>
<script lang="ts">
// import _ from 'lodash';
import { ref, Ref, computed, defineComponent,PropType } from 'vue'
import CardSection from '@/components/common/CardSection.vue'
import Role from '@/interfaces/RoleInterface';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
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
<style lang='scss' scoped>
$lg-length:48px;
$sm-length:12px;
.char-panel{
    
.card-section-wrap{
    height:calc(50% - ($configuration-height/2));
    width: 100%;
    padding:$lg-length;
    @media screen and (max-width: 1280px) {
        padding:$sm-length;
}
}
.card-section-wrap+.card-section-wrap{
margin-top:$configuration-height;
}
}
</style>
    