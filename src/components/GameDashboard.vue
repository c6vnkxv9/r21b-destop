<template lang="pug">
.wrap
  
//-   .bgc-grey.upper-wrap
//-     .mx-auto.content-wrap
//-       GameConfigurationSection
//-   .down-wrap(:class="bgColor")
//-     .d-flex.content-wrap.mx-auto.align-stretch
//-         CharacterIntroduction.flex-grow-1.bgc-blue( :color='blueTeam.color' :member='blueTeam.teamMember' :title="'藍隊'")
//-         CharacterIntroduction.flex-grow-1.bgc-red( :color='redTeam.color' :member='redTeam.teamMember' :title="'紅隊'")
//-         CharacterIntroduction.flex-grow-1.bgc-grey(v-if='isGreyTeam' :color='greyTeam.color' :member='greyTeam.teamMember' :title="'灰隊'")
</template>
<script lang="ts">
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref,Ref, defineComponent } from 'vue'
// import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
// import CharacterIntroduction from '@/components/CharacterIntroduction.vue'
import charactersData from '@/assets/data/characters.json'
import colorList from '@/assets/data/colorList.json'
import script from '@/assets/data/script.json'
export default defineComponent({})
// 隊伍成員的型別
// interface TeamMember {
//   key: string
//   label: string
//   desc: string
//   color: String[]
//   selected: boolean
// }
// interface Color {
//   label: string
//   colorLight: string
//   colorDark: string
// }
// interface Team {
//   color: Color
//   teamMember: TeamMember[]
// }

// export default defineComponent({
//   name: 'GameDashboard',
//   components: {
//     CharacterIntroduction,
//     GameConfigurationSection,
//   },
//   setup () {
//     const blueTeam = createTeam('blue')
//     const redTeam = createTeam('red')
//     const greyTeam = createTeam('grey')
//     const isGreyTeam:Ref<boolean> = ref(greyTeam.value.teamMember.length>0)
//     const bgColor:string=isGreyTeam.value?'wrap-color-grey':'wrap-color-red'
//     function createTeam (color: string) {
//       const selectedColor = selectingColor(color)

//       return ref<Team>({
//         color: selectedColor,
//         teamMember: selectingTeam(color)
//       })
//     }

//     function selectingTeam (color: string): TeamMember[] {
//       return charactersData.filter(
//         (x) => x.color.includes(color) && x.selected
//       )
//     }
//     function selectingColor (color: string): Color {
//       let _color = colorList.find((x) => x.label === color)
//       if (!_color) {
//         _color = {
//           label: '預設值',
//           colorLight: '#666',
//           colorDark: '#666'
//         }
//       }
//       return _color
//     }

//     return {
//       blueTeam,
//       redTeam,
//       greyTeam,
//       charactersData,
//       isGreyTeam,
//       bgColor
//     }
//   }
// })
// </script>

// <style lang="scss" scoped>
// $blue:#67A0B8;
// $red:#DC5258;
// $grey:#7B7B7B;
// .bgc-grey{
//   background-color: lighten($grey,20%);
// }
// .bgc-blue{
//   background-color: lighten($blue,20%);
// }
// .bgc-red{
//   background-color: lighten($red,20%);
// }
// .wrap{
//   height: 100vh;
// }
// .wrap-color-red{
//   background: linear-gradient(90deg,lighten($blue,20%) 50%,lighten($red,20%) 50%);
// }
// .wrap-color-grey{
//   background: linear-gradient(90deg,lighten($blue,20%) 50%,lighten($grey,20%) 50%);
// }
// .down-wrap{
//   width: 100vw;
//   height: 70%;
// }
// .upper-wrap{
//   width: 100vw;
//   height: 30%;
// }
// .content-wrap{
//   max-width: 1400px;
//   height: 100%;
// }
// </style>
