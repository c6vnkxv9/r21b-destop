<template lang="pug">
.wrap
    .banner-wrap
        .mx-1280
            .banner-img-wrap
                img(src='@/assets/pic/logo.svg')
    .setting-wrap.mx-1280
        h1.title-style.text-start.mb-6 創建遊戲
        .d-flex
            div
                p.d-inline-block 卡片牌局：
                BFormSelect(v-model="selected" :options="options")
                
            div
                p.d-inline-block 人數：
        p {{ selectedList }}

</template>
<script lang="ts">
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BFormSelect, BFormCheckboxGroup } from 'bootstrap-vue-3'
import { ref, Ref,watch, defineComponent } from 'vue'
import charactersData from '@/assets/data/characters.json'
import colorList from '@/assets/data/colorList.json'
import script from '@/assets/data/script.json'
interface Option {
    value: number;
    text: string;
}

export default defineComponent({
    setup() {
        const options: Option[] = script.map(x => ({ value: x.key, text: x.label }));
        const selected = ref<number>(options[0].value);
        const selectedList = ref<string[]>([]);

        watch(selected, (newValue) => {
            const item = script.find(s => s.key === newValue);
            if (item) {
                selectedList.value = item.required.concat(item.options);
            }
        }, { immediate: true });

        return {
            options, selected, selectedList
        };
    }
});
</script>
<style lang="scss" scoped>
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