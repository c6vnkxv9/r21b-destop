<template lang="pug">
.wrap
GameConfigurationSection
</template>
<script lang="ts">
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import { ref,Ref, defineComponent } from 'vue'

export default defineComponent({
name: 'NomalPannel',
components: {
   // GameConfigurationSection
},
setup () {

    return {
    }
}
})
</script>

<style lang="scss" scoped>
.wrap{
width: 100vw;
height: 100vh;
background-color: #666;
}
</style>
    