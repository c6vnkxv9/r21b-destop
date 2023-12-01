<template lang="pug">
.wrap.position-relative
    .banner-wrap
        .mx-1280
            .banner-img-wrap
                img(src='@/assets/pic/logo-red.png')
    .setting-wrap.mx-1280.flex-grow-1
        h1.title-style.text-start.mb-6 創建遊戲
        .d-flex.align-items-center.mb-4
            .d-flex.align-items-center
                p.text-nowrap.fw-bold 卡片牌局：
                BFormSelect(v-model="selectedModeId" :options="roleOptions")
            .count-wrap
                p.d-inline-block.fw-bold 人數：
                    span.fw-normal {{ countChecked }}
                    span.fw-bold.fs-red.ml-2(v-if='countChecked>20') (人數已達上限20人)
        .d-flex.flex-wrap.group-card-wrap.flex-grow-1
            GroupCardPanel.group-card-panel(
                v-for='(roles,index) in groupedRoles' 
                :data='roles' 
                :index='index'
                @setGroupStatus='setGroupStatus'
                @setSingleStatus='setSingleStatus'
                )
        .d-flex.justify-content-center
            .button-style.cursor.fw-bold(@click="submitSetting") Game Start
    FooterCopyright.position-absolute.bottom-0.start-0
    Alert(:show='modalShow')
</template>
<script lang="ts">
import 'bootstrap-icons/font/bootstrap-icons.css'
import RoleOptions from '@/interfaces/RoleOptionsInterface';
import Role from '@/interfaces/RoleInterface';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
import { BFormSelect, BFormCheckboxGroup, BFormCheckbox, BFormGroup } from 'bootstrap-vue-3'
import { ref, computed, watch, defineComponent } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FooterCopyright from '@/components/FooterCopyright.vue'
import GroupCardPanel from '@/components/setting/GroupCardPanel.vue'
import Alert from '@/components/setting/Alert.vue'
import charactersData from '@/assets/data/characters.json'
import script from '@/assets/data/script.json'
import _ from 'lodash';
export default defineComponent({
    components: {
        BFormSelect, BFormCheckboxGroup, BFormCheckbox, BFormGroup,
        GroupCardPanel, FooterCopyright, Alert
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        let modalShow = false
        const roleOptions: RoleOptions[] = script.map(x => ({ value: x.key, text: x.label }));
        const selectedModeId = ref<number>(roleOptions[0].value);
        const roleList = ref<GroupedRoles[]>([])
        const countChecked = computed(() => {
            return roleList.value.reduce((total, currentGroup) => {
                if (currentGroup.checked) {
                    return total + currentGroup.roles.length;
                }
                return total;
            }, 0);
        })
        const roleCheckedList = computed(() => {
            return roleList.value.filter(x => x.checked)
        })
        const groupedRoles = computed(() => {
            return chunkGroupRoles(roleList.value, 4)
        })
        watch(selectedModeId, (newValue) => {
            const requiredIdList = setRoleGroupList(newValue, 'required')
            const optionsIdList = setRoleGroupList(newValue, 'options')
            roleList.value = requiredIdList.concat(optionsIdList)
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
        function setGroupStatus(index: number, status: boolean) {
            groupedRoles.value[index].forEach(x => {
                if (!x.required) {
                    x.checked = status
                }
            })
        }
        function setSingleStatus(groupIndex: number, pairIndex: number) {
            const group = groupedRoles.value[groupIndex];
            const role = group[pairIndex];
            if (!role.required) {
                role.checked = !role.checked;
            }
        }
        function popUpAlertModal() {
            modalShow = true
        }
        function submitSetting() {
            const gameMode = script[selectedModeId.value]
            const setting = {
                roles: roleCheckedList.value,
                mode: selectedModeId
            }
            if (roleCheckedList.value.length > 20) {
                popUpAlertModal()
            } else {
                store.dispatch('updateGameSetting', setting);
                router.push({ path: `/game/${gameMode.route}` })
            }
        }
        return {
            modalShow, roleOptions, selectedModeId, groupedRoles, setSingleStatus, setGroupStatus, submitSetting, countChecked
        };
    }
});
</script>
<style lang="scss" scoped>
::v-deep {
    .banner-wrap {
        background-color: $red-team-color;
        padding: 20px 0;
    }
}

.fs-red {
    color: $red-team-color;
}

.button-style {
    border-radius: 12px;
    background: $red-team-color;
    color: #fff;
    padding: 16px 24px;
    margin: 24px auto;

    &:hover {
        background: $red-team-dark-color;
    }
}

.group-card-wrap {
    gap: 24px;

    .group-card-panel {
        width: calc((100% - 48px)/3);
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #BFBFBF;
    }
}

.wrap {
    width: 100vw;
    height: 100vh;

    .count-wrap {
        margin-left: 24px;
    }
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

.banner-img-wrap {
    width: 30%;
    height: 100px;
    margin: 0 auto;

    img {
        display: block;
        max-width: 100%;
        height: 100px;
    }
}

.ml-2 {
    margin-left: 0.5rem;
}

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