<template lang="pug">
.wrap
    .banner-wrap
        .mx-1280
            .banner-img-wrap
                img(src='@/assets/pic/logo.svg')
    .setting-wrap.mx-1280
        h1.title-style.text-start.mb-6 創建遊戲
        .d-flex
            .d-flex
                p 卡片牌局：
                BFormSelect(v-model="selectedModeId" :options="roleOptions")
                
            div
                i( class="bi bi-person-badge")
                p.d-inline-block 人數：
        BFormGroup(v-slot="{ ariaDescribedby }")
            BFormCheckbox.d-block(
            v-for="pair in filteredRoles"
            v-model="selectedPairId"
            :key="pair.pair"
            :value="pair.pair"
            :aria-describedby="ariaDescribedby"
            name="flavour-3a")
                .d-flex.justify-content-between
                    p(v-for="person in pair.roles" )
                        i( class="bi bi-person-badge icon-color" :style='SetTeamColor(person.color)') 
                        | {{ person.label }}
</template>
<script lang="ts">
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BFormSelect, BFormCheckboxGroup,BFormCheckbox,BFormGroup } from 'bootstrap-vue-3'
import { ref, Ref,watch, defineComponent } from 'vue'
import charactersData from '@/assets/data/characters.json'
import colorList from '@/assets/data/colorList.json'
import script from '@/assets/data/script.json'
interface RoleOptions {
    value: number;
    text: string;
}
interface Role{
    key: string;
    role: string;
    color: string;
    label: string;
    desc: string;
    pair: number;
    src: string;
}
interface GroupedRoles{
    pair: Number;
    roles: Role[]
}
export default defineComponent({
    components: {
        BFormSelect, BFormCheckboxGroup,BFormCheckbox,BFormGroup
  },
    setup() {
        const roleOptions: RoleOptions[] = script.map(x => ({ value: x.key, text: x.label }));
        const selectedModeId = ref<number>(roleOptions[0].value);
        const selectedPairId = ref<string[]>([]);
        const filteredRoles=ref<GroupedRoles[]>([])

        watch(selectedModeId, (newValue) => {
            const list=getRelatedRoleKeys(newValue)
            const roles=filterRolesByKeys(list)
            filteredRoles.value=pairRoleList(roles)

        }, { immediate: true });
        function getRelatedRoleKeys(newValue:number){
            let list:string[]=[]
            const item = script.find(s => s.key === newValue);
            if (item) {
                list = item.required.concat(item.options);
            }
            return list
        }
        function filterRolesByKeys(selectedList:string[]){
            const list =charactersData.filter(x=>selectedList.includes(x.key))
            return list
        }
        function pairRoleList(list:Role[]){
            return list.reduce((acc,arr)=>{
                const item=acc.find(x=>x.pair==arr.pair)
                if(item){
                    item.roles.push(arr)
                }else{
                    acc.push({pair:arr.pair,roles:[arr]})
                }
                return acc
            },[]as GroupedRoles[])
        }
        function SetTeamColor(color:string){
            let colorHex=colorList.find(x=>x.label==color)?.color
            return {'--color':colorHex}
        }
        return {
            roleOptions, selectedModeId, filteredRoles,selectedPairId,SetTeamColor
        };
    }
});
</script>
<style lang="scss" scoped>
.icon{
    font-size: 20px;
    color: #000;
}
.icon-color{
    color: var(--color);
}
.banner-wrap {
    background-color: #4a1212;
    padding: 20px 0;
}

.mx-1280 {
    margin: 0 auto;
    max-width: 1280px;
}

.banner-img-wrap {}

.mb-6 {
    margin-bottom: 24px;
}

.setting-wrap {
    padding: 24px 48px;
}

.title-style {
    color: #282828;
    font-size: 32px;
    font-weight: 500;
}</style>