<template lang="pug">
div
    p Card Zone 1
    .d-flex(v-for="(pair,index) in localData" )
        .mr-1.cursor(@click='setStatus(pair,index)')
            i(class='bi' :class='setSingleCheckColor(pair.checked)') 
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
import cloneDeep from 'lodash/cloneDeep';
import colorList from '@/assets/data/colorList.json'
import { defineComponent, PropType, ref, Ref, watch } from 'vue'
export default defineComponent({
    name: 'GroupCardPanel',
    props: {
        data: {
            type: Array as PropType<GroupedRoles[]>,
            default: () => []
        }
    },
    setup(props) {
        const colorListTyped: ColorItem[] = colorList as ColorItem[];
        const localData = ref<GroupedRoles[]>([]);
        watch(() => props.data, (newValue) => {
            localData.value = newValue;
        }, { immediate: true });
        function SetTeamColor(color: string) {
            let colorHex = colorListTyped.find(x => x.label == color)?.color
            return { '--color': colorHex }
        }
        function setSingleCheckColor(status) {
            if (status) {
                return 'bi-check-square-fill fill-color'
            }
            return 'bi-square'
            //dash-square
        }
        function setStatus(pair, index) {
            if(!pair.required){
                console.log(pair.required);
                localData.value[index].checked = !pair.checked;
            }
        }
        return { localData, SetTeamColor, setStatus, setSingleCheckColor }

    }
}
)
</script>
<style lang="scss">
.icon-color {
    color: var(--color);
}
.cursor{
    cursor:pointer;
}
.mr-1 {
    margin-right: 12px
}

.pole-style {}
</style>