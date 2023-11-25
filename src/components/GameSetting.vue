<template lang="pug">
.wrap.position-relative
    .banner-wrap
        .mx-1280
            .banner-img-wrap
                img(src='@/assets/pic/logo.svg')
    .setting-wrap.mx-1280.flex-grow-1
        h1.title-style.text-start.mb-6 創建遊戲
        .d-flex
            .d-flex
                p 卡片牌局：
                BFormSelect(v-model="selectedModeId" :options="roleOptions")

            div
                i( class="bi bi-person-badge")
                p.d-inline-block 人數：
        .d-flex.flex-wrap.group-card-wrap
            GroupCardPanel.group-card-panel(v-for='roles in filteredRoles' :data='roles')
    FooterCopyright.position-absolute.bottom-0.start-0
</template>
<script lang="ts">
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BFormSelect, BFormCheckboxGroup, BFormCheckbox, BFormGroup } from 'bootstrap-vue-3'
import { ref, Ref, watch, defineComponent } from 'vue'
import FooterCopyright from '@/components/FooterCopyright.vue'
import GroupCardPanel from '@/components/setting/GroupCardPanel.vue'
import charactersData from '@/assets/data/characters.json'
import script from '@/assets/data/script.json'
interface RoleOptions {
    value: number;
    text: string;
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
interface GroupedRoles {
    pair: Number;
    required: Boolean;
    checked: Boolean;
    roles: Role[]
}
export default defineComponent({
    components: {
        BFormSelect, BFormCheckboxGroup, BFormCheckbox, BFormGroup,
        GroupCardPanel, FooterCopyright
    },
    setup() {
        const roleOptions: RoleOptions[] = script.map(x => ({ value: x.key, text: x.label }));
        const selectedModeId = ref<number>(roleOptions[0].value);
        const selectedPairId = ref<string[]>([]);
        const filteredRoles = ref<GroupedRoles[][]>([])

        watch(selectedModeId, (newValue) => {

            const requiredIdList = setRoleGroupList(newValue, 'required')
            const optionsIdList = setRoleGroupList(newValue, 'options')
            const concatedList=requiredIdList.concat(optionsIdList)
            filteredRoles.value = chunkGroupRoles(concatedList,4)

        }, { immediate: true });
        function setRoleGroupList(value: number, attr: "required" | "options") {
            const _v = attr == 'required' ? true : false
            const IdList = getRelatedRoleKeys(value, attr)
            const Roles = filterRolesByKeys(IdList)
            return pairRoleList(Roles, _v)
        }
        function chunkGroupRoles(array: GroupedRoles[], chunkSize: number) {
            let result = [];
            for (let i = 0; i < array.length; i += chunkSize) {
                result.push(array.slice(i, i + chunkSize));
            }
            return result;
        }
        function getRelatedRoleKeys(newValue: number, attr: "required" | "options") {
            let list: string[] = []
            const item = script.find(s => s.key === newValue);
            if (item) {
                list = item[attr];
            }
            return list
        }
        function filterRolesByKeys(selectedList: string[]) {
            const list = charactersData.filter(x => selectedList.includes(x.key))
            return list
        }
        function pairRoleList(list: Role[], attr: boolean) {
            return list.reduce((acc, arr) => {
                const item = acc.find(x => x.pair == arr.pair)
                if (item) {
                    item.roles.push(arr)
                } else {
                    acc.push({ pair: arr.pair, required: attr, roles: [arr], checked: attr })
                }
                return acc
            }, [] as GroupedRoles[])
        }

        return {
            roleOptions, selectedModeId, filteredRoles, selectedPairId
        };
    }
});
</script>
<style lang="scss" scoped>
::v-deep {
    .banner-wrap {
        background-color: #4a1212;
        padding: 20px 0;
    }
}
.group-card-wrap{
    gap: 24px;
    .group-card-panel{
    width: calc((100% - 48px)/3);
    padding: 24px;
    border-radius: 13px;
border: 1px solid #BFBFBF;
}
}

.wrap {
    width: 100vw;
    height: 100vh;
}

.icon {
    font-size: 20px;
    color: #000;
}

.icon-color {
    color: var(--color);
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