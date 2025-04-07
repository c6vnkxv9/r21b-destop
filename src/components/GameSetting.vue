<template lang="pug">
.wrap.position-relative
    .banner-wrap
        .mx-1280
            .banner-img-wrap
                img(src='@/assets/pic/logo.svg')
    .setting-wrap.mx-1280.flex-grow-1
        h1.title-style.text-start.mb-6 創建遊戲
        .d-flex.justify-content-between.fs-20
            .d-flex.align-items-center.mb-4
                .d-flex.align-items-center
                    p.mb-0.text-nowrap.fw-bold 卡片牌局：
                    BFormSelect(v-model="selectedModeId" :options="roleOptions")
                .count-wrap
                    p.mb-0.d-inline-block.fw-bold 人數：
                        span.fw-normal {{ countChecked }}
                        span.fw-bold.fs-red.ml-2(v-if='countChecked>20') (人數已達上限20人)
            .d-flex.align-items-center
                BButtonGroup.Toggle.rounded-pill.mr-4(:style='styleVars')
                    BButton.px-6.text-nowrap.mb-0(
                        v-for='(item, index) in roundOptions',
                        :key='index',
                        @click='selectedRoundOptions = item'
                    )
                    | {{ selectedRoundOptions.text }}
                p.mb-0.text-end.cursor.fw-bold(@click='setAllStatus')
                    i.mr-12(:class='allStatusStyle' ) 
                    | 全選
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
    Alert(:show='modalShow' @update:modalShow="modalShow = $event")
</template>
<script lang="ts">
import FooterCopyright from '@/components/FooterCopyright.vue';
import Alert from '@/components/setting/Alert.vue';
import GroupCardPanel from '@/components/setting/GroupCardPanel.vue';
import { characters } from '@/data/characters';
import { REQUIRED_ROLES, script } from '@/data/script';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
import Role from '@/interfaces/RoleInterface';
import { IScript } from '@/interfaces/RoleOptionsInterface';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BButton, BButtonGroup, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BFormSelect } from 'bootstrap-vue-3';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
interface IRoundOptions {
    value: string;
    text: string;
}
const ROUND_OPTIONS = [
    {
        value: 'three',
        text: '三局'
    },
    {
        value: 'five',
        text: '五局'
    },
]
export default defineComponent({
    components: {
        BFormSelect, BFormCheckboxGroup, BFormCheckbox, BFormGroup,
        GroupCardPanel, FooterCopyright, Alert, BButtonGroup, BButton
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        let modalShow = ref<boolean>(false)
        let roundOptions = ref<IRoundOptions[]>(ROUND_OPTIONS)
        let selectedRoundOptions = ref<IRoundOptions>(roundOptions.value[0])
        const defaultScript = {
            key: 'all',
            name: '自由',
            label: '自由',
            route: 'normal',
            required: REQUIRED_ROLES,
            options: characters.map(x => x.key).filter(x => !REQUIRED_ROLES.includes(x))
        } as IScript
        const roleOptions = computed(() => {
            const _script = [{value: defaultScript.key, text: defaultScript.label}].concat(script.map(x => ({ value: x.key, text: x.label })))
            return _script
        });
        const selectedModeId = ref<string>(roleOptions.value[0].value);
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
        function setRoleGroupList(value: string, attr: "required" | "options") {
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
        function getRelatedRoleKeys(newValue: string, attr: "required" | "options") {
            if(newValue == defaultScript.key){
                return defaultScript[attr]
            }
            const item = script.find(s => s.key === newValue);
            return item?.[attr] || [];
        }
        function filterRolesByKeys(selectedList: string[]) {
            const list = characters.filter(x => selectedList.includes(x.key))
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
        const RoleLength = computed(() => {
            return roleList.value.reduce((total, currentGroup) => {
                return total + currentGroup.roles.length;
            }, 0);
        })
        const allStatusStyle = computed(() => {
            if(RoleLength.value ==countChecked.value){
                return 'bi bi-check-square-fill fill-color'
            }else if(countChecked.value >0){
                return 'bi bi-dash-square'
            }
            return 'bi bi-square'
        });
        function setAllStatus() {
            const status = RoleLength.value !== countChecked.value;
            roleList.value.forEach(x => {
                if (!x.required) {
                    x.checked = status;
                }
            });
        }
        function setGroupStatus(index: number, status: boolean) {
            const startIndex = index * 4;
            const endIndex = Math.min(startIndex + 4, roleList.value.length);
            for (let i = startIndex; i < endIndex; i++) {
                const x = roleList.value[i];
                if (!x.required) {
                    x.checked = status;
                }
            }
        }
        function setSingleStatus(pair: number) {
            let item = roleList.value.find(x => x.pair == pair)
            if (item && !item.required) {
                item.checked = !item.checked;
            }
        }
        function popUpAlertModal() {
            modalShow.value = true
            console.log(modalShow);
        }
        function submitSetting() {
            if (countChecked.value > 20) {
                popUpAlertModal();
                return;
            }
            const gameMode = script.find(x => x.key === selectedModeId.value);
            const setting = {
                roles: roleCheckedList.value,
                mode: selectedModeId.value,
                count: countChecked.value
            };
            store.dispatch('updateGameSetting', setting);
            router.push({ path: `/game/${gameMode?.route}` });
        }
        return {
            modalShow, roleOptions, selectedModeId, groupedRoles,countChecked, setSingleStatus, setGroupStatus, submitSetting,setAllStatus,allStatusStyle,selectedRoundOptions,roundOptions
        };
    }
});
</script>
<style lang="scss" scoped>
:v-deep{
    .banner-wrap {
        background-color: $red-primary-color;
        padding: 20px 0;
    }
}
.fs-red {
    color: $red-primary-color;
}
.mr-12{
    margin-right: 12px;
}
.button-style {
    border-radius: 12px;
    background: $red-primary-color;
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
.fs-20{
    font-size: 20px;
}
.setting-wrap {
    padding: 24px 48px;
}

.title-style {
    color: #282828;
    font-size: 32px;
    font-weight: 500;
}
</style>