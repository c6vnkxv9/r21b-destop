<template lang="pug">
.w-100.d-flex.justify-content-center
    .d-flex.justify-content-center.flex-grow-1.team-wrap(v-for='team in RoleArray' :style="[{'background-color': team.color}]")
        .card-wrap.card-background.card-padding.card-full-height.d-flex.justify-content-center(v-if='team.groupedRoles.single' v-for='item in team.groupedRoles.single' :class='item.color' :style="generateStyle(item)")
            p.ver-text.card-title.m-0 {{ item.label }}
            p.ver-text.card-desc.m-0(:class='item.color') {{ item.desc }}
        .h-100.d-flex.flex-column(v-if='team.groupedRoles.pair' v-for='pair in team.groupedRoles.pair')
            .text-center(v-if='pair.icon')
                i(class='bi ' :class='[pair.color,`bi-${pair.icon}`]')
            .d-flex(:class='[pair.icon?"h--30":"h-100"]')
                .card-wrap.card-background.card-padding.d-flex.justify-content-center(v-for='item in pair.card' :class='item.color'  :style="generateStyle(item)")
                    p.ver-text.card-title.m-0 {{ item.label }}
                    p.ver-text.card-desc.m-0(:class='item.color') {{ item.desc }}
</template>
<script lang="ts">
import colorList from '@/assets/data/colorList.json'
import pairIconList from '@/assets/data/pairIconList.json'
import _, { map } from 'lodash';
import { computed, defineComponent, PropType } from 'vue'
import Role from '@/interfaces/RoleInterface';
interface PairAttribute {
    color?: string;
    icon?: string;
    card: Role[];
}
interface CardSection {
    team: string;
    color: string;
    roles: Role[];
    groupedRoles: GroupedRoles;
}
interface GroupedRoles {
    single: Role[];
    pair: PairAttribute[]
}
export default defineComponent({
    name: 'CardSection',
    props: {
        data: {
            type: Array as PropType<Role[]>,
            required: true
        },
        cardWidth: {
            type: Number,
            default: 100 //預設值
        },
    },
    setup(props) {
        const RoleArray = computed(() => processRoles(props.data));

        function processRoles(data: Role[]): CardSection[] {
            let groupedData = groupByTeam(data);
            return groupedData.map(group => categorizeRoles(group));
        }

        function groupByTeam(data: Role[]): CardSection[] {
            return data.reduce((acc, role) => {
                let team = acc.find(t => t.team === role.color);
                if (!team) {
                    team = {
                        team: role.color,
                        color: setBGC(role.color),
                        roles: [],
                        groupedRoles: { single: [], pair: [] }
                    };
                    acc.push(team);
                }
                team.roles.push(role);
                return acc;
            }, [] as CardSection[]);
            
        }

        function categorizeRoles(group: CardSection): CardSection {
            const counts = _.countBy(group.roles, 'pair');
            _.forEach(counts, (count, key) => {
                if (count === 1) {
                    group.groupedRoles.single.push(...group.roles.filter(role => role.pair === +key));
                } else if (count > 1) {
                    let icon=pairIconList.find(x=>x.pair.toString()==key)
                    let pairAttr={
                        color:icon?.color,
                        icon:icon?.icon,
                        card:group.roles.filter(role => role.pair === +key)
                    }
                    group.groupedRoles.pair.push(pairAttr);
                }
            });
            return group;
        }

        function findIcon(pair: number) {
            return pairIconList[pair as unknown as keyof typeof pairIconList];
        }
        function setBGC(label: string) {
            return colorList.find(x => x.label === label)?.color || 'fff';
        }
        function generateStyle(item: Role) {
            return {
                'background-image': `url(./${item.src})`,
                'width': `${Math.round(props.cardWidth)}px`
            };
        };
        return { RoleArray, findIcon, generateStyle };
    }
})
</script>

<style scoped lang="scss">
$red: $info-red;
$blue: $info-blue;
$grey-icon: $grey-primary-color;
$red-icon: $red-primary-color;
$blue-icon: $blue-primary-color;
$grey: $info-grey;
$shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
$lg-full-height: calc((100vh - (48px * 4) - 100px) / 2);
$md-full-height: calc((100vh - (12px * 4) - 100px) / 2);
.h--30{
    height: calc(100% - 30px);
}
.bi {
    font-size: 20px;
    &.red {
        color: $red-icon;
    }

    &.blue {
        color: $blue-icon;
    }

    &.grey {
        color: $grey-icon;
    }
}

.home {
    width: 100vw;
    height: 100vh;
}

.card-full-height {
    height: $lg-full-height;

    @media screen and (max-width: 1280px) {
        height: $md-full-height;
    }
}

.card-md-height {
    height: calc($lg-full-height - 20px);

    @media screen and (max-width: 1280px) {
        height: calc($md-full-height - 20px);
    }
}

.card-padding {
    padding: 24px 16px 0px 16px;

    @media screen and (max-width: 1280px) {
        padding: 32px 16px 0px 16px;
    }
}

.card-wrap {
    border-radius: 8px;
    box-shadow: $shadow;
    border-style: solid;
    border-left-width: 0px;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;

    &.red {
        border-color: $red;
    }

    &.blue {
        border-color: $blue;
    }

    &.grey {
        border-color: $grey;
    }
}

.card-background {
    background-size: cover;
    background-position: center;
}

.team-wrap>.card-wrap:first-child {
    border-left-width: 1px;
}

.team-wrap {
    padding: $lg-length;

    @media screen and (max-width: 1280px) {
        padding: $sm-length;
    }
}

.card-title {
    color: #FFF;
    font-size: 20px;
    font-weight: 500;
}

.card-desc {
    font-size: 14px;
    font-weight: 400;

    &.red {
        color: $red;
    }

    &.blue {
        color: $blue;
    }

    &.grey {
        color: $grey;
    }
}

.ver-text {
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;
}</style>

