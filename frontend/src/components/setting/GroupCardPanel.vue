<template lang="pug">
div
    p.text-start.title-style.cursor(@click='setGroupStatus()')
        i.mr-12(:class='groupedStatusStyle' ) 
        | 角色-zone {{ index+1 }}
    .d-flex.roles-style.cursor(v-for="(pair) in data" @click='setSingleStatus(pair.pair)')
        .mr-12
            i(class='bi' :class='setSingleCheckColor(pair.checked,pair.required)') 
        .d-flex.justify-content-between.flex-grow-1
            p.mb-0.pole-style.w-50.text-start(v-for="person in pair?.roles" )
                i( class="bi mr-12 bi-person-badge icon-color" :style='SetTeamColor(person.color)') 
                | {{ person.label }}
</template>
<script lang="ts">
import Color from '@/interfaces/ColorInterface';
import GroupedRoles from '@/interfaces/GroupedRolesInterface';
import { dataApi } from '@/services/api';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';

export default defineComponent({
    name: 'GroupCardPanel',
    props: {
        data: {
            type: Array as PropType<GroupedRoles[]>,
            default: () => []
        },
        index: {
            type: Number
        }
    },
    setup(props, { emit }) {
        const colorList = ref<Color[]>([]);
        const isLoading = ref<boolean>(true);

        // 從API獲取顏色列表
        const fetchColorList = async () => {
            try {
                isLoading.value = true;
                const data = await dataApi.getColorList();
                colorList.value = data;
            } catch (error) {
                console.error('獲取顏色列表失敗:', error);
            } finally {
                isLoading.value = false;
            }
        };

        onMounted(() => {
            fetchColorList();
        });

        const groupLength = computed(() => {
            return props.data?.length;
        });

        const groupedStatusLength = computed(() => {
            return props.data.filter(x => x.checked)?.length;
        });

        const groupedStatusStyle = computed(() => {
            if (groupedStatusLength.value == groupLength.value) {
                return 'bi bi-check-square-fill fill-color';
            } else if (groupedStatusLength.value > 0) {
                return 'bi bi-dash-square';
            }
            return 'bi bi-square';
        });

        function SetTeamColor(color: string) {
            let colorHex = colorList.value.find(x => x.label == color)?.color;
            return { '--color': colorHex };
        }

        function setSingleCheckColor(status: boolean, required: boolean) {
            if (required) {
                return 'bi-check-square-fill checked-disable-color';
            } else if (status) {
                return 'bi-check-square-fill fill-color';
            }
            return 'bi-square';
        }

        function setGroupStatus() {
            const status = groupLength.value == groupedStatusLength.value ? false : true;
            emit('setGroupStatus', props.index, status);
        }

        function setSingleStatus(pair: Number) {
            emit('setSingleStatus', pair);
        }

        return { 
            SetTeamColor, 
            groupedStatusStyle, 
            setSingleStatus, 
            setGroupStatus, 
            setSingleCheckColor 
        };
    }
});
</script>
<style lang="scss" scoped>
.checked-disable-color {
    color: #646464;
}
.icon-color {
    color: var(--color);
}
.mr-12 {
    margin-right: 12px
}
.roles-style {
    padding: 4px;
    border-radius: 4px;
}
.roles-style:hover {
    background-color: #EFF1F3;
}
.roles-style+.roles-style {
    margin-top: 4px;
}
.title-style {
    color: #282828;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
}
</style>