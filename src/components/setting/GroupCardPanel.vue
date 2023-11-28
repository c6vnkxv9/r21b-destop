<template lang="pug">
div
    p.text-start.title-style.cursor(@click='setGroupStatus()')
        i.mr-1(:class='groupedStatusStyle' ) 
        | 角色-zone {{ index+1 }}
    .d-flex.roles-style.cursor(v-for="(pair,index) in data" @click='setSingleStatus(pair,index)')
        .mr-1
            i(class='bi' :class='setSingleCheckColor(pair.checked,pair.required)') 
        .d-flex.justify-content-between.flex-grow-1
            p.pole-style.w-50.text-start(v-for="person in pair?.roles" )
                i( class="bi bi-person-badge icon-color" :style='SetTeamColor(person.color)') 
                | {{ person.label }}
</template>
<script lang="ts">
interface GroupedRoles {
    pair: Number;
    required: Boolean;
    checked: Boolean;
    roles: Role[]
}
interface Role {
    key: string;
    role: string;
    color: string;
    label: string;
    desc: string;
    pair: number;
    src: string;
}
type ColorItem = {
    label: string;
    color: string;
};
import colorList from '@/assets/data/colorList.json'
import { defineComponent,computed, PropType, ref } from 'vue'
export default defineComponent({
    name: 'GroupCardPanel',
    props: {
        data: {
            type: Array as PropType<GroupedRoles[]>,
            default: () => []
        },
        index:{
            type:Number
        }
    },
    setup(props,{ emit }) {
       
        const colorListTyped: ColorItem[] = colorList as ColorItem[];
        const groupLength = computed(() => {
            return props.data.length
        })
        const groupedStatusLength = computed(() => {
            return props.data.filter(x=>x.checked).length
        })
        const groupedStatusStyle = computed(() => {
            if(groupedStatusLength.value ==groupLength.value){
                return 'bi bi-check-square-fill fill-color'
            }else if(groupedStatusLength.value >0){
                return 'bi bi-dash-square'
            }
            return 'bi bi-square'
        });
        // watch(() => props.data, (newValue) => {
        //     props.data = cloneDeep(newValue);
        // }, { immediate: true });
        function SetTeamColor(color: string) {
            let colorHex = colorListTyped.find(x => x.label == color)?.color
            return { '--color': colorHex }
        }
        function setSingleCheckColor(status:boolean,required:boolean) {
            if(required){
                return 'bi-check-square-fill checked-disable-color'
            }else if (status) {
                return 'bi-check-square-fill fill-color'
            }
            return 'bi-square'
            //dash-square
        }
        function setGroupStatus(){
            const status=groupLength.value==groupedStatusLength.value?false:true
            emit('setGroupStatus', props.index,status);
        }
        function setSingleStatus(pair:GroupedRoles, index:number) {
            emit('setSingleStatus', props.index,index);
        }
        return { SetTeamColor,groupedStatusStyle, setSingleStatus,setGroupStatus, setSingleCheckColor }

    }
}
)
</script>
<style lang="scss" scoped>
.checked-disable-color{
    color: #646464;
}
.icon-color {
    color: var(--color);
}
.mr-1 {
    margin-right: 12px
}
.roles-style{
    padding: 4px;
    border-radius: 4px;
}
.roles-style:hover{
    background-color: #EFF1F3;
}
.roles-style+.roles-style{
    margin-top: 4px;
}
.title-style{
    color: #282828;
font-size: 24px;
font-weight: 700;
margin-bottom: 24px;
}
</style>